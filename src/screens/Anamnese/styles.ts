import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  banner: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: '3%',
    marginBottom: 50,
    borderRadius: 20,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    marginHorizontal: '3%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  healthImage: {
    resizeMode: 'contain',
    marginBottom: 10,
  },
  button: {
    height: 60,
    marginTop: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  sliderContainer: {
    flexDirection: "row",
    marginHorizontal: '3%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    width: 340, height: 40, marginHorizontal: '3%', left: -10, shadowColor: 'rgba(0,0,0, .3)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1.3,
    elevation: 2,
  },
  sliderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'purple',
    marginTop: 15,
    marginHorizontal: '3%',
  },
  sliderValueBackground: {
    backgroundColor: '#2EE6A8',
    justifyContent: 'center',
    alignItems: 'center',
    width: 35,
    height: 25,
    left: -5,
    borderRadius: 30,
    shadowColor: 'rgba(0,0,0, .3)',
    shadowOffset: { height: 0.3, width: 0.3 },
    shadowOpacity: 1,
    shadowRadius: 1.3,
    elevation: 2,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});