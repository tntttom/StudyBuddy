
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import dbRefs from '../api/firebase-database';
import auth from '@react-native-firebase/auth';

import { addConnection, removeConnection, isUserInGroup, listGroupsOfUser, listUsersOfGroup, getUser, getGroup } from '../datastructure/graph.js';

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

        this.getMembers(this.state.groupID); // Start listener for group members
        // Initialize whether user is part of group or not
        isUserInGroup(uid, this.state.groupID).then(val => {
            this.setState({inGroup: val});
        });
    }

    componentWillUnmount() {
        const groupID = this.state.groupID;
        dbRefs.studyGroups.child(groupID + '/members').off(); // Turn off listener
    }

    getMembers(groupID) {
        listUsersOfGroup(groupID, snapshot => {
            var data = new Array();
            snapshot.forEach(member => {
                data.push(member);
            });
            
            this.setState({members: data});
        });
    }

    listMembers() {
        return this.state.members.map(member => {
            return (
                // Only returning the uid of members right now
                // Will have to grab user info of that uid (like username) here
                <Text key={member}>{member}</Text>
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
                        <Text style={styles.groupText}>{group.groupName}</Text>
                        <Text style={{marginTop: 10}}>{'Group ID: ' + group.groupID}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.membersContainer}>
                    <Text style={styles.headerText}>{group.studyGroup + ' study buddies'}</Text>
                    {this.listMembers()}
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
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        
    },  

    groupContainer: {
        flex: 0.25,
        width: Dimensions.get('window').width,
    },

    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    groupText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 48,
        color: 'white',
    },

    membersContainer: {
        flex: 0.65,
        padding: 10,
    },

    headerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
    },

    buttonContainer: {
        flex: 0.10,
        justifyContent: 'center',
        alignContent: 'center',
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