import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button, TextInput, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';
import { getUser, listGroupsOfUser, getGroup } from '../datastructure/graph.js';
import dbRefs from '../api/firebase-database.js';

export default class ProfileScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            uid: props.route.params.uid,
            user: Object(),
            profile: Object(),
            groups: Array(),
            groupIDs: Array(),
        }
    }

    componentDidMount() {
        this.getGroups();

        getUser(this.state.uid).then(snapshot => {
            if (snapshot !== null) {
                this.setState({user: snapshot});
                this.setState({profile: snapshot.profile})
            }
        })
    }

    componentWillUnmount() {
        dbRefs.users.off();
    }

    getGroups() {
        const uid = this.state.uid;
        listGroupsOfUser(uid, snapshot => {
            if (snapshot !== []) {
                this.setState({groupIDs: snapshot});
                snapshot.forEach(group => {
                    getGroup(group).then(groupObj => {
                        this.setState({groups: this.state.groups.concat(groupObj)});
                    })
                });
            }
        });
    }

    listGroups() {
        const groups = this.state.groups;

        if (groups !== []) {
            return groups.map( (group, index) => {
                console.log(group);
                return(
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.navigate('StudyDetails', {
                                groupID: this.state.groupIDs[index],
                            });
                        }}>
                        <View style={styles.cardContainer}>
                            <Text style={styles.cardText}>{group.name}</Text>
                            <Text style={styles.cardSubText}>{group.course}</Text>
                            <Text style={styles.cardSubText}>{group.topic}</Text>
                        </View>
                    </TouchableOpacity>
                );
            });
        }
    }

    listBuddies() {
        // const buddies = this.state.buddies;
        const buddies = [0, 1, 2, 3];

        return buddies.map( (buddy, index) => {
            return(
                <View key={index} style={styles.profileCard}>
                    <Text>{`Buddy Picture ${buddy}`}</Text>
                </View>
            );
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={styles.gradient} >
                        <Text style={styles.nameText}>{this.state.profile.name}</Text>
                        <Text style={styles.usernameText}>{`@${this.state.user.displayName}`}</Text>
                        <Text style={styles.detailText}>
                            {`Class of ${this.state.profile.graduationYear} ${this.state.profile.major}` +
                            `student at ${this.state.profile.schoolName}.`}
                        </Text>
                    </LinearGradient>
                </View>

                <View style={styles.courseContainer}>
                    
                    
                    <Text style={styles.headerText}>study groups</Text>

                    <View style={styles.scrollViewCourseContainer}>
                        <ScrollView 
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {this.listGroups()}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.buddyContainer}>
                    <Text style={styles.headerText}>best study buddies</Text>

                    <View style={styles.scrollViewBuddyContainer}>

                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>

                            {this.listBuddies()}
                            
                        </ScrollView>
                       
                    </View>

                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() =>
                            this.props.navigation.navigate('Home')
                        }>
                        <Text style={styles.buttonText}>GO HOME</Text>
                    </TouchableOpacity>
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
        );

    }
    

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
        alignContent: 'center',
    },  

    profileContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: Dimensions.get('window').width,
    },  

    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    nameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
    },

    usernameText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'white',
        textAlign:'center',
        marginTop: 20,
    },

    detailText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        textAlign:'center',
        color: 'white',
        marginTop: 20,
    },

    courseContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
    },

    buddyContainer: {
        flex: 1,
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
        elevation: 5,
        justifyContent: 'space-around',
    },

    cardText: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        textAlign: 'center',
    },

    cardSubText: {
        color: 'black',
        fontFamily: 'Montserrat-Medium',
        fontSize: 12,
        textAlign: 'center',
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
        elevation: 5
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginBottom: 20,
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