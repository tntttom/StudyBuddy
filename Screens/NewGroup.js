
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { addGroup } from '../datastructure/graph.js';

export default class NewGroup extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            groupName: '',
            groupCourse: '',
            groupTopic: '',
            groupLocation: '',
        }
    }

    addStudyGroup() {
        const groupID = addGroup({
          name: this.state.groupName,
          course: this.state.groupCourse,
          topic: this.state.groupTopic,
          location: this.state.groupLocation,
        })
        console.log('New study group created with groupID: ', groupID);
        Alert.alert('Action!', 'A new group was created!');
    }
    
    render() {
        return (

        <LinearGradient colors={['#FE41C6','#4839FF']} style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.registerContainer}>
                    <Text style={styles.registerText} >new group</Text>
                </View>

                <View style={styles.formContainer}>
                    
                    <View style={styles.textInputContainer}>
            
                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="group name"
                            onChangeText={text => this.setState({ groupName: text })}
                        />

                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="course"
                            onChangeText={text => this.setState({ groupCourse: text })}
                        />

                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="topic"
                            onChangeText={text => this.setState({ groupTopic: text })}
                        />
                        
                        <TextInput style={styles.textInputStyle}
                            placeholderTextColor = "white"
                            placeholder="location"
                            onChangeText={text => this.setState({ groupLocation: text })}
                        />

                    </View>


                    <View style={{flex: 0.2, flexDirection: 'column', justifyContent:'flex-end'}}>

                        <TouchableOpacity style={styles.button}
                        onPress={() => {
                            this.addStudyGroup();
                            this.props.navigation.navigate('Home');
                        }}>
                        
                            <Text style={styles.buttonText}>ADD GROUP</Text>
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