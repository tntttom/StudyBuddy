
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
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from './Welcome.js';
import RegisterScreen from './Register.js';
import LoginScreen from './Login.js';
import OnboardPersonalScreen from './OnboardPersonal.js';
import OnboardEducationScreen from './OnboardEducation.js';
import OnboardHighSchoolScreen from './OnboardHighSchool.js';
import OnboardCollegeScreen from './OnboardCollege.js';
import ProfileScreen from './Profile.js';
import HomeScreen from './Home.js';
import StudyDetailsScreen from './StudyDetails.js';

const Stack = createStackNavigator();

function App()  {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnboardPersonal">
        <Stack.Screen name ="Welcome" component ={WelcomeScreen} options={{headerShown: false}} />
        <Stack.Screen name ="Register" component={RegisterScreen} options={{headerShown: false}} />
        <Stack.Screen name ="Login" component={LoginScreen} />
        <Stack.Screen name ="OnboardPersonal" component={OnboardPersonalScreen} />
        <Stack.Screen name ="OnboardEducation" component={OnboardEducationScreen} />
        <Stack.Screen name ="OnboardHighSchool" component={OnboardHighSchoolScreen} />
        <Stack.Screen name ="OnboardCollege" component={OnboardCollegeScreen} />
        <Stack.Screen name ="Profile" component={ProfileScreen} />
        <Stack.Screen name ="Home" component={HomeScreen} />
        <Stack.Screen name ="StudyDetails" component={StudyDetailsScreen} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
