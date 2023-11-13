import React, { useState } from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import { styles } from './style';


interface DataItem {
  label: string;
  value: string;
}

type Props = {
  selectLabel: string,
  selectPlaceHolder: string,
  isSearchable: boolean,
  onSelectedValue: (value: string) => void,
  data: DataItem[],
  icon: ImageSourcePropType,
  color?: string;
}

const DropdownComponent = ({ selectLabel, selectPlaceHolder, isSearchable, onSelectedValue, data, color, icon }: Props) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {selectLabel}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {isFocus ? renderLabel() : <Text style={{ fontSize: 16, fontWeight: 'bold', color: color ? color : 'purple', marginBottom: 10, marginStart: 5 }}>{selectLabel}</Text>}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={isSearchable}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${selectPlaceHolder}` : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value as unknown as React.SetStateAction<null>);
          onSelectedValue(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <Image source={icon} style={styles.myIcon} />
        )}
      />
    </View>
  );
};

export default DropdownComponent;