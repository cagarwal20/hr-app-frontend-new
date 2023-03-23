import { StatusBar } from 'expo-status-bar';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity, TextInput} from 'react-native';
import { Alert } from 'react-native';
import { useState } from 'react';
import HomePage from './homepage';
import { TRANSACTIONS_API_ROOT } from '../assets/statics';
export default function Login({navigation}) {
  const [username , setusername] = useState("");
  const [password,setpassword] = useState("");
  //const url = process.env.API_URL
  //console.log(url)
  const login = async(username,password) =>{
    try{
      console.log(username)
      console.log(TRANSACTIONS_API_ROOT)
    const response = await fetch(`${TRANSACTIONS_API_ROOT}login/`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        username:username,
        password:password
      }),
      
    });
    if(response.status==200){
      Alert.alert('login success')
      navigation.navigate('HomePage')
    }
    else{
      Alert.alert('login failure')
      navigation.navigate('HomePage')
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
          style={{width: 400, height: 50 , flex:0.45,paddingBottom:100}}/>
        {/* <TouchableOpacity style={styles.button} onPress={console.log('Login Initiated')}>
            <Text style={styles.buttontext}>Aao login</Text>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.button}  onPress={console.log('Sign up Initiated')}>
            <Text style={styles.buttontext} >Sign up</Text>
        </TouchableOpacity> */}
        <TextInput style={styles.userpass} placeholder='username' onChangeText={setusername}
        value={username}/>
        <TextInput style={styles.userpass} placeholder='password' onChangeText={setpassword}
        value={password} secureTextEntry={true}/>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('HomePage')}>
          <Text style={styles.buttontextforgotpassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>login(username,password)}>
            <Text style={styles.buttontextsubmit}>Login</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
            <Text style={styles.buttontextforgotpassword}>Forgot Password?</Text>
        </TouchableOpacity> */}
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
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  userpass:{
    color:'black',
    backgroundColor:'white',
    //maxHeight:200,
    height: "100%",
    width:'100%',
    position:'relative',
    flex:0.7,
  },
  button: {
    backgroundColor: '#000',
    paddingTop: 40,
    fontSize:10,
    textAlign: 'left'
  },
  buttontextsubmit:{
    color:'white',
    textAlign:'center', 
    fontSize:35,
    textAlign: 'center'
  },
  buttontextforgotpassword:{
    color:'white',
    textAlign:'center', 
    fontSize:15,
    textAlign: 'right'
  },

});


  