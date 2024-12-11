import React, { forwardRef, useState,  } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

//custom styles
import { appColors, appFont, customText } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';


//custom app datas  backgroundColor : appColors.white,
const SearchBar =  forwardRef((props, ref) => {
    const navigation = useNavigation()
    const { value, onChangeText, placeholder, placeholderTextColor, styles, isPrev, onSubmitEditing } = props
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={[searchBarStyles.container, styles.searchBarContainer ]}>
            {!isPrev ? false :
                <View>
                    <Pressable onPress={() => {navigation.goBack();}} style={searchBarStyles.prevButton}>
                        <Icon name='arrow-back' type='ionicon' color={appColors.secondaryColor5} />
                    </Pressable>
                </View>
            }
            <View style={{width:10,}}></View>
            <Input placeholder={placeholder} value={value} onChangeText={onChangeText} ref={ref}
                inputMode='search'
                placeholderTextColor={placeholderTextColor}
                inputStyle = {[searchBarStyles.inputText, ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid='transparent'
                containerStyle={ [searchBarStyles.containerBox, styles.searchBarContainer,]}
                inputContainerStyle = {[searchBarStyles.inputContainer, styles.searchBarInput, isFocused && searchBarStyles.inputContainerFocused,]}
                leftIcon={ 
                    <Pressable onPress={() => {console.log("Go")}}>
                        <Icon name='search' type='ionicon' color={appColors.secondaryColor1} />
                    </Pressable>
                }
                onSubmitEditing={onSubmitEditing}
            />
      </View>

    )
});
    


export default  SearchBar