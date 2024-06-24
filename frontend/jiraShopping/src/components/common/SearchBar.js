import React, { forwardRef, useState,  } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { Input, Icon } from 'react-native-elements';


//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';


//custom app datas
const SearchBar =  forwardRef((props, ref) => {
    const { value, onChangeText, placeholder, placeholderTextColor, styles } = props
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={[searchBarStyles.container, styles.searchBarContainer]}>
            <Input placeholder={placeholder} value={value} onChangeText={onChangeText} ref={ref}
                placeholderTextColor={placeholderTextColor}
                style = {[searchBarStyles.input, isFocused && searchBarStyles.inputFocused, styles.searchBarInput]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                leftIcon={
                    <Pressable onPress={() => {console.log("Go")}}>
                        <Icon name='arrow-back' type='ionicon' />
                    </Pressable>
            }

            />
      </View>

    )
});
    


export default  SearchBar