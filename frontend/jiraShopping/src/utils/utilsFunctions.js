import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import * as Notifications from 'expo-notifications';

import { Alert } from 'react-native';
//Demande de permission
export const requestPermissions = async () => {
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (galleryStatus !== 'granted') {
    Alert.alert('Permission to access gallery is required!');
    return false;
    }
    
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraStatus !== 'granted') {
    Alert.alert('Permission to access camera is required!');
    return false;
    }
    
    return true;
};

export const pickImages = async (MAX_IMAGES, MIN_IMAGES, images) => {
    //console.log(images.length)
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;
    //const images_ = new Array(images)
    const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection: true,
    base64: false,
    orderedSelection : true,
    selectionLimit : MAX_IMAGES,
    quality: 1,
    });
//console.log(result.assets.slice(0, MAX_IMAGES - images_.length))

    if (!result.canceled) {
        if (images.length > MAX_IMAGES) { //result.assets.length < MIN_IMAGES || --- A appliquer lors de la validation
            Alert.alert(`Vous pouvez selectionner entre ${MIN_IMAGES}  et ${MAX_IMAGES} images.`);
            return;
        }
    const newImages = result.assets.slice(0, MAX_IMAGES - images.length);  
        //console.log("newImages")
        //console.log(newImages)
        return [...newImages];
        
    }
};



export const takePhoto = async (MAX_IMAGES, MIN_IMAGES, images) => {
    const hasPermissions = await requestPermissions();
    if (!hasPermissions) return;

    const result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    base64: false,
    quality: 1,
    });

    if (images.length > MAX_IMAGES) { //result.assets.length < MIN_IMAGES || --- A appliquer lors de la validation
        Alert.alert(`Vous pouvez selectionner entre ${MIN_IMAGES}  et ${MAX_IMAGES} images.`);
        return;
    } 
    if (!result.canceled) {
        //setImages((prevImages) => [...prevImages, result]);
        //console.log(result);
        return { uri: result.assets[0].uri };
    }
};

export const resizeImages = async (images,IMG_MAX_HEIGHT,IMG_MAX_WIDTH) => {
    return await Promise.all(images.map(async (selectedImage) => {
      if (selectedImage.width > IMG_MAX_WIDTH || selectedImage.height > IMG_MAX_HEIGHT) {
        const resizedImage = await ImageManipulator.manipulateAsync(
          selectedImage.uri,
          [
            {
              resize: {
                width: Math.min(selectedImage.width, IMG_MAX_WIDTH),
                height: Math.min(selectedImage.height, IMG_MAX_HEIGHT/2),
              },
            },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
        );
        return {...selectedImage, width:resizedImage.width, height:resizedImage.height};
      } else {
        return selectedImage
      }
    }));
  };



  //LOCAL NOTIFS
  export const requestNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
  
    // Si les permissions sont déjà accordées, on renvoie true
    if (status === 'granted') {
      return true;
    }
  
    // Sinon, on demande les permissions
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    
    // On renvoie true si les permissions sont maintenant accordées, sinon false
    return newStatus === 'granted';
  };

  const scheduleDailyNotification = async (notification, hour, minute, repeats) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.message,
        component : notification.page,
        datas: notification.datas,
      },
      trigger: {
        hour: hour,
        minute: minute,
        repeats: repeats,
      },
    });
  };