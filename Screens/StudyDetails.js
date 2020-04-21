
import * as React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import dbRefs from '../api/firebase-database';
import auth from '@react-native-firebase/auth';

export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            group: null,
            members: [],
        };
    }    


    componentDidMount() {
        const { route } = this.props;
        this.setState({group: route.params});
        const id = route.params.groupID;

        dbRefs.studyGroups.child(id + '/members').on('value', querySnapShot => {
          let data = querySnapShot.val() ? querySnapShot.val() : {};
          let members = {...data};
          this.setState({
            members: members,
          });
        });
    }

    // Needs some work still
    listMembers() {
        const memberKeys = Object.keys(this.state.members);
        return (
            memberKeys.map(key => {
                console.log(key);
                return (
                    // Only returning the uid of members right now
                    // Will have to grab user info of that uid (like username) here
                    <Text>{key}</Text>
                )
            })
        );
    }

    // Need to adjust this to check if the user is already part of the study group or not
    // Then adjust button function and look
    onPress() {
        const uid = auth().currentUser.uid;
        const groupID = this.state.group.groupID;
        
        // Add bidirection edge between group node and user node
        dbRefs.studyGroups.child(groupID + '/members/' + uid).set(uid);
        dbRefs.users.child(uid + '/groups/' + groupID).set(groupID); 
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
                    <TouchableOpacity style={styles.button}
                        onPress={() => this.onPress()}    
                    >
                        <Text style={styles.buttonText}>JOIN STUDY GROUP</Text>
                    </TouchableOpacity>
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

    buttonText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 18,
        color: 'black',
    }
    
})