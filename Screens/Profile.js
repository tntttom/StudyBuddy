import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

import AsyncStorage from '@react-native-community/async-storage';

export default class ProfileScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={{ flex:1,}}>
                        <View style={{justifyContent:'center', alignContent: 'center', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}>
                                
                            {/* <Text style={{textAlign:'center'}}>GRADIENT</Text> */}
                        
                        </View>
                    </LinearGradient>

                    <View style={{justifyContent:'flex-end', flex: 0.2}}>
                        
                    </View>

                    <View style={{backgroundColor:'white', flex: 0.4}}>
                    <Text style={styles.nameText}>
                        {'Tommy Nguyen'}
                    </Text>
                    <Text style={styles.detailText}>4th year Software Engineering student at Loyola University Chicago</Text>
                    </View>

                </View>


                <View style={styles.courseContainer}>
                    <Text style={styles.headerText}>courses</Text>

                    <View style={styles.scrollViewCourseContainer}>
                        <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                            <View style={styles.cardContainer}>
                                <Text style={styles.cardText}>Biology</Text>
                            </View>

                            <View style={styles.cardContainer}>
                                <Text style={styles.cardText}>Chemistry</Text>
                            </View>

                            <View style={styles.cardContainer}>
                                <Text style={styles.cardText}>Calculus</Text>
                            </View>

                            <View style={styles.cardContainer}>
                                <Text style={styles.cardText}>Biochem</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.buddyContainer}>
                    <Text style={styles.headerText}>best study buddies</Text>

                    <View style={styles.scrollViewBuddyContainer}>
                        <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}>
                            <View style={styles.profileCard}>
                                <Text>Picture</Text>
                            </View>

                            <View style={styles.profileCard}>
                                <Text>Picture</Text>
                            </View>

                            <View style={styles.profileCard}>
                                <Text>Picture</Text>
                            </View>

                            <View style={styles.profileCard}>
                                <Text>Picture</Text>
                            </View>
                            
                        </ScrollView>
                        <View>
                            <Button
                                title='Go to Home (Placeholder Navigation)'
                                onPress={() =>
                                    this.props.navigation.navigate('Home')
                                }
                            />
                        </View>


                    </View>

                    <View style={{flex:0.2}}>
                        <Button
                            title='Go to Home'
                            onPress={() =>
                                this.props.navigation.navigate('Home')
                            }
                        />
                        <TouchableOpacity style={styles.button}
                            onPress={() =>
                                auth()
                                    .signOut()
                                    .then(() => console.log('User signed out!'))
                            }>
                            <Text style={styles.buttonText}>LOGOUT</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        );

    }
    

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        
    },  

    gradient: {
        width: 120,
    },

    profileContainer: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignContent:'center',
        width: Dimensions.get('window').width,
    },  
    
    nameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },

    detailText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        textAlign:'center',
        color: '#A29F9F',
        marginTop: 20,
    },

    courseContainer: {
        
        flex: 0.15,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
    },

    buddyContainer: {
        flex: 0.20,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        marginTop: 64,

    },
    
    headerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
        marginLeft: 20,
    },

    scrollViewCourseContainer: {
        height: 130,
        marginTop: 6,
    },
    scrollViewBuddyContainer: {
        marginTop: 6,
        height: 130,
    },

    cardContainer:{
        backgroundColor:'white',
        height: 120, 
        width: 120, 
        marginLeft: 10, 
        marginRight: 10,
        alignItems:'center',
        borderRadius: 18,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 4},

    },

    cardText: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop:20
    },

    profileCard: {
        width: 120, 
        height: 120, 
        borderRadius: 120/2, 
        justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor:'white',
        marginLeft: 10,
        marginRight: 10,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 4},
        marginTop: 6,
    },

    buttonContainer: {
        flex: 0.15,
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginBottom: 20
    },

    button: {
        width: 350,
        height: 40,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 20,
        margin: 10,
    },

    buttonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'black',
    }
    
})