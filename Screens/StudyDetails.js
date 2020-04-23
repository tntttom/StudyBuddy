
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import dbRefs from '../api/firebase-database';
import auth from '@react-native-firebase/auth';

import { addConnection, removeConnection, isUserInGroup, listUsersOfGroup, getGroup, getUser } from '../datastructure/graph.js';
import { ScrollView } from 'react-native-gesture-handler';

export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            groupID: props.route.params.groupID,
            group: Object(),
            inGroup: false,
            members: [],
        };
        
    }

    componentDidMount() {
        getGroup(this.state.groupID).then(snapshot => {
            if (snapshot !== null) {
                this.setState({group: snapshot});
            }
        })

        const uid = auth().currentUser.uid;
        this.setState({uid: uid});

        this.getMembers(); // Start listener for group members

        // Initialize whether user is part of group or not
        isUserInGroup(uid, this.state.groupID).then(val => {
            this.setState({inGroup: val});
        });
    }

    componentWillUnmount() {
        const groupID = this.state.groupID;
        dbRefs.studyGroups.child(groupID + '/members').off(); // Turn off listener
    }

    getMembers() {
        const groupID = this.state.groupID;
        listUsersOfGroup(groupID, snapshot => {
            this.setState({members: []});
            snapshot.forEach(member => {
                getUser(member).then(memberObj => {
                    this.setState({members: this.state.members.concat(memberObj)});
                })
            });
        });
    }

    listMembers() {
        return this.state.members.map(member => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Profile', {
                            uid: member.uid,
                        });
                    }}>
                    <View style={styles.memberCard}>
                        <Text key={member.uid}>{member.profile.name}</Text>
                    </View>
                </TouchableOpacity>
            );
        })
    }

    joinLeaveButton() {
        const uid = auth().currentUser.uid;
        const groupID = this.state.groupID;
        let text, style, onPress;

        if (this.state.inGroup) {
            text = 'LEAVE STUDY GROUP';
            style = styles.leaveText;
            onPress = () => {
                removeConnection(uid, groupID);
                this.setState({inGroup: false});
            };
        }
        else {
            text = 'JOIN STUDY GROUP';
            style = styles.joinText;
            onPress = () => {
                addConnection(uid, groupID);
                this.setState({inGroup: true});
            };
        }

        return (
            <TouchableOpacity style={styles.button}
                onPress={() => onPress()}    
            >
                <Text style={style}>{text}</Text>
            </TouchableOpacity>
        );
    }

    render() {
        const group = this.state.group;
        return (
            <View style={styles.container}>
                <View style={styles.groupContainer}>
                    <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={styles.gradient}>
                        <Text style={styles.groupText}>{group.topic}</Text>
                        <Text style={styles.subText}>{group.course + ' - ' + group.location}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.membersContainer}>
                    <Text style={styles.headerText}>{group.name + ' study buddies'}</Text>
                    <ScrollView style={{marginVertical: 10}}>
                        {this.listMembers()}
                    </ScrollView>
                </View>
                
                <View style={styles.buttonContainer}>
                    {this.joinLeaveButton()}
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

    groupContainer: {
        flex: 0.25,
        width: Dimensions.get('window').width,
        alignItems: 'stretch'
    },

    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    groupText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 36,
        color: 'white',
        textAlign: 'center',
    },

    subText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'white',
        textAlign:'center',
        marginTop: 20,
    },

    membersContainer: {
        flex: 0.65,
        alignItems: 'stretch',
    },

    headerText: {
        marginVertical: 10,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
    },

    memberCard: {
        marginHorizontal: 20,
        marginVertical: 5,
        height: 50, 
        borderRadius: 10, 
        justifyContent: 'center', 
        alignItems: 'center',  
        backgroundColor:'white',
        shadowOpacity: 0.1,
        shadowOffset: {width: 1, height: 4},
        elevation: 3,
    },

    buttonContainer: {
        flex: 0.10,
        justifyContent: 'center',
        alignContent: 'stretch',
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

    joinText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'black',
    }, 

    leaveText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'red',
    }
    
})