import React, { useState,  } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Input } from 'react-native-elements';


//custom styles
import { appColors, appFont } from '../../styles/commonStyles';
import { searchBarStyles } from '../../styles/searchBarStyles';


//custom app datas
const SearchBar =  ({ value, onChangeText, placeholder }) => {
    const [isFocused, setIsFocused] = useState(false)
    return (
        <View style={searchBarStyles.container}>
            <TextInput placeholder={placeholder} value={value} onChangeText={onChangeText}
                placeholderTextColor={appColors.mainColor}
                style = {[searchBarStyles.input, isFocused && searchBarStyles.inputFocused]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
      </View>
    )
};
    


export default  SearchBar