import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: '3%',
  },
  header: {
    height: 200,
    flexDirection: 'column',
    alignItems: 'center',
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

  statsContainer: {
    width: '100%',
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
  button: {
    height: 60,
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#2EE6A8',
    borderRadius: 26,
    marginHorizontal: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .3)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.3,
    elevation: 2, // Android
  },
  textButton: {
    fontSize: 22,
    fontFamily: 'Exo_800ExtraBold',
    color: 'white',
  },
  cardIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});