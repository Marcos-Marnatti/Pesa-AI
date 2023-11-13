import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffff',
  },
  body: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: 'rgba(232, 232, 232, 0.23)',
    width: '90%',
    height: '60%',
    padding: 35,
    borderWidth: 0.2,
    borderColor: 'rgba(232, 232, 232, 1)',
    borderRadius: 40,
    overflow: 'hidden',
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginTop: 42,
  },

  forgetText: {
    fontFamily: 'Exo_400Regular',
    fontSize: 12,
    color: '#284866',
    textAlign: 'right',
    marginTop: 6,
  },

  button: {
    height: '12%',
    width: '100%',
    backgroundColor: '#2EE6A8',
    padding: 4,
    borderRadius: 6,
    marginTop: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: '#ffff',
    fontFamily: 'Exo_400Regular',
    fontSize: 24,
    textAlign: 'center',
  },
  signUpContainer: {
    paddingTop: 10,
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupFirstText: {
    fontFamily: 'Exo_400Regular',
    fontSize: 14,
    color: '#ffff',
    textAlign: 'center',
  },
  signupSecondText: {
    fontFamily: 'Exo_400Regular',
    fontSize: 14,
    color: '#284866',
    textAlign: 'center',
  },
});