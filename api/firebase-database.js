import database from '@react-native-firebase/database';

const dbRefs = {
    root: database(),
    users: database().ref('/users'),
    userProfiles: database().ref('/userProfiles'),
    studyGroups: database().ref('/studyGroups'),
}

export default dbRefs;