import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  // App
  container: {
    backgroundColor: '#232622',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
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
  // Profile
  Vcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  Pimage: {
    width: '100%',
    height: '50%',
    margin: 5,
    borderBottomLeftRadius: 50,
  },
  // Single
  Scontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  Simage: {
    width: screenWidth,
    height: screenHeight / 1.5,
    resizeMode: 'contain',
  },
  Stitle: {
    fontWeight: 'bold',
    fontSize: 30,
    padding: 5,
  },
  Stext: {
    fontSize: 20,
  },
  // Login
  Lcontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
