import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    fontFamily: 'Exo_400Regular',
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontFamily: 'Exo_400Regular',
    fontSize: 16,
  },
  selectedTextStyle: {
    fontFamily: 'Exo_400Regular',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    fontFamily: 'Exo_400Regular',
    height: 40,
    fontSize: 16,
  },
  myIcon: {
    width: 24, 
    height: 24, 
    marginEnd: 10, 
  }
});