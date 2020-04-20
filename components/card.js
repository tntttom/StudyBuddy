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

const HomeCard = ({studyGroup: {studyGroup: name}, id}) => {
  return (
    <TouchableOpacity>
      <LinearGradient
        style={styles.cardContainer}
        colors={['#5046FE', '#9C6ADC', '#F773FC']}>
        <Text style={styles.cardHeaderText}>{name}</Text>
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
    width: 300,
    borderRadius: 30,
    alignItems: 'center',
  },

  cardHeaderText: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 36,
    textAlign: 'center',
    marginTop: 40,
    color: 'white',
  },
});

export default HomeCard;
