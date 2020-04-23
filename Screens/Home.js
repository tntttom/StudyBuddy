import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Button,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import HomeCard from '../components/card';

import AsyncStorage from '@react-native-community/async-storage';

import dbRefs from '../api/firebase-database';

import { addGroup, getAllGroups } from '../datastructure/graph.js';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      studyGroups: [],
      groupCourse: '',
      groupTopic: '',
      groupName: '',
      groupLocation: '',
    };
  }

  static navigationOptions = ({navigation}) => ({
    title: 'study',
    headerTitleStyle: {fontFamily: 'Montserrat-Medium', fontSize: 32},
    headerRight: () => (
      <Button
        onPress={() => alert('This is a button')}
        title="+"
        color="black"
      />
    ),
    headerLeft: () => (
      <Button
        onPress={() => navigation.navigate('Profile')}
        title="Profile"
        color="black"
      />
    ),
  });

  componentDidMount() {
    getAllGroups(groups => {
      this.setState({
        studyGroups: groups
      });
    });
  }

  componentWillUnmount() {
    dbRefs.studyGroups.off();
  }

  addStudyGroup() {
    const groupID = addGroup({
      studyGroup: this.state.groupCourse,
      topic: 'Chapter 10',
      groupName: 'Johns Group',
      location: 'LSB 142',
    })

    Alert.alert('Action!', 'A new group was created!');
    this.setState({
      groupID: groupID,
      groupCourse: '',
    });
  }

  render() {
    let groupKeys = Object.keys(this.state.studyGroups);

    console.log(this.state.studyGroups);

    return (
      <View style={styles.container}>
        <View>
          <Button
            title="Go to Profile (Placeholder navigation)"
            onPress={() => this.props.navigation.navigate('Profile')}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <TextInput
            placeholder="Create A Group!"
            value={this.state.groupCourse}
            style={styles.textInput}
            onChangeText={e => {
              this.setState({
                groupCourse: e,
              });
            }}
          />

          <Button
            title="Add new group"
            onPress={this.addStudyGroup.bind(this)}
            color="blue"
          />

          {groupKeys.length > 0 ? (
            groupKeys.map(key => (
              <HomeCard
                key={key}
                id={key}
                studyGroup={this.state.studyGroups[key]}
              />
            ))
          ) : (
            <Text>No Groups</Text>
          )}
        </ScrollView>
      </View>
    );
  }

  // // Save database graphs into async storage as 'graphs'
  // saveData = async graphs => {
  //   try {
  //     await AsyncStorage.setItem('graphs', JSON.stringify(graphs));
  //   } catch (error) {
  //     // Do something on error
  //   }
  // };
  // // Read database graphs from async storage as 'graphs'
  // readData = async () => {
  //   try {
  //     let graphsJSON = await AsyncStorage.getItem('graphs');
  //     let graphs = JSON.parse(graphsJSON);

  //     // Do something with graphs
  //   } catch (error) {
  //     // Do something on error
  //   }
  // };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },

  cardContainer: {
    flex: 0.2,
    backgroundColor: 'blue',
    marginBottom: 15,
    marginTop: 15,
    height: 300,
    width: 300,
    borderRadius: 18,
    alignItems: 'center',
  },

  cardHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    textAlign: 'center',
  },
});
