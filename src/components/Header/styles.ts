import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  headerOption: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
  avatarContainer: {
    height: 90,
    width: 90,
    borderRadius: 25,
    overflow: 'hidden',
  },
  title: {
    flex: 1,
    paddingHorizontal: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 12,
    marginTop: 2,
    opacity: 0.6
  }
});