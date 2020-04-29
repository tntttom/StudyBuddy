import * as React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, Button } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';

export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            groupID: props.route.params.groupID,
            group: props.route.params.group,
            members: props.route.params.members,
            chatBuddy: 0,
        }
    }

    listBuddies() {
        // const buddies = this.state.buddies;
        const buddies = [0, 1, 2, 3, 4, 5, 6];

        return buddies.map( (buddy, index) => {
            return(
                <View key={index} style={styles.profileCard}>
                    <TouchableOpacity 
                        style={{flex:1, justifyContent:'center'}}
                        onPress={() => this.setState({chatBuddy: buddy})}>
                        <Text style={{textAlign: 'center'}}>{`Buddy Picture ${buddy}`}</Text>
                    </TouchableOpacity>
                </View>
            );
        });
    }

    listMessages() {
        return (
            <View style={styles.messagesContainer}>

            </View>
        );
    }

    render() {
        return(
            <View style={styles.container}>
                <LinearGradient colors={['#FF7EF5', '#41E2FF']} style={styles.gradient}>
                <View style={styles.buddyContainer}>
                    
                        
                        <View style={{flexDirection:'row', justifyContent:'space-between', margin: 10}}>
                            <Text style={styles.headerText}>study buddies</Text>
                            <Button title='new buddy +'></Button>
                        </View>
                            
                        
                        <ScrollView
                            style={styles.scrollViewBuddyContainer}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            
                            {this.listBuddies()}
                             
                        </ScrollView>
                    
                </View>

                <View style={styles.chatContainer}>
                    <Text style={styles.headerText}>{`chatting with ${this.state.chatBuddy}`}</Text>
                
                    {this.listMessages()}

                    

                </View>  
                
                <View style={styles.inputContainer}>
                        
                            <TextInput style={styles.textInput}
                                textAlign='left'
                                placeholderTextColor = "black"
                                placeholder={`Send ${this.state.chatBuddy} a message...`}
                                onChangeText={(text) => this.setState({ email: text })}
                            />
                            <TouchableOpacity style={styles.sendButton}

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
        elevation: 10
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
        marginLeft: 20,
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