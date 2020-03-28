
import * as React from 'react';
import {View, Text, AsyncStorage} from 'react-native';

export default class HomeScreen extends React.Component{
    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>study</Text>
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