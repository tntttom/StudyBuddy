

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';

export default class LoginScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }
    
    render() {
        return (
            <LinearGradient colors={['#F43BD0','#F02323']} style={{flex:1}}>
                <View style={styles.container}>
                    <View style={styles.loginContainer}>
                        <Text style={styles.loginText} >login</Text>
                    </View>

                    <View style={styles.formContainer}>
                
                    <View style={styles.textInputContainer}>
        
                        <TextInput style={styles.textInputStyle}
                        placeholderTextColor = "white"
                        placeholder="email"
                        onChangeText={(text) => this.setState({ email: text })}
                        />

                        <TextInput style={styles.textInputStyle}
                        placeholderTextColor = "white"
                        placeholder="password"
                        secureTextEntry={true}
                        onChangeText={(text) => this.setState({ password: text })}
                        />

                    </View>


                    <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                        <TouchableOpacity style={styles.button}
                        onPress={() => 
                            auth()
                                .signInWithEmailAndPassword(this.state.email,this.state.password)
                                .then(() => {
                                    console.log('User account signed in!');
                                })
                                .catch(error => {
                                    if (error.code === 'auth/user-not-found') {
                                        Alert.alert('User Not Found','There is no account associated with this email address. Please register for an account.');
                                    }
                                    else if (error.code === 'auth/invalid-email') {
                                        Alert.alert('Invalid Email','That email address is invalid.');
                                    }
                                    else if (error.code === 'auth/wrong-password') {
                                        Alert.alert('Wrong Password','Please try again.');
                                    } 
                                    else if (error.code === 'auth/user-disabled') {
                                        Alert.alert('Account Disabled','This account has been disabled.');
                                    }
                                    else Alert.alert(error,error.message);

                                    console.log(error);
                                })
                            }>
                            <Text style={styles.buttonText}>GO!</Text>
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
loginContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    
},  

loginText: {
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
    color: 'white',
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