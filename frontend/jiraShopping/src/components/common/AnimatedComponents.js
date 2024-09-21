import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { screenWidth } from '../../styles/commonStyles';

export const LeftToRightViewBox = ({ show, children, duration, from, to, styles }) => {
    const translateX = useSharedValue(from); // initial position (out of screen)
  
    useEffect(() => {
      // Animate to 0 when `show` is true, otherwise back to -300
      translateX.value = withTiming(show ? to : from, { duration: duration });
    }, [show]);
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });
  
    return (
      <Animated.View style={[styles, animatedStyles]}>
        {children}
      </Animated.View>
    );
  };


  export const RightToLeftViewBox = ({ show, children, to, from, duration, styles }) => {
    const translateX = useSharedValue(from); // initial position (out of screen)
  
    useEffect(() => {
      // Animate to 0 when `show` is true, otherwise back to -300
      translateX.value = withTiming(show ? to+20: from, { duration: duration });
    }, [show]);
  
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: translateX.value }],
      };
    });
  
    return (
      <Animated.View style={[styles, animatedStyles,]}>
        {children}
      </Animated.View>
    );
  };


  /*

   <LeftToRightViewBox show={show3} duration={200} from={0} to={screenWidth/2} styles={{position : 'absolute',}}>
                <View style={[preferencesStyles.winkelBox]}>
                    <Text style={[customText.text, preferencesStyles.winkelText, {}]}>Winkel</Text>
                </View>
              </LeftToRightViewBox>

              */