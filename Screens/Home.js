import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions, AsyncStorage} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component{
    render() {
        return (
            <View style={styles.container}>

                <ScrollView
                showsVerticalScrollIndicator={false}>
                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeaderText}> Card</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeaderText}> Card</Text>
                    </View>

                    <View style={styles.cardContainer}>
                        <Text style={styles.cardHeaderText}> Card</Text>
                    </View>

                </ScrollView>
                
            </View>
        );

    }


    // Save database graphs into async storage as 'graphs'
    saveData = async (graphs) => {
        try {
            await AsyncStorage.setItem('graphs', JSON.stringify(graphs));
        }

        catch(error) {
            // Do something on error
        }
    }
    // Read database graphs from async storage as 'graphs'
    readData = async () => {
        try {
            let graphsJSON = await AsyncStorage.getItem('graphs');
            let graphs = JSON.parse(graphsJSON);

            // Do something with graphs
        }

        catch(error) {
            // Do something on error
        }
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        backgroundColor: 'white'
        
    },

    cardContainer: {
        flex: 0.2,
        backgroundColor: 'blue',
        marginBottom: 15,
        marginTop: 15,
        height: 300,
        width: 300,
        borderRadius: 18,
        alignItems:'center',
    },

    cardHeaderText: {
        fontFamily: 'Montserrat-Medium',
        fontSize: 36,
        textAlign:'center',

    },




})
