import { API_BACKEND } from '@env';

import React, { useState, forwardRef, useRef, useEffect, useCallback, useContext, useMemo} from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, FlatList  } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomActivityIndicator } from "../common/CommonSimpleComponents";

import { commentsStyles } from '../../styles/commentsStyles';
import { productDetailsStyles } from '../../styles/productDetailsStyles';
import { appColors, screenHeight } from '../../styles/commonStyles';

import SellerBrand from '../common/SellerBrand';
import { server } from '../../remote/server';


const loggedUserId = "66731fcb569b492d3ef429ba"
const loggedUser = "Francky"
const visitorUserId = "66715deae5f65636347e7f9e"
const Followers = (props) =>
{
    const navigation = useNavigation()
    const route = useRoute()
    const { seller, who } = route.params
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading]  = useState(false)
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
   


const getUserFollowers = async (userId, page)=> {
        try
        {
            const response = await fetch(`${server}/api/auth/users/followers/${userId}?page=${page}`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                });
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête'+(await response.text()));
                }
                const datas = await response.json();
                console.log(datas)
                return datas
        } catch (error) {
        console.error(error);
        return []
      }
    }

    const loadMoreUserFollowers = useCallback(async () => {
        //console.log("ook")
        //console.log(hasMore)
        if (isLoading || !hasMore) return;
    
        setIsLoading(true);
        try {
  
          const datas = await getUserFollowers(seller._id, page);
          const user = datas.user
          //console.log(datas)
          if ((who==='followers' && user.followers.length > 0) || (who==='followings' && user.followings.length > 0)) {
            setUsers((prevUsers)=>{
                switch(who)
                {
                    case 'followers':
                        return [...prevUsers, ...user.followers]
                        break;
                    case 'followings':
                        return [...prevUsers, ...user.followings]
                        break;
                    default : return []; break;
                }
            })
            setPage((prevPage) => prevPage + 1);
          } else {
            setHasMore(false);
          }
        } catch (error) {
            console.error('Erreur lors du chargement des commentaires :', error);
        }finally {
            setIsLoading(false);
        }
      }, [isLoading, hasMore, page])




useEffect(()=>{

    const fetchData = async () => {
        //setIsLoading(true);
        await loadMoreUserFollowers()
    };

    fetchData()
      
 }, [])
/*





 <Pressable style={[followersStyles.renderItem]} onPress={()=>{}}>
                <View style={[followersStyles.imageContainer]}>

                </View>

                <View style={[followersStyles.userInfo]}>
                    <Text></Text>
                </View>
            </Pressable> 
*/

 const renderItem = useCallback(({item}) => { return(
        <View style={[productDetailsStyles.commentsContainer]}>
            <Pressable style={[productDetailsStyles.sellerBrand]} onPress={()=>{navigation.navigate({name:"Shop", params:{seller:item,}, key:Date.now().toString()}) }}>
                <SellerBrand pub={true} onlineDate={item.updatedAt} username={item.username} navigation={navigation} route={route} closeNotif={true} />
            </Pressable>
            <View style={{height:20}}></View>
        </View>
    )})

 const memoizedData = useMemo(() => users, [users]);
 const memoizedRenderItem = useMemo(() => renderItem, [renderItem]);

    return(
<View style={{ flex: 1 }}>
    <View style={[followersStyles.flatlistContainerView]}>
        <FlatList
                data={memoizedData}
                nestedScrollEnabled={true}
                renderItem={ memoizedRenderItem }
                keyExtractor={ (item) => { return item._id.toString();} }
                horizontal={false}
                numColumns={ 1 }
                onEndReachedThreshold={0.3}
                onEndReached={()=>{loadMoreUserFollowers()}}
                ItemSeparatorComponent ={ (item) => { return <View style={{width:5,}}></View> }}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={[{}]}
                ListFooterComponent={isLoading ? <ActivityIndicator size="large" color={appColors.secondaryColor1} /> : null}

        />
    </View>
</View>
    )
}


export default React.memo(Followers)

const followersStyles = StyleSheet.create({
    flatlistContainerView :
    {

    },
    renderItem :
    {

    },
    imageContainer :
    {

    },

})


