import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DetailCard from '../components/studyDetailCard';

import dbRefs from '../api/firebase-database';
import auth from '@react-native-firebase/auth';

import {
  addConnection,
  removeConnection,
  isUserInGroup,
  listGroupsOfUser,
  listUsersOfGroup,
} from '../datastructure/graph.js';

export default class StudyDetailsScreen extends React.Component {
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
    });
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
    console.log('this.state.members = ', this.state.members);
    return this.state.members.map(member => {
      return (
        // Only returning the uid of members right now
        // Will have to grab user info of that uid (like username) here

        <Text key={member}>{member}</Text>
      );
    });
  }

  // LOL how can I refactor this?
  joinLeaveButton() {
    const uid = auth().currentUser.uid;
    const groupID = this.state.group.groupID;

    if (this.state.inGroup) {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            removeConnection(uid, groupID);
            isUserInGroup(uid, groupID).then(val => {
              this.setState({inGroup: val});
            });
          }}>
          <Text style={styles.leaveText}>LEAVE STUDY GROUP</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addConnection(uid, groupID);
            isUserInGroup(uid, groupID).then(val => {
              this.setState({inGroup: val});
            });
          }}>
          <Text style={styles.joinText}>JOIN STUDY GROUP</Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    const {route} = this.props;
    const group = route.params;

    return (
      <View style={styles.container}>
        <Text style={styles.groupText}>{group.name}</Text>
        <Text style={{marginTop: 10}}>{'Group ID: ' + group.groupID}</Text>
        <Text style={styles.headerText}>John's Group</Text>

        <Text style={styles.locationText}>Chapter 11</Text>

        <View style={styles.topicContainer}>
          <Text style={styles.subHeaderText}>topics</Text>

          <View style={styles.topicCardContainer}>
            <DetailCard />
            <DetailCard />
          </View>
        </View>

        <View style={styles.membersContainer}>
          <Text style={styles.subHeaderText}>study buddies</Text>
          <View style={{flex: 1, marginLeft: 20, flexDirection: 'row'}}>
            {this.listMembers()}
          </View>
        </View>

        <View style={styles.buttonContainer}>{this.joinLeaveButton()}</View>
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
  groupText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 48,
    color: 'white',
  },

  membersContainer: {
    flex: 0.2,
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    marginTop: 64,
  },

  topicContainer: {
    flex: 0.4,
    justifyContent: 'flex-start',
    width: Dimensions.get('window').width,
    marginTop: 30,
  },

  topicCardContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 22,
  },

  headerText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    color: 'black',
  },

  locationText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 17,
    marginTop: 5,
  },

  buttonContainer: {
    flex: 0.1,
    justifyContent: 'center',
    alignContent: 'center',
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
  },

  subHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    color: 'black',
    marginLeft: 20,
  },
});
