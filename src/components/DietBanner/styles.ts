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
    right: 200,
    bottom: 0,
    zIndex: 10,
    width: '50%',
    height: '110%',
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
    margin: 5,
    left: 200
  },
  fireText: {
    fontFamily:'Exo_400Regular',
    color: 'white',
    fontSize: 12,
    letterSpacing: 1,
    justifyContent: 'center',
    alignItems: 'center',
    left: 200,
  },
  fireText2: {
    fontFamily: 'Exo_800ExtraBold',
    fontSize: 22,
    letterSpacing: 2,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    left: 180,
  }
});