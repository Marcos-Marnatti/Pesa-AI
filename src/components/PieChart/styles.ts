import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pieContainer: {
    width: '100%',
    height: '60%',
    flexDirection: 'row',
    backgroundColor: '#d7f0f7',
    // backgroundColor: '#2EE6A8',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: 'lightgrey',
    shadowOffset: { width: -5, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  caloriesText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  caloriesImage: {
    width: 45,
    height: 45,
    top: -90,
    left: 10,
  },
  macrosText: {
    marginTop: 10,
    alignSelf: 'flex-start',
    fontWeight: 'bold'
  }
});