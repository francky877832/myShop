import React, { useState, forwardRef } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import {CommentsStyles } from '../../styles/productDetailsStyles';
import { appColors } from '../../styles/commonStyles';

const Comments = () =>
{

    return(
        <SafeAreaView>
            <View style={{flex:1}}>
                <CarouselImage styles={[]} />
                <View style={{ backgroundColor : appColors.white, }}>
                    <View>

                    </View>
                    <View>
                        <Text>Nom Produit</Text>
                        <Text>Nom cate</Text>
                    </View>
                    <View>
                        <Text>Condition</Text>
                        <Text>Couleur</Text>
                    </View>
                    <View>
                        <Text>Description--daha</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Comments