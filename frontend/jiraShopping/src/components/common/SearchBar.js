import React, { forwardRef, useState,  } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Input, Icon } from 'react-native-elements';


//custom styles
import { appColors, appFont, customText } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';


//custom app datas  backgroundColor : appColors.white,
const SearchBar =  forwardRef((props, ref) => {
    const { value, onChangeText, placeholder, placeholderTextColor, styles, isPrev } = props
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={[searchBarStyles.container, styles.searchBarContainer ]}>
            <Input placeholder={placeholder} value={value} onChangeText={onChangeText} ref={ref}
                placeholderTextColor={placeholderTextColor}
                style = {[searchBarStyles.input, isFocused && searchBarStyles.inputFocused, styles.searchBarInput]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                underlineColorAndroid='transparent'
                inputStyle={[customText.text]}
                inputContainerStyle={ { borderBottomWidth: isPrev ? 1 : 1,borderRadius:styles.searchBarInput.borderRadius, flex:1, }}
                leftIcon={ !isPrev ? false :
                    <Pressable onPress={() => {console.log("Go")}}>
                        <Icon name='arrow-back' type='ionicon' />
                    </Pressable>
                }

            />
      </View>

    )
});
    


export default  SearchBar