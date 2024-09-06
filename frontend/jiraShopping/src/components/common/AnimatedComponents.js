import React, { useState, forwardRef, useRef, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image, Modal } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


export const LeftToRightViewBox = ({ show, children, duration, styles }) => {
    const translateX = useSharedValue(-300); // initial position (out of screen)
  
    useEffect(() => {
      // Animate to 0 when `show` is true, otherwise back to -300
      translateX.value = withTiming(show ? 0 : -300, { duration: duration });
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