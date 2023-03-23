import { StatusBar } from 'expo-status-bar';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity,TextInput} from 'react-native';
import { useState } from 'react';
import { TRANSACTIONS_API_ROOT } from '../assets/statics';
import HomePage from './homepage';
import { Alert } from 'react-native';
import Landing from './landing';
import Login from './login';
export default function SignUp({navigation}) {
  const [username,setusername] = useState("")
  const [password1,setpassword1] = useState("")
  const [password2,setpassword2] = useState("")
  const [email,setemail] = useState("")
  const register = async(username,password1,password2,email) =>{
    try{
      console.log(username)
      console.log(TRANSACTIONS_API_ROOT)
    const response = await fetch(`${TRANSACTIONS_API_ROOT}register/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username:username,
        password1:password1,
        password2:password2,
        email:email
      }),
      
    });
    if(response.status==200){
      Alert.alert('registeration success')
      navigation.navigate('Landing')
    }
    else{
      Alert.alert('registeration failure')
      navigation.navigate('Landing')
    }
    
  } catch (error) {
    console.error(error);
  } finally {
    // setLoading(false);
  }
};
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textcolor}>Sensi-Staff</Text>
        <Image source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{width: 400, height: 100 , flex:0.75}}/>
        <TextInput style={styles.userpass} placeholder='Username' onChangeText={setusername}
        value={username}/>
        <TextInput style={styles.userpass} placeholder='enter password' onChangeText={setpassword1}
        value={password1} secureTextEntry={true}/>
        <TextInput style={styles.userpass} placeholder='Confirm the password' onChangeText={setpassword2}
        value={password2} secureTextEntry={true}/>
        <TextInput style={styles.userpass} placeholder='enter email' onChangeText={setemail}
        value={email} secureTextEntry={true}/>
        {/* <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
          <Text style={styles.buttontextotp}>Get OTP!</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.button} onPress={()=>register(username,password1,password2,email)}>
            <Text style={styles.buttontextsubmit}>Submit</Text>
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
    fontSize: 10
  },
  buttontext:{
    color:'white',
    textAlign:'center', 
    fontSize:35
  },
  userpass:{
    color:'black',
    backgroundColor:'white',
    maxHeight:100,
    flex:0.1,
  },
  buttontextsubmit:{
    color:'white',
    textAlign:'center', 
    fontSize:35,
    textAlign: 'center'
  },
  buttontextotp:{
    color:'white',
    textAlign:'center', 
    fontSize:15,
    textAlign: 'right'
  },

});


  