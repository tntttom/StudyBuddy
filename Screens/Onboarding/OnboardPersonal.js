
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import auth from '@react-native-firebase/auth';
import dbRefs from '../../api/firebase-database';

export default class OnboardPersonalScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            phoneNumber: '',
            birthday: '',
            gender: '',
        }
    }

    addUserProfile() {
        dbRefs.users.child(auth().currentUser.uid).child('profile').update({
            name: this.state.name,
            phoneNumber: this.state.phoneNumber,
            birthday: this.state.birthday,
            gender: this.state.gender,
        })
        .then(() => {
            console.log('Updated user profile.');
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    validateFields() {
        let name = this.state.name;
        let phoneNumber = this.state.phoneNumber;
        let birthday = this.state.birthday;
        let gender = this.state.gender;
        if (name == '' || phoneNumber == '' || birthday == '' || gender == '') {
            Alert.alert('Incomplete Form','Please fill out all fields');
            return false; 
        }
        if (phoneNumber.length != 10 || isNaN(phoneNumber)) {
            Alert.alert('Invalid Phone Number','Phone number must be 10 digits long (e.g. 012345789)');
            return false;
        }
        return true;
    }

    render() {
        return (

        <LinearGradient colors={['#F02535','#FFB339']} style={{flex:1}}>        
            <View style={styles.container}>
            <View style={styles.onboardContainer}>
                <Text style={styles.onboardText} >tell us about yourself</Text>
            </View>

            <View style={styles.formContainer}>
                
                <View style={styles.textInputContainer}>
        
                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="full name"
                    onChangeText={(text) => this.setState({ name: text })}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="phone number"
                    keyboardType='number-pad'
                    onChangeText={(text) => this.setState({ phoneNumber: text })}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="birthday"
                    onChangeText={(text) => this.setState({ birthday: text })}
                    />

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="gender"
                    onChangeText={(text) => this.setState({ gender: text })}
                    />

                </View>


                <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>
                    <TouchableOpacity style={styles.button}
                    onPress={() => {
                        if (this.validateFields()) {
                            this.addUserProfile();
                            this.props.navigation.navigate('OnboardCollege');
                        }
                    }}>
                            <Text style={styles.buttonText}>NEXT</Text>
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
onboardContainer: {
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