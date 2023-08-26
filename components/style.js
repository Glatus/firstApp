import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  // App
  container: {
    backgroundColor: '#232622',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  banner: {
    width: 400,
    height: 300,
    borderBottomRightRadius: 50,
  },
  // Listitem
  item: {
    backgroundColor: '#48c71e',
    flexDirection: 'row',
    marginTop: 5,
    width: 400,
  },
  image: {
    width: '30%',
    height: '94%',
    margin: 5,
    borderBottomLeftRadius: 50,
  },
  title: {
    fontWeight: 'bold',
  },
  content: {
    height: 100,
  },
  // Header
  bannerContainer: {
    position: 'relative',
  },
  bannerText: {
    position: 'absolute',
    bottom: '10%',
    color: 'lime',
    backgroundColor: 'darkblue',
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 1,
    fontSize: 15,
    padding: 7,
  },
  icon: {
    width: 50,
    height: 50,
    position: 'absolute',
    right: 0,
    top: '10%',
  },
});
export default styles;
