import dbRefs from '../api/firebase-database';

// Get user node
// Use: retrieve user object using userID
export async function getUser(userID) {
  const val = await dbRefs.users.child(userID).once('value');
  if (val.exists()) {
    // User exists
    return val.val();
  }
  else {
    return null;
  }
}

// Add user node
// Use: user registers for an account
export function addUser(userID, userObject) {
  dbRefs.users.child(userID).set(userObject);
}

// Remove user node and remove all connections to this group node
// Use: a user deletes their account
export function removeUser(userID) {
  dbRefs.users.child(userID).once('value').then(snapshot => {
    // Check if user exists
    if (snapshot.exists()) {
      const user = snapshot.val();
      
      // Retrieve all groups the user is in and remove connections
      const groups = user.groups;
      for (var group in groups) {
        this.removeConnection(userID,group.groupID);
      }

      // Remove user node
      dbRefs.users.child(userID).remove();
    }
  })
}

// Get group node
// Use: retrieve group object using userID
export async function getGroup(groupID) {
  const val = await dbRefs.studyGroups.child(groupID).once('value');
  if (val.exists()) {
    // Group exists
    return val.val();
  }
  else {
    return null;
  }
}

// Get all group nodes
// Use: retrieve all group objects in database
export function getAllGroups(callback) {
  dbRefs.studyGroups.on('value', snapshot => {    
    let data = snapshot.val() ? snapshot.val() : {};
    let groups = {...data};

    callback(groups);
  })
}

// Add group node
// Use: user creates a new study group
export function addGroup(groupObject) {
  const ref = dbRefs.studyGroups.push(groupObject)
  return ref.key; // return generated groupUID
}

// Remove group node and remove all connections to this group node
// Use: a user of the group deletes the group
export function removeGroup(groupID) {
  dbRefs.studyGroups.child(groupID).once('value').then(snapshot => {
    // Check if group exists
    if (snapshot.exists()) {
      const group = snapshot.val();
      
      // Retrieve all members of the group and remove connections
      const users = group.members;
      for (var user in users) {
        this.removeConnection(user.uid,groupID);
      }

      // Remove user node
      dbRefs.users.child(groupID).remove();
    }
  })
}

// Add new buddy to group
// Use: user opts-in to find a study buddy match
export function addBuddy(userID, groupID) {
  getUser(userID).then(userObj => {
    dbRefs.studyGroups.child(groupID + '/newBuddies/' + userID).set(userObj.profile.schoolName);
  })
}

// Remove new buddy from group
// Use: users were matched and no longer are new buddies
export function removeBuddy(userID, groupID) {
  dbRefs.studyGroups.child(groupID + '/newBuddies/' + userID).remove()
  .then(() => {
    // Removal success!
    // console.log(`${userID} removed from ${groupID}`);
  })
}

// Find buddy match
// Use: match new buddies together based on certain filters
// Filter: must be of same school
export function matchBuddies(userID, groupID) {
  addBuddy(userID, groupID);

  dbRefs.studyGroups.child(groupID + '/newBuddies').once('value', snapshot => {

    console.log(snapshot);
    const userSchoolName = snapshot.val()[userID];
    const keys = Object.keys(snapshot.val());

    for (var key of keys) {
      let school = snapshot.val()[key];

      if (key === userID) {
        // Do nothing, can't match with oneself
      }
      else if (school === userSchoolName) {
        // Schools match! Make users buddies within that group
        dbRefs.users.child(`${userID}/buddies/${groupID}/${key}`).set(key);
        dbRefs.users.child(`${key}/buddies/${groupID}/${userID}`).set(userID);
        // Remove each user from the new buddies list in the group
        removeBuddy(userID,groupID);
        removeBuddy(key,groupID);
        break; // Do no more comparisons
      }
    }
  })
}

// Add bidirectional edge between group node and user node
// Use: user joins a study group
export function addConnection(userID, groupID) {
  dbRefs.studyGroups.child(groupID + '/members/' + userID).set(userID);
  dbRefs.users.child(userID + '/groups/' + groupID).set(groupID);
}

// Remove bidirectional edge between group node and user node
// Use: user leaves a study group
export function removeConnection(userID, groupID) {
  dbRefs.studyGroups.child(groupID + '/members/' + userID).remove();
  dbRefs.users.child(userID + '/groups/' + groupID).remove();
}

// Checks if a user is in a group node (returns a promise)
// Use: check if a user is already in the study group or not
export async function isUserInGroup(userID, groupID) {
  const val = await dbRefs.studyGroups.child(groupID + '/members/' + userID).once('value');
  if (val.exists()) {
    // User is in the group
    return true;
  }
  else {
    // User is not in the group
    return false;
  }
}

// List all the users in a group node
// Use: Retrieve all members of a study group
export function listUsersOfGroup(groupID, callback) {
  dbRefs.studyGroups.child(groupID + '/members').on('value', snapshot => {    
    let users = new Array();
    snapshot.forEach(val => {
      users.push(val.key);
    })

    callback(users);
  })
}

// List all the groups in a user node
// Use: Retrieve all study groups a member is in
export function listGroupsOfUser(userID, callback) {
  dbRefs.users.child(userID + '/groups').on('value', snapshot => {    
    let groups = new Array();
    snapshot.forEach(val => {
      groups.push(val.key);
    })

    callback(groups);
  })
}

// List all the buddies of a study group in a user node
// Use: Retrieve all a user's study buddies for a certain study group
export function listBuddiesOfGroup(userID, groupID, callback) {
  dbRefs.users.child(userID + '/buddies/' + groupID).on('value', snapshot => {    
    let groups = new Array();
    snapshot.forEach(val => {
      groups.push(val.key);
    })

    callback(groups);
  })
}