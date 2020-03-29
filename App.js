
 import 'react-native-gesture-handler';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './Screens/Welcome.js';
import RegisterScreen from './Screens/Register.js';
import LoginScreen from './Screens/Login.js';
import OnboardPersonalScreen from './Screens/Onboarding/OnboardPersonal.js';
import OnboardEducationScreen from './Screens/Onboarding/OnboardEducation.js';
import OnboardHighSchoolScreen from './Screens/Onboarding/OnboardHighSchool.js';
import OnboardCollegeScreen from './Screens/Onboarding/OnboardCollege.js';
import ProfileScreen from './Screens/Profile.js';
import HomeScreen from './Screens/Home.js';
import StudyDetailsScreen from './Screens/StudyDetails.js';

const Stack = createStackNavigator();

function App()  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name ="Welcome" component ={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name ="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name ="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardPersonal" component={OnboardPersonalScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardEducation" component={OnboardEducationScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardHighSchool" component={OnboardHighSchoolScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardCollege" component={OnboardCollegeScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="Profile" component={ProfileScreen} options={{title:'study', headerTitleStyle: {fontFamily: 'Montserrat-Medium', fontSize: 32}, headerShown:false}}/>
        <Stack.Screen name ="Home" component={HomeScreen} />
        <Stack.Screen name ="StudyDetails" component={StudyDetailsScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
