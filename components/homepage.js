import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {SafeAreaView ,StyleSheet, Text, View,ScrollView ,Image,Button,TouchableOpacity,FlatList,Alert} from 'react-native';
import SignUp from './signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TRANSACTIONS_API_ROOT } from '../assets/statics';
import Add from './add';
// import Modify from './modify';
import Delete from './delete';
import Money from './money';
import Profile from './profile'
const Tab = createBottomTabNavigator();
export default function HomePage({navigation}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
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
      const response = await fetch(`${TRANSACTIONS_API_ROOT}get_staff/`, {
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
            <Text style={styles.headername}>Staff List</Text>
          </View>
           <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.push('Add')}>
              <Text style={styles.buttontextleft}>Add staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.push('Modify')}>
              <Text style={styles.buttontextmid}>Modify staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.push('Delete')}>
              <Text style={styles.buttontextright}>Delete staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.push('Money')}>
              <Text style={styles.buttontextmoney}>Check Money</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('MoneyLogs')}>
              <Text style={styles.buttontextleft1}>Money Logs</Text>
            </TouchableOpacity> 
            {/* <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Modify')}>
              <Text style={styles.buttontextmid}>Modify staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Delete')}>
              <Text style={styles.buttontextright}>Delete staff</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Money')}>
              <Text style={styles.buttontextmoney}>Check Money</Text>
            </TouchableOpacity> */}
          </View> 
          <View style={{flexDirection:'row'}}>
            <FlatList
          data={data}
          renderItem={({item}) => <View style={{flexDirection:'column' , flex:1}}><TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('Profile',{id:item.id})}><View style={{flexDirection:'row', padding:5 , justifyContent:'space-between'}} ><Text style={styles.cardsleft}>{item.first_name} {item.last_name}  <Text style={{textAlign:'center',fontSize:15}}>                  {item.details}</Text>  </Text></View></TouchableOpacity>
          {/* <Text style={styles.cardsmid}></Text><Text style={styles.cardsright}>{item.last_name}</Text></View> */}
        
         
          </View>
        }
        
        />
        
          </View>
          {/* <Tab.Navigator>
            <Tab.Screen name="Sign up" component={SignUp} />
          </Tab.Navigator> */}
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
    fontSize:15
  },
  buttontextleft1:{
    color:'pink',
    textAlign:'left', 
    fontSize:15
  },
  buttontextmid:{
    color:'yellow',
    textAlign:'center', 
    fontSize:15
  },
  buttontextright:{
    color:'red',
    textAlign:'right', 
    fontSize:15
  },
  buttontextmoney:{
    color:'purple',
    textAlign:'right', 
    fontSize:15
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
    color:'pink',
    textAlign: 'left',
    fontSize: 20,
    fontFamily: 'Roboto',
    padding:'7%',
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
    color:'green',
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


  