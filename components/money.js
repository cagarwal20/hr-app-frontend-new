//credit means the user gave the money to the staff so add and debit means you took the money from staff
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity,FlatList,Alert, TextInput,Switch} from 'react-native';
import SignUp from './signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SelectList } from 'react-native-dropdown-select-list';
import Add from './add';
// import Modify from './modify';
import Delete from './delete';
import { TRANSACTIONS_API_ROOT } from '../assets/statics';

const Tab = createBottomTabNavigator();
export default function Money({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [money,setmoney] = useState(0);
  const [staffname , setstaffname] = useState("");
  const [id,setstaffid] = useState("");
  const [addflag,setaddflag] = useState(false);
  const [amount,setamount] = useState("");
  const [details,setdetails] = useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
  
  const staffsetter = async (id)=>{
    try{
      const response = await fetch(`${TRANSACTIONS_API_ROOT}get_money/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          id:id
        })
      });
      const res = await response.json();
      console.log(res)
      setmoney(res['data']['money'])
      setstaffname(res['data']['first_name'] + " " +  res['data']['last_name'])
      setstaffid(res['data']['id'])
    } catch (error) {
      console.error(error);
    } finally {
      // setLoading(false);
    }
  };
  const addsettleup = async(id,amount,isEnabled,details) =>{
    try{
      amount1 = amount
      if(isEnabled==true)
      {
        // amount = -1*amount
        type = "credit"
        
      }
      else{
        amount = -1*amount
        type="debit"
      }
      console.log(amount)
      const response = await fetch(`${TRANSACTIONS_API_ROOT}add_settle_money/${id}/`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          money:amount
        })
      });
      const response1 = await fetch(`${TRANSACTIONS_API_ROOT}add_money_log/${id}/`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        
        body:JSON.stringify({
          money:amount1,
          type:type,
          details:details
        })
      });
      const res = await response.json();
      if(response.status==200){
        if(amount==0){
        Alert.alert(`Settled successfully for ${staffname}`)}
        else{
          Alert.alert(`Added succesfully for ${staffname}`)
        }
      }
      else{
        Alert.alert('Failed , try again!')
      }

    } catch (error) {
      console.error(error);
    } finally {
      setaddflag(false);
      setmoney(0);
      setstaffname("");
    }

  };
  

  useEffect(() => {
    getStaff();
    console.log(data)
  }, []);
  return (
      <SafeAreaView style={styles.container}>
          <View >
            <Text style={styles.textcolor}>Hi                          Sensi Staff  

</Text>
            <Text style={styles.textcolor}>Rohit</Text>
            <Text style={styles.headername}>Staff Credit/Debit</Text>
          </View>
          <SelectList 
        dropdownTextStyles={{color:'white'}}
        setSelected={(id) => staffsetter(id)}
        data={data} 
        save="id"
    />
        <Text style={{color:'white' ,flex:0.15 , textAlign:'center' , paddingTop:'5%' , fontSize:15}}>Amount: {money}</Text>
        <Text style={{color:'white' ,flex:0.15 , textAlign:'center' , paddingTop:'5%' , fontSize:15}}>{staffname}</Text>
        
        <View style={{paddingTop:10}}>{addflag?<View><Text style={{color:'white',textAlign:'center',fontSize:15}}>Amount in (INR)</Text><TextInput
        style={{color:'white', fontSize:20,textAlign:'center',borderWidth: 1,borderColor:'white'}}
        placeholder="Enter amount"
        onChangeText={amount => setamount(amount)}
        defaultValue={amount}
      /></View>:<Text></Text>}</View>
        <View style={{paddingTop:10}}>{addflag?<View><Text style={{color:'white',textAlign:'center',fontSize:15}}>Details</Text><TextInput
          style={{color:'white', fontSize:20,textAlign:'center',borderWidth: 1,borderColor:'white'}}
          placeholder="Details"
          onChangeText={details => setdetails(details)}
          defaultValue={details}
        /></View>:<Text></Text>}</View>
        <View style={{flexDirection:'row' }}>
          {(addflag) ?(isEnabled)?<Text style={{color:'white',textAlign:'left',fontSize:15 ,paddingTop:10}}>Credit</Text>:<Text style={{color:'white',textAlign:'left',fontSize:15,paddingTop:10}}>Debit</Text>:<Text></Text>}
        <View style={{paddingTop:10}}>{addflag?<View><Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{textAlign:'right',paddingTop:10}}
        /></View>:<Text></Text>}</View></View>

       <View >{addflag?<TouchableOpacity style={styles.button} onPress={()=>addsettleup(id,amount,isEnabled,details)}>
                <Text style={{color:'pink' , textAlign:'center' , fontSize:25,paddingTop:10}}>Save</Text>
          </TouchableOpacity>:<Text></Text>}</View>
        
        <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
          <TouchableOpacity style={styles.button} onPress={()=>setaddflag(true)}>
                <Text style={styles.buttontextleft}>Add Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>addsettleup(id,0)}>
                <Text style={styles.buttontextright}>Settle Up</Text>
          </TouchableOpacity>
        </View>
          
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
    color:'yellow',
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
  }
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


  