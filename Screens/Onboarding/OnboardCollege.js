

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import auth from '@react-native-firebase/auth';
import dbRefs from '../../api/firebase-database';

export default class OnboardCollegeScreen extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            schoolName: '',
            major: '',
            graduationYear: '',
            location: '',
        }
    } 
    
    addUserProfile() {
        dbRefs.users.child(auth().currentUser.uid).child('profile').update({
            schoolName: this.state.schoolName,
            major: this.state.major,
            graduationYear: this.state.graduationYear,
            location: this.state.location
        })
        .then(() => {
            console.log('Updated user profile.');
        })
        .catch((error) => {
            console.log(error);
        })

        dbRefs.users.child(auth().currentUser.uid).update({isNewUser: false})
        .then(() => {
            console.log('Completed registration.');
        })
        .catch((error) => {
            console.log(error);
        })
    }

    validateFields() {
        let schoolName = this.state.schoolName;
        let major = this.state.major;
        let graduationYear = this.state.graduationYear;
        let location = this.state.location;
        if (schoolName == '' || major == '' || graduationYear == '' || location == '') {
            Alert.alert('Incomplete Form','Please fill out all fields');
            return false; 
        }
        if (graduationYear.length != 4 || isNaN(graduationYear)) {
            Alert.alert('Invalid Graduation Year','Graduation year must be 4 digits long (e.g. 2020)');
            return false;
        }
        return true;
    }

    render() {
        return (

        <LinearGradient colors={['#FE41C6','#4839FF']} style={{flex:1}}>
            <View style={styles.container}>
            <View style={styles.onbordContainer}>
                <Text style={styles.onboardText} >university</Text>
            </View>

            <View style={styles.formContainer}>
                
                <View style={styles.textInputContainer}>
        
                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="school name"
                    onChangeText={text => this.setState({schoolName: text})}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="major"
                    onChangeText={text => this.setState({major: text})}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="graduation year"
                    keyboardType='number-pad'
                    onChangeText={text => this.setState({graduationYear: text})}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="location"
                    onChangeText={text => this.setState({location: text})}
                    />

                </View>


                <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                <TouchableOpacity style={styles.button}
                onPress={() => {
                    if (this.validateFields()) {
                        this.addUserProfile();
                    }                    
                }}>
                        <Text style={styles.buttonText}>COMPLETE REGISTRATION</Text>
                </TouchableOpacity>
                </View>
                
                

            </View>

            

        </View>
       
    </LinearGradient>
    );

}

}

const styles = StyleSheet.create({

container: {
    flex: 1
},
onbordContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
},  

onboardText: {
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontFamily: 'Montserrat-Medium',
    fontSize: 48,
    color: 'white',
},

formContainer: {
    flex: 0.5,
    flexDirection:'column',
    alignItems: 'stretch',
    justifyContent: 'center',
},  

textInputContainer: {
    flex: 1,
    alignItems:'stretch',
    justifyContent:'space-evenly',
    paddingHorizontal: 50,
},

textInputStyle: {
    textAlign: 'center',
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color:'white',
    borderBottomWidth: 1,
    borderBottomColor: 'white'
},

button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 25,
},

buttonText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    color: 'white',
}
})