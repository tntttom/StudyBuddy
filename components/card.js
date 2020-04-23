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
import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {white} from 'color-name';
import {useNavigation} from '@react-navigation/native';

const HomeCard = ({
  studyGroup: {studyGroup: course, topic, groupName, location},
  id,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('StudyDetails', {
          groupID: id,
        });
      }}>
      <LinearGradient
        style={styles.cardContainer}
        colors={['#FF1C1C', '#FF19FF']}>
        <Text style={styles.cardHeaderText}>{course}</Text>
        <Text style={styles.cardSubText}>{topic}</Text>
        <Text style={styles.cardGroupName}>{groupName}</Text>
        <Text style={styles.cardLocationText}>{location}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.2,
    backgroundColor: 'blue',
    marginBottom: 15,
    marginTop: 15,
    height: 300,
    width: 312,
    borderRadius: 30,
    alignItems: 'center',
  },

  cardHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 21,
    color: 'white',
  },

  cardSubText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 11,
    color: 'white',
  },

  cardGroupName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 38,
    textAlign: 'center',
    marginTop: 28,
    color: 'white',
  },

  cardLocationText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 76,
    color: 'white',
  },

  cardShadow: {
    shadowColor: '#FF19FF',
    shadowOffset: {height: 2, width: 0},
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
});

export default HomeCard;
