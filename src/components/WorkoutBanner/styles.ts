import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    marginTop: 20,
    padding: 35,
    borderRadius: 40,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerImage: {
    flex: 1,
  },
  model3D: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    zIndex: 10,
    width: '50%',
    height: '120%',
    resizeMode: 'contain',
    transform: [{ rotateY: '180deg' }],
  },
  bannerRowContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fireImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireImage: {
    height: 15,
    width: 15,
    alignSelf: "center",
    margin: 5
  },
  fireText: {
    color: 'white',
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireText2: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  }
});