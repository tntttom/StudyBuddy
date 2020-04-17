import database from '@react-native-firebase/database';

const dbRefs = {
    root: database(),
    users: database().ref('/users'),
    userProfiles: database().ref('/userProfiles'),
}

export default dbRefs;