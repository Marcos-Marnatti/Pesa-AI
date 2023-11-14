import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 450,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  cardContainer: {
    height: 350,
    width: 350,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 40,
    marginRight: 20,
    shadowColor: 'rgba(0,0,0, .3)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.3,
    elevation: 2, // Android
  },
  cardImageContainer: {
    backgroundColor: 'purple',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    shadowColor: 'rgba(0,0,0, .3)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.3,
    elevation: 2, // Android
  },
  cardImage: {
    height: 100,
    width: 100,
  },
  cardTitle: {
    fontFamily: 'Exo_800ExtraBold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 100,
  },
  text: {
    fontFamily: 'Exo_400Regular',
    color: "#52575D"
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  foodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  myIcon: {
    width: 46,
    height: 46,
  },
});