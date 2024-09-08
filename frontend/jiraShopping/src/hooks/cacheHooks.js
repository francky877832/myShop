import { useEffect, useState, useRef, useCallback } from 'react';

export const useCacheBeforeRemove = (navigation,  storeCache, parameters) => {
  useEffect(() => {
    const beforeRemoveListener = navigation.addListener('beforeRemove', async (e) => {
      e.preventDefault();

      try {
        await storeCache(...parameters);
        //console.log("Données stockées avant la navigation");
      } catch (error) {
        console.error("Erreur dans le callBack:", error);
      }

      navigation.dispatch(e.data.action);
    });

    return () => {
      beforeRemoveListener();
    };
  }, [navigation, storeCache, ...parameters]);
};


export const useCache = (getCache, parameters) => {
  const [cacheData, setCacheData] = useState(null); 

  useEffect(() => {
    const fetchCacheData = async () => {
      try {
        const datas = await getCache(...parameters);
        setCacheData(datas)
      } catch (error) {
        console.error('Erreur lors de la récupération des données du cache:', error);
      }
    };

    fetchCacheData();
  }, [...parameters]);

  return cacheData; 
};



//LORSQU'IL YA PAS DE PAGINATION
export const useCacheWithDatas = (cacheKey, getCache, loadDatas, parameters) => {
  const [datas, setDatas] = useState([]);
  const [params, setParams] = useState({})
  const isCacheLoaded = useRef(false);

  const [isLoading, setIsLoading] = useState(false)
  const [page, setPage] = useState(1);
  const limit = 100
  const [hasMore, setHasMore] = useState(true)
    
  const loadMore = useCallback(async () => {
      if (isLoading || !hasMore) return;
    
      setIsLoading(true);

      try 
      {
        loadDatas(...parameters, page, limit).then((newData)=>{
          if (newData.length > 0) 
          {
                if(isCacheLoaded.current)
                {
                  setDatas(newData)
                  isCacheLoaded.current = false; 
                  console.log("222")
                }
                else
                {
                  setDatas((prev)=>[...prev, ...newData])
                  isCacheLoaded.current = false; 
                  console.log('333')
                }
                setPage((prevPage) => prevPage + 1);

          } else 
          {
              setHasMore(false);
          }
        }).catch((error) => {
          setIsLoading(false);
          console.error('Erreur lors de la récupération des données:', error);
        })

      } catch (error) {
          console.error('Erreur lors de la récupération des données:', error);
      } finally {
          setIsLoading(false);
      }    
    }, [page, isLoading, hasMore])

    useEffect(() => {
      async function fetchDatas()
      {
        let offersCache = await getCache(cacheKey);
      
        if (offersCache) {
          setDatas(offersCache);
          isCacheLoaded.current = true; 
          console.log('111')
        }
  
        await loadMore();
      }
        
        fetchDatas()

    }, []);

  
  return { datas, loadMore, loading:isLoading, hasMore };
};

