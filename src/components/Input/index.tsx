import React, { useState } from 'react';
import { TextInput, Image, ImageSourcePropType, Text, View } from 'react-native';

import { styles } from './style';

interface DataItem {
  label: string;
  value: string;
}

type Props = {
  selectLabel: string,
  selectPlaceHolder: string,
  onSelectedValue: (value: number) => void,
  data: number;
  icon: ImageSourcePropType,
  color?: string,
  placeHolderColor?: string,
}

const Input = ({ selectLabel, selectPlaceHolder, onSelectedValue, data, icon, color, placeHolderColor }: Props) => {

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: color, marginBottom: 10, marginStart: 5 }}>{selectLabel}</Text>
      <View style={styles.containerContent}>
        <Image source={icon} style={styles.myIcon} />
        <TextInput
          style={{
            flex: 1,
            height: 50,
            width: '100%',
            left: -35,
            borderColor: 'gray',
            borderWidth: 0.5,
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingStart: 45,
            fontSize: 16,
          }}
          placeholder={selectPlaceHolder}
          placeholderTextColor={placeHolderColor}
          keyboardType="decimal-pad"
          autoCapitalize="none"
          value={data.toString()}
          textContentType="none"
          onChangeText={text => onSelectedValue(Number(text))}
        />
      </View>
    </View>
  );
};

export default Input;