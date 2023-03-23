import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import Landing from './components/landing';
import SignUp from './components/signup';
import Login from './components/login';
import HomePage from './components/homepage';
import Add from './components/add';
import Delete from './components/delete';
import Modify from './components/modify'; 
import Money from './components/money'; 
import MoneyLogs from './components/moneylogs'
import Profile from './components/profile'
// import Delete from './components.js/delete';
// import Modify from './components.js/modify';
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name=""
    //       component={Landing}
          
    //     />
    //     <Stack.Screen name="Login" component={Login} />
    //     <Stack.Screen name="Sing up" component={SignUp}/>
    //   </Stack.Navigator>
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Landing'>
        <Stack.Screen name="Landing" component={Landing}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Sign up" component={SignUp}/>
        <Stack.Screen name="HomePage" component={HomePage}/>  
        <Stack.Screen name="Add" component={Add}/> 
        <Stack.Screen name="Delete" component={Delete}/>
        <Stack.Screen name="Modify" component={Modify}/>
        <Stack.Screen name="Money" component={Money}/>
        <Stack.Screen name="MoneyLogs" component={MoneyLogs}/>
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
