import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  screen: {
    margin: '3%',
  },
  dietScreen: {
    marginHorizontal: '3%',
  },
  goalScreen: {
    flex: 1,
    marginHorizontal: '3%',
    marginVertical: '3%',
  },

  screenContainer: {
    flex: 1,
  },
  header: {
    height: 150,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
  },
  middleScreen: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5,
    elevation: 2, // Android
  },
  caloriesContainer: {
    height: '50%',
    marginTop: '5%',
    alignItems: 'center',
  },
});