
import 'react-native-gesture-handler';

import React, {useState, useEffect} from 'react';

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
import LoadingScreen from './Screens/Loading.js';

import auth from '@react-native-firebase/auth';
import dbRefs from './api/firebase-database.js';
import { Value } from 'react-native-reanimated';

function AppStack(isNewUser) {
  if (isNewUser == 'true' || isNewUser == null || isNewUser == 'undefined') {
    return (
      <>
        <Stack.Screen name ="OnboardPersonal" component={OnboardPersonalScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardEducation" component={OnboardEducationScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardHighSchool" component={OnboardHighSchoolScreen} options={{headerShown: false}}/>
        <Stack.Screen name ="OnboardCollege" component={OnboardCollegeScreen} options={{headerShown: false}}/>
      </>
    );
  }
  else {
    return (
      <>
        <Stack.Screen name ="Profile" component={ProfileScreen} options={{headerShown:false}}/> 
        <Stack.Screen name ="Home" component={HomeScreen} options={{title:'study', headerTitleStyle: {fontFamily: 'Montserrat-Medium', fontSize: 32}, }}/>
        <Stack.Screen name ="StudyDetails" component={StudyDetailsScreen} />
      </>
    );
  }
}

function AuthStack() {
  return(
    <>
      <Stack.Screen name ="Welcome" component ={WelcomeScreen} options={{headerShown: false}} />
      <Stack.Screen name ="Register" component={RegisterScreen} options={{headerShown: false}} />
      <Stack.Screen name ="Login" component={LoginScreen} options={{headerShown: false}}/>
    </>
  );
}

const Stack = createStackNavigator();

function App()  {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState();
  const [isNewUser, setIsNewUser] = useState(true);

  function onAuthStateChanged(userToken) {
    setUserToken(userToken);
    if (isLoading) setIsLoading(false);
  }

  if (userToken != null) {
    dbRefs.users.child(userToken.uid).child('/isNewUser').on('value', (snapshot) => {
      setIsNewUser(JSON.stringify(snapshot));
    })
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator>
        {(userToken == null) ? AuthStack() : AppStack(isNewUser)}        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
