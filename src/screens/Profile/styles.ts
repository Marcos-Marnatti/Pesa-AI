import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  text: {
    fontFamily: 'Exo_400Regular',
    color: "#52575D"
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500"
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden"
  },
  add: {
    backgroundColor: '#2EE6A8',
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 42,
    height: 42,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center"
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginHorizontal: '3%',
    marginTop: 32
  },
  statsBox: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
  },
  myIcon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginStart: 15,
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
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 40,
    shadowColor: 'rgba(0,0,0, .5)', // IOS
    shadowOffset: { height: 1, width: 1 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1.5,
    elevation: 2, // Android
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
  caloriesImage: {
    width: 45,
    height: 45,
    top: -90,
    left: 10,
  },
  macrosText: {
    marginTop: 14,
    // alignSelf: 'center',
    fontFamily: 'Exo_400Regular',
  }
});