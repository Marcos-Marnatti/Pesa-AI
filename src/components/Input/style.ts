import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 8,
  },
  containerContent: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignContent: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  myIcon: {
    width: 24, 
    height: 24, 
    alignSelf: 'center',
    marginStart: 10,
  }
});