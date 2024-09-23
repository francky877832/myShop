import { useContext, useState, useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomModalActivityIndicator } from '../../components/common/CommonSimpleComponents'
import { appColors } from '../../styles/commonStyles'
import { ProductContext } from '../../context/ProductContext';

import * as Linking from "expo-linking";
import { storeUrl } from '../../remote/server';

function DeepLinkHandler() {
    const navigation = useNavigation();
    const { getAProduct } = useContext(ProductContext);
    const [isProdcutLoading, setIsProdcutLoading] = useState(false)
  
    useEffect(() => {
      const handleDeepLink = async (url) => {
        let productId;
        const datas = url.split('product/');
        if(datas.length === 2)
        {
          productId = datas[1]
          if (productId) {
            try {
              setIsProdcutLoading(true)
              const productData = await getAProduct(productId);
              navigation.navigate('ProductDetails', { productDetails: productData });
            } catch (error) {
  
              //console.error('Erreur lors de la récupération des données :', error);
              if (Platform.OS === 'android') {
                Alert.alert(
                  "Application non installée",
                  "Voulez-vous ouvrir la page du Play Store pour installer l'application ?",
                  [
                    { text: "Annuler", style: "cancel" },
                    { text: "OK", onPress: () => Linking.openURL(storeUrl) }
                  ]
                );
              }
  
            }finally{
              setIsProdcutLoading(false)
            }
          }
        };
        }
        
  
      const linkingListener = Linking.addEventListener('url', (event) => {
        handleDeepLink(event.url);
      });
  
      Linking.getInitialURL().then((url) => {
        if (url) {
          handleDeepLink(url);
        }
      });
      return () => {
        linkingListener.remove();
      };
    }, []) // [navigation, getAProduct]);
  
    return (
      <CustomModalActivityIndicator onRequestClose={setIsProdcutLoading} isLoading={isProdcutLoading} size="large" color={appColors.secondaryColor1} message="Commande en cours de preparation..." />
  
      )
  }

  export default DeepLinkHandler