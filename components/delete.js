import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity,FlatList,Alert,TextInput} from 'react-native';
import SignUp from './signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SelectList } from 'react-native-dropdown-select-list'
import { TRANSACTIONS_API_ROOT } from '../assets/statics';
// import Modify from './modify';
// import Delete from './delete';

const Tab = createBottomTabNavigator();
export default function Delete({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const[fname,setfname] = useState();
  const [lname,setlname] = useState();
  const [staff, setstaff] = useState("");

  // const getStaff = async () => {
  //     try {
  //       const response = await fetch('http://127.0.0.1:8000/get_staff/',{method:'GET',headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //       }});
  //       const json = await response.json();
  //       setData(json.data);
  //       console.log(json.data)
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  const showAlert = () =>
  Alert.prompt(
    "Enter password",
    "Enter your password to claim your $1.5B in lottery winnings",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "OK",
        onPress: password => console.log("OK Pressed, password: " + password)
      }
    ],
    "secure-text"
  );
  const getStaff = async () => {
    try{
      const response = await fetch(`${TRANSACTIONS_API_ROOT}get_list_delete/`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      const res = await response.json();
      setData(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };
  const deleteStaff = async(staff) =>{
    try{
      const response = await fetch(`${TRANSACTIONS_API_ROOT}delete_staff/`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id:staff,
        }),
      });
      const res = await response.json();
      if(response.status=200){
        Alert.alert('Deleted succesfully')
      }
      else{
        Alert.alert('Failed , try again')
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    getStaff();
    console.log(data)
  }, []);
  return (
      <SafeAreaView style={styles.container}>
        <Text style={{color:'white' ,flex:0.15 , textAlign:'center' , paddingTop:'15%' , fontSize:35}}>Delete Staff</Text>
          {/* <Text > Demo Form </Text>
      <View>
        <TextInput style={{color:'white', justifyContent:'space-between' , textAlign:'left' }}
          placeholder="Email" />
        <TextInput
          secureTextEntry={true}
          placeholder="Password"
        />
        {/* <Picker
          selectedValue={currency}
          onValueChange={currentCurrency => setCurrency(currentCurrency)}>
          <Picker.Item label="USD" value="US Dollars" />
          <Picker.Item label="EUR" value="Euro" />
          <Picker.Item label="NGN" value="Naira" />
        </Picker> */}
        {/* <Text style={{color:'white',textAlign:'center'}}>
          Selected:  */}
            <SelectList 
        dropdownTextStyles={{color:'white'}}
        setSelected={(id) => setstaff(id)}
        placeholder={<Text style={{color:'white'}}>{staff}</Text>}
        data={data} 
        save="id"
    />
        <Text style={{color:'white' ,flex:0.15 , textAlign:'center' , paddingTop:'15%' , fontSize:35}}>Selected: {staff}</Text>
        <TouchableOpacity onPress={()=>deleteStaff(staff)}><Text style={{color:'red' , textAlign:'center' , paddingTop:'10%' , fontSize:35}}>Delete</Text></TouchableOpacity>
      
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
    fontWeight: 'bold',
    color:'white',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  button: {
    backgroundColor: '#000',
    paddingTop: 10,
    fontSize: 5
  },
  buttontextleft:{
    color:'green',
    textAlign:'left', 
    fontSize:25
  },
  buttontextmid:{
    color:'yellow',
    textAlign:'center', 
    fontSize:25
  },
  buttontextright:{
    color:'red',
    textAlign:'right', 
    fontSize:25
  },
  textlogo:{
    fontWeight: 'bold',
    color:'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto',
  },
  profilelogo:{
    textAlign: 'right',
  },
  cardsleft:{
    fontWeight: 'bold',
    color:'white',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Roboto',
    paddingTop:'15%',
  },
  cardsmid:{
    fontWeight: 'bold',
    color:'white',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Roboto',

  },
  cardsright:{
    fontWeight: 'bold',
    color:'white',
    textAlign: 'right',
    fontSize: 20,
    fontFamily: 'Roboto',

  },
  headername:{
    textAlign:'center',
    color:'white',
    fontSize:20,
    fontWeight:'bold',
    fontFamily:'Roboto',
    paddingTop:'7%'
  },
  userpass:{
    color:'black',
    backgroundColor:'white',
    maxHeight:100,
    flex:0.1,
    textAlign:'center',
    justifyContent:'center',
  },
});


// import { StatusBar } from 'expo-status-bar';
// import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity} from 'react-native';
// import Login from './login';
// import SignUp from './signup';
// export default function Landing({navigation}) {
//   return (
//     <SafeAreaView style={styles.container}>
//         <Text style={styles.textcolor}>Sensi-Staff</Text>
//         <Image source={{
//             uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
//           }}
//           style={{width: 400, height: 100 , flex:0.75}}/>
//         <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Login')}>
//             <Text style={styles.buttontext}>Login</Text>
//         </TouchableOpacity>
      
//         <TouchableOpacity style={styles.button}  onPress={()=>navigation.navigate('Sign up')}>
//             <Text style={styles.buttontext} >Sign up</Text>
//         </TouchableOpacity>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     // alignItems: 'center',
//     // justifyContent: 'center',
//   },
//   textcolor:{
//     flex:0.13,
//     fontWeight: 'bold',
//     color:'white',
//     textAlign: 'center',
//     fontSize: 60,
//     fontFamily: 'Roboto',
//   },
//   button: {
//     backgroundColor: '#000',
//     paddingTop: 40,
//     fontSize: 10,
//   },
//   buttontext:{
//     color:'white',
//     textAlign:'center', 
//     fontSize:35,
//   }
// });


  