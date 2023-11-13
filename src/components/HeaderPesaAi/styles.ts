import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    top: 20,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: "contain",
  },
  body: {
    flex: 1,
    backgroundColor: 'white',
  },
  unionCircles: {
    resizeMode: "contain",
  },
  textWrapper: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appFirstTitle: {
    fontFamily: 'Exo_800ExtraBold',
    fontSize: 63,
    letterSpacing: 3,
    color: '#2EE6A8'
  },
  appSecondTitle: {
    fontFamily: 'Exo_800ExtraBold',
    fontSize: 63,
    letterSpacing: 3,
    color: '#24B3B3'
  },
});