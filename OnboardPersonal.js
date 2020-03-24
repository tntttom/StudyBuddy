
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class OnboardPersonalScreen extends React.Component{
    render() {
        return (

        <LinearGradient colors={['#F02535','#FFB339']} style={{flex:1}}>        
            <View style={styles.container}>
            <View style={styles.onbordContainer}>
                <Text style={styles.onboardText} >tell us about yourself</Text>
            </View>

            <View style={styles.formContainer}>
                
                <View style={styles.textInputContainer}>
        
                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="name"/>

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="phone number"/>

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="birthday"/>

                    <TextInput style={styles.textInputStyle}
                    placeholderTextColor = "white"
                    placeholder="gender"/>

                </View>


                <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                <TouchableOpacity style={styles.button}>
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
onbordContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red',
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
    color:'white',
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