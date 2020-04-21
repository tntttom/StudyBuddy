
import * as React from 'react';
import {View, Text} from 'react-native';

export default class StudyDetailsScreen extends React.Component{
    render() {
        const { route } = this.props;
        const group = route.params;

        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>
                    {'Group Name: ' + group.name}
                </Text>
                <Text>
                    {'Group ID: ' + group.groupID}
                 </Text>
            </View>
        );

    }
    
}