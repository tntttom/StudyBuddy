

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';

export default class LoginScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Text style={styles.loginText} >login</Text>
            </View>

            <View style={styles.formContainer}>
                
                <View style={styles.textInputContainer}>
        
                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="username"/>

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="password"/>

                </View>


                <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end', backgroundColor: 'yellow'}}>

                <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>GO!</Text>
                </TouchableOpacity>
                </View>
                
                

            </View>

            

        </View>
       
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
    backgroundColor: 'red',
},  

loginText: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    fontFamily: 'Montserrat',
    fontSize: 48,
    color: 'white',
},

formContainer: {
    flex: 0.5,
    flexDirection:'column',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
},  

textInputContainer: {
    flex: 1,
    alignItems:'center',
    justifyContent:'space-evenly',
    backgroundColor: 'orange', 

},

textInputStyle: {
    width: 190,
    textAlign: 'center',
    fontFamily: 'Montserrat',
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
    fontFamily: 'Montserrat',
    fontSize: 18,
    color: 'white',
}
})