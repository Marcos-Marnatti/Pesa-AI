import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginHorizontal: '3%',
    marginTop: 8
  },
  statsBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
  },
  text: {
    fontFamily: 'Exo_400Regular',
    color: "#52575D"
  },
  myIcon: {
    width: 46,
    height: 46,
    alignSelf: 'center',
  },
  macrosText: {
    marginTop: 14,
    fontFamily: 'Exo_400Regular',
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
});