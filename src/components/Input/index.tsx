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
  onSelectedValue: (value: string) => void,
  data: string;
  icon: ImageSourcePropType,
}

const Input = ({ selectLabel, selectPlaceHolder, onSelectedValue, data, icon }: Props) => {

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF7C29', marginBottom: 10, marginStart: 5 }}>{selectLabel}</Text>
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
          placeholderTextColor='grey'
          keyboardType="decimal-pad"
          autoCapitalize="none"
          value={data}
          textContentType="none"
          onChangeText={onSelectedValue}
        />
      </View>
    </View>
  );
};

export default Input;