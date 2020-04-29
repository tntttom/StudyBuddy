import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Button, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import { listBuddiesOfGroup, getUser, addBuddy } from '../datastructure/graph';

import auth from '@react-native-firebase/auth';
import dbRefs from '../api/firebase-database';

export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userID: auth().currentUser.uid,
            groupID: props.route.params.groupID,
            group: props.route.params.group,
            members: props.route.params.members,
            buddies: [],
            chatBuddy: '',
            sentMessage: '',
            messages: [
                {fromBuddy: true, message: 'hello'},
                {fromBuddy: false, message: 'hey what is up?'},
                {fromBuddy: false, message: 'wyd?'},
                {fromBuddy: true, message: 'trying to study for finals'},
                {fromBuddy: true, message: 'hbu?'},
                {fromBuddy: true, message: 'procrastinating maybe? :P'},
                {fromBuddy: false, message: 'lmao how did you know?'},
                {fromBuddy: false, message: 'yeah I need some motivation to get me goin'},
                {fromBuddy: true, message: 'I can help!'},
                {fromBuddy: false, message: 'what are you studying rn?'},
                {fromBuddy: false, message: 'I need to study up on the formulas'},
                {fromBuddy: true, message: 'oh perfect, me too'},
                {fromBuddy: false, message: 'awesome'},
            ]
        }
    }

    componentDidMount() {
        this.getBuddies();
    }

    componentWillUnmount() {
        dbRefs.users.off();
    }

    getBuddies() {
        const groupID = this.state.groupID;
        const uid = this.state.userID;
        listBuddiesOfGroup(uid, groupID, snapshot => {
            this.setState({buddies: []});
            snapshot.forEach(buddy => {
                getUser(buddy).then(buddyObj => {
                    this.setState({buddies: this.state.buddies.concat(buddyObj)});
                })
            });
        });
    }

    listBuddies() {
        const buddies = this.state.buddies;

        return buddies.map( (buddy, index) => {
            return(
                <View key={index} style={styles.profileCard}>
                    <TouchableOpacity 
                        style={{flex:1, justifyContent:'center'}}
                        onPress={() => this.setState({chatBuddy: buddy.profile.name})}>
                        <Text style={{textAlign: 'center'}}>{buddy.profile.name}</Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    listMessages() {
        return this.state.messages.map( (msg, index) => {
            return(
                <View key={index} style={msg.fromBuddy ? styles.messageReceived : styles.messageSent}>
                    <Text style={styles.messageText}>{msg.message}</Text>
                </View>
            );
        })
        
    }

    findBuddy() {
        addBuddy(this.state.userID, this.state.groupID);
    }

    render() {
        return(
            <View style={styles.container}>
                <LinearGradient colors={['#F43BD0','#F02323']} style={styles.gradient}>
                <View style={styles.buddyContainer}>
                    
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between', margin: 10}}>
                            <Text style={styles.headerText}>{`${this.state.group.name} buddies`}</Text>
                            <Button 
                                title='new buddy +'
                                onPress={() => {
                                    Alert.alert('Finding a buddy!', `You're buddy will appear in the "study buddies" list soon!`)
                                    this.findBuddy()
                                }}
                            />
                        </View>
                            
                        
                        <ScrollView
                            style={styles.scrollViewBuddyContainer}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            
                            {this.listBuddies()}
                             
                        </ScrollView>
                    
                </View>

                <View style={styles.chatContainer}>
                    <Text style={styles.headerText}>{this.state.chatBuddy === '' ? `pick a buddy above!` : `chatting with ${this.state.chatBuddy}`}</Text>
                    
                    <ScrollView ref={scroll => { this.scrollView = scroll}}>
                        {this.listMessages()}
                    </ScrollView>
                    
                </View>  
                
                <View style={styles.inputContainer}>
                        
                            <TextInput style={styles.textInput}
                                textAlign='left'
                                placeholderTextColor = "black"
                                placeholder={`Send ${this.state.chatBuddy} a message...`}
                                ref={input => { this.textInput = input }}
                                onChangeText={(text) => this.setState({ sentMessage: text })}
                            />
                            <TouchableOpacity style={styles.sendButton}
                                onPress={() => {
                                    Alert.alert('Hooray!',`You're message to ${this.state.chatBuddy} has been sent!`);
                                    this.setState({ sentMessage: '' });
                                    this.textInput.clear();
                                }}
                            >
                                <Text>Send</Text>
                            </TouchableOpacity>
                    </View>              

                </LinearGradient>
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
        alignContent: 'center',
    },  

    gradient: {
        flex: 1,
    },

    buddyContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        width: Dimensions.get('window').width,
    },

    chatContainer: {
        flex: 3,
        backgroundColor: 'white',
    },

    messagesContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    messageSent: {
        alignSelf: 'flex-end',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 120/2,
        backgroundColor: '#F02323',
    },

    messageReceived: {
        alignSelf: 'flex-start',
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 120/2,
        backgroundColor: '#F43BD0',
    },

    messageText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 14,
        color: 'white',
        margin: 10,
    },

    inputContainer: {
        height: 50,
        flexDirection: 'row',
    },

    textInput: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'white',
        margin: 5, 
        borderRadius: 120/2,
    },

    sendButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1,
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 120/2
    },
    
    headerText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 24,
        color: 'black',
    },

    scrollViewBuddyContainer: {
        flex:1,
    },

    profileCard: {
        aspectRatio: 1,
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
    
})