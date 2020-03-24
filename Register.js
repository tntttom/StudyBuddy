
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class RegisterScreen extends React.Component{
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
                        placeholder="username"/>

                        <TextInput style={styles.textInputStyle}
                        placeholderTextColor = "white"
                        placeholder="email"/>

                        <TextInput style={styles.textInputStyle}
                        placeholderTextColor = "white"
                        placeholder="password"/>
                        
                        <TextInput style={styles.textInputStyle}
                        placeholderTextColor = "white"
                        placeholder="confirm password"/>

                    </View>


                    <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                    <TouchableOpacity style={styles.button}>
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
        alignItems: 'center',
        justifyContent: 'center',
    },  

    textInputContainer: {
        flex: 1,
        alignItems:'center',
        justifyContent:'space-evenly',  

    },

    textInputStyle: {
        width: 190,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'white'
    },

    button: {
        width: 350,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
    },

    buttonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'white',
    }
})