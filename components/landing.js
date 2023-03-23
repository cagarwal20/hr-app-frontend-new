import { StatusBar } from 'expo-status-bar';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity} from 'react-native';
import Login from './login';
import SignUp from './signup';
export default function Landing({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textcolor}>Sensi-Staff</Text>
        <Image source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 400, height: 100 , flex:0.75}}/>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.buttontext}>Login</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate('Sign up')}>
            <Text style={styles.buttontext} >Sign up</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textcolor:{
    flex:0.13,
    fontWeight: 'bold',
    color:'white',
    textAlign: 'center',
    fontSize: 60,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#000',
    paddingTop: 40,
    fontSize: 10,
  },
  buttontext:{
    color:'white',
    textAlign:'center', 
    fontSize:35,
  }
});


  