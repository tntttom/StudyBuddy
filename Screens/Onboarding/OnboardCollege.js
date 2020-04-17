

import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import auth from '@react-native-firebase/auth';
import dbRefs from '../../api/firebase-database';

export default class OnboardCollegeScreen extends React.Component{
    
    constructor(props) {
        super(props)
        this.state = {
            schoolName: 'f',
            major: 'f',
            graduationYear: 'f',
            location: 'f',
        }
    } 

    componentDidMount() {
        const { params } = this.props.route;

        this.state = {
            name: params.name,
            phoneNumber: params.phoneNumber,
            birthday: params.birthday,
            gender: params.gender,
            schoolName: this.state.schoolName,
            major: this.state.major,
            graduationYear: this.state.graduationYear,
            location: this.state.location,
        };
    }
    
    addUser() {
        // Implement once react-native-firebase/database is added
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
                    console.log(auth().currentUser.uid);
                    dbRefs.users.child(auth().currentUser.uid).child('isNewUser').set(false)
                    .then(() => {
                        console.log('Completed registration.');
                        this.props.navigation.navigate('Profile');
                    })
                    .catch((error) => {
                        console.log(error);
                    })
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