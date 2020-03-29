import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default class ProfileScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={{ flex:1,}}>
                    <View style={{justifyContent:'center', alignContent: 'center', width: Dimensions.get('screen').width, height: Dimensions.get('screen').height}}>
                            
                            <Text style={{textAlign:'center'}}>GRADIENT</Text>
                            
                       
                    </View>
                    </LinearGradient>

                    <View style={{justifyContent:'flex-end', flex: 0.2}}>
                        
                    </View>

                    <View style={{backgroundColor:'white', flex: 0.4}}>
                    <Text style={styles.nameText}>Tommy Nguyen</Text>
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
        flex: .19,
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
    }
    
})