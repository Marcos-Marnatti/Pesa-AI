import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  myIcon: {
    width: 46,
    height: 46,
  },
  screenContainer: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#EDEDED',
  },
  header: {
    height: '21%',
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middleScreen: {
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5,
    elevation: 2, // Android
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchFoodTitle: {
    fontFamily: 'Exo_800ExtraBold',
    fontSize: 18
  },
  textButton: {
    fontSize: 22,
    fontFamily: 'Exo_800ExtraBold',
    color: 'white',
  },
});
