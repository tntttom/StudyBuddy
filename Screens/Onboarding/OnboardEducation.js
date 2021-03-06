
import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default class OnboardEducationScreen extends React.Component{
    render() {
        return (

        <LinearGradient colors={['#FEB038','#FF39D1']} style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.onbordContainer}>
                    <Text style={styles.onboardText} >education</Text>
                </View>

                <View style={styles.formContainer}>
                
                <View style={{flex: 0.5, flexDirection: 'column', justifyContent:'center'}}>

                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('OnboardHighSchool')}>
                        <Text style={styles.buttonText}>HIGH SCHOOL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}
                    onPress={() => this.props.navigation.navigate('OnboardCollege')}>
                        <Text style={styles.buttonText}>COLLEGE/UNIVERSITY</Text>
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
    justifyContent: 'flex-start',
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