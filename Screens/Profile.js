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
                    <View style={{justifyContent:'center', alignContent: 'center', width: Dimensions.get('screen').width, backgroundColor:'yellow'}}>
                            
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
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.buddyContainer}>
                    <Text style={styles.headerText}>best study buddies</Text>

                    <View style={styles.scrollViewBuddyContainer}>
                        <ScrollView>
                            
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
        flex: 0.15,
        backgroundColor:'blue',
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
        marginTop: 46,
    },
    
    headerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
        marginLeft: 20,
    },

    scrollViewCourseContainer: {
        
        marginTop: 6,
    },

    cardContainer:{
        backgroundColor:'black',
        height: 120, 
        width: 120, 
        marginLeft: 20, 
        alignItems:'center',
        borderRadius: 18

    },

    cardText: {
        color: 'white',
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        marginTop:20
    },
    
})