import dbRefs from '../api/firebase-database';

// Add user node
// Use: user registers for an account
export function addUser(userObject) {

}

// Remove user node and remove all connections to this group node
// Use: a user deletes their account
export function removeUser(uid) {

}

// Add group node
// Use: user creates a new study group
export function addGroup(groupObject) {

}

// Remove group node and remove all connections to this group node
// Use: a user of the group (the maker?) deletes the group
export function removeGroup(groupID) {

}

// Add bidirectional edge between group node and user node
// Use: user joins a study group
export function addConnection(uid, groupID) {
    dbRefs.studyGroups.child(groupID + '/members/' + uid).set(uid);
    dbRefs.users.child(uid + '/groups/' + groupID).set(groupID);
}

// Remove bidirectional edge between group node and user node
// Use: user leaves a study group
export function removeConnection(uid, groupID) {
    dbRefs.studyGroups.child(groupID + '/members/' + uid).remove();
    dbRefs.users.child(uid + '/groups/' + groupID).remove();
}

// Checks if a user is in a group node (returns a promise)
// Use: check if a user is already in the study group or not
export async function isUserInGroup(uid, groupID) {
  const val = await dbRefs.studyGroups.child(groupID + '/members/' + uid).once('value');
  if (val.exists()) {
    console.log('The user is in this group already.');
    return true;
  }
  else {
    console.log('The user is NOT in this group.');
    return false;
  }
}

// List all the users in a group node
// Use: Retrieve all members of a study group
export function listUsersOfGroup(groupID, callback) {
  dbRefs.studyGroups.child(groupID + '/members').on('value', snapshot => {
    console.log('I listened to change!');
    
    let users = new Array();
    snapshot.forEach(val => {
      users.push(val.key);
    })

    callback(users);
  })
}

// List all the groups in a user node
// Use: Retrieve all study groups a member is in
export function listGroupsOfUser(uid) {

}