
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import dbRefs from '../api/firebase-database';
import auth from '@react-native-firebase/auth';

import { addConnection, removeConnection, isUserInGroup, listGroupsOfUser, listUsersOfGroup } from '../datastructure/graph.js';

export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            group: props.route.params,
            inGroup: false,
            members: [],
        };
    }

    componentDidMount() {
        const groupID = this.state.group.groupID;
        this.getMembers(groupID);
    }

    componentDidUpdate() {
        const uid = auth().currentUser.uid;
        const groupID = this.state.group.groupID;
        isUserInGroup(uid, groupID).then(val => {
            this.setState({inGroup: val});
        })
    }

    componentWillUnmount() {
        const groupID = this.state.group.groupID;
        dbRefs.studyGroups.child(groupID + '/members').off();
    }

    getMembers(groupID) {
        listUsersOfGroup(groupID, snapshot => {
            var data = new Array();
            snapshot.forEach(member => {
                data.push(member);
            });
            
            console.log('data =', data);
            this.setState({members: data});
        });
    }

    listMembers() {
        console.log('this.state.members = ',this.state.members);
        return this.state.members.map(member => {
            return (
                // Only returning the uid of members right now
                // Will have to grab user info of that uid (like username) here
                <Text key={member}>{member}</Text>
            );
        })
    }

    // LOL how can I refactor this?
    joinLeaveButton() {
        const uid = auth().currentUser.uid;
        const groupID = this.state.group.groupID;
        
        if (this.state.inGroup) {
            return (
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        removeConnection(uid, groupID);
                        isUserInGroup(uid, groupID).then(val => {
                            this.setState({inGroup: val});
                        });
                    }}    
                >
                    <Text style={styles.leaveText}>LEAVE STUDY GROUP</Text>
                </TouchableOpacity>
            );
        }
        else {
            return (
                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        addConnection(uid, groupID);
                        isUserInGroup(uid, groupID).then(val => {
                            this.setState({inGroup: val});
                        });
                    }}    
                >
                    <Text style={styles.joinText}>JOIN STUDY GROUP</Text>
                </TouchableOpacity>
            );
        }
    }

    render() {
        const { route } = this.props;
        const group = route.params;

        return (
            <View style={styles.container}>
                <View style={styles.groupContainer}>
                    <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={styles.gradient}>
                        <Text style={styles.groupText}>{group.name}</Text>
                        <Text style={{marginTop: 10}}>{'Group ID: ' + group.groupID}</Text>
                    </LinearGradient>
                </View>

                <View style={styles.membersContainer}>
                    <Text style={styles.headerText}>{group.name.toLowerCase() + ' study buddies'}</Text>
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