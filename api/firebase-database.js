import database from '@react-native-firebase/database';

const dbRefs = {
    root: database(),
    users: database().ref('/users'),
    studyGroups: database().ref('/studyGroups'),
}

export default dbRefs;