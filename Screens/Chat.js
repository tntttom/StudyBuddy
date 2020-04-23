import * as React from 'react';
import { Text } from 'react-native';


export default class StudyDetailsScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            groupID: props.route.params.groupID,
            group: props.route.params.group,
            members: props.route.params.members,
        }
    }

    render() {
        return(
            <Text>Chat Room</Text>
        )
    }
}