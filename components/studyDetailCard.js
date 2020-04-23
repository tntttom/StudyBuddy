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

const DetailCard = () => {
  const navigation = useNavigation();

  return (
    <LinearGradient
      style={styles.cardContainer}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#FF1C1C', '#FF19FF']}>
      <Text style={styles.cardText}>The Cell</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'blue',
    marginBottom: 15,
    marginTop: 15,
    height: 90,
    width: '90%',
    borderRadius: 18,
    alignItems: 'flex-start',
  },

  cardText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 38,
    marginTop: 21,
    marginLeft: 24,
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

export default DetailCard;
