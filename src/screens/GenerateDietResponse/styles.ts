import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  header: {
    height: 100,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: '#EDEDED',
  },
  avatarContainer: {
    top: 10,
    height: 70,
    width: 70,
    borderRadius: 25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    marginHorizontal: '3%'
  },
  avatar: {
    height: '90%',
    width: '90%',
    alignSelf: 'center',
  },
  middleScreen: {
    height: '78%',
    backgroundColor: 'white',
    borderRadius: 50,
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5,
    elevation: 2, // Android
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.6
  },

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
    fontSize: 12,
    color: "#52575D"
  },
  myIcon: {
    width: 46,
    height: 46,
    alignSelf: 'center',
  },
});