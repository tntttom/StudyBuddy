
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

import dbRefs from '../api/firebase-database.js';

export default class RegisterScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }
    
    render() {
        return (

        <LinearGradient colors={['#F43BD0','#F02323']} style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText} >register</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    <View style={styles.textInputContainer}>
            
                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="username"
                            onChangeText={text => this.setState({ username: text })}
                        />

                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="email"
                            onChangeText={text => this.setState({ email: text })}
                        />

                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="password"
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        
                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="confirm password"
                            secureTextEntry={true}
                            onChangeText={text => this.setState({ confirmPassword: text })}
                        />

                    </View>


                    <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                        <TouchableOpacity style={styles.button}
                        onPress={() => {
                            
                            if (this.state.password != this.state.confirmPassword) {
                                Alert.alert('Passwords do no match')
                            }
                            else {
                                auth()
                                    .createUserWithEmailAndPassword(this.state.email, this.state.password)
                                    .then((userCredential) => {
                                        dbRefs.users.child(userCredential.user.uid).set({
                                            displayName: this.state.username,
                                            email: userCredential.user.email,
                                            uid: userCredential.user.uid,
                                            isNewUser: true
                                        })
                                        .then(() => {
                                            console.log('User added to firebase');
                                        })
                                        .catch(error => {
                                            console.log('Error adding user to firebase');
                                        })
                                        
                                        console.log('User account created & signed in!');
                                    })
                                    .catch(error => {
                                        if (error.code === 'auth/email-already-in-use') {
                                            Alert.alert('Existing Account','An account is already associated with this email address.');
                                        }
                                        else if (error.code === 'auth/invalid-email') {
                                            Alert.alert('Invalid Email','That email address is invalid.');
                                        }
                                        else if (error.code === 'auth/weak-password') {
                                            Alert.alert('Weak Password','Password must be at least 6 characters long.')
                                        }              
                                        else Alert.alert(error,error.message);
                                                                  
                                        console.log(error);
                                });
                            }
                        }}>
                        
                                <Text style={styles.buttonText}>REGISTER</Text>
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

    registerContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },  

    registerText: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 170,
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
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
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