
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import navigationOptions from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


export default class WelcomeScreen extends React.Component{

    render() {
        return (

        <LinearGradient colors={['#F43BD0','#F02323']} style={{flex:1}}>            
            <View style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcomeText} >welcome</Text>
                </View>

                <View style={styles.buttonContainer}>

                    <View style={{flex: 1, flexDirection: 'column', justifyContent:'flex-end'}}>

                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('Register')}>
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

    welcomeContainer: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },  

    welcomeText: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 170,
        fontFamily: 'Montserrat-Medium',
        fontSize: 48,
        color: 'white',
    },

    buttonContainer: {
        flex: 0.5,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
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