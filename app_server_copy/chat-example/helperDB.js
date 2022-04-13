const MongoClient = require('mongodb').MongoClient;

module.exports = function() {
  
  // Takes in username and returns full user obj as promise.
  // USAGE: getUser('<username>')
  // Returns user object
  getUser = async function (username) {
    const client = new MongoClient(
      'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
    try {
      await client.connect();
      const database = client.db("513");
      const coll = database.collection("users");
      return await coll.findOne({
        'username': username
      });
    } finally {
      await client.close();
    }
  }

<<<<<<< HEAD

  // Takes in username, creates new user
  // throws error if username already exists
  //USAGE: addUser('<username>');
  addUser = async function (username) {
    const client = new MongoClient(
      'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
    try {
      await client.connect();
      const database = client.db("513");
      const usersCollection = database.collection("users");
      const exists = await usersCollection.find({
        'username': username
      }).hasNext();

      if (exists)
        throw '\nUSERNAME TAKEN\n';
      else {
        var index = await usersCollection.count();
        await usersCollection.insertOne({
          "id": index,
          "username": username,
          "likedActivities": [],
          "dislikedActivities": []
        })
=======
async function getActivities() {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  try {
    await client.connect();
    const database = client.db("513");
    const activitiesCollection = database.collection("activities");
    return await activitiesCollection.find().toArray();
  } finally {
    await client.close();
  }
}

// Takes in username and returns activities liked and disliked
// USAGE: getAllActivities('<username>')
// returns array of activities
async function getAllActivities(username) {

  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  try {
    await client.connect();
    const database = client.db("513");
    const usersCollection = database.collection("users");
    const userInfo = await usersCollection.findOne({
      'username': username
    });
    return await usersCollection.aggregate([{
      '$match': {
        'username': username
>>>>>>> backend-fixes
      }
    } catch (err) {
      console.log(err);
      return false

    } finally {
      await client.close();
    }
  }

  // Takes in username and returns activities liked and disliked
  // USAGE: getAllActivities('<username>')
  // returns array of activities
  getAllActivities = async function (username) {

    const client = new MongoClient(
      'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
    try {
      await client.connect();
      const database = client.db("513");
      const usersCollection = database.collection("users");
      const userInfo = await usersCollection.findOne({
        'username': username
      });
      return await usersCollection.aggregate([{
        '$match': {
          'username': 'Tarnished'
        }
      }, {
        '$lookup': {
          'from': 'activities',
          'localField': 'activities.likedActivities',
          'foreignField': 'id',
          'as': 'likedActivityArray'
        }
      }, {
        '$lookup': {
          'from': 'activities',
          'localField': 'activities.dislikedActivities',
          'foreignField': 'id',
          'as': 'dislikedActivityArray'
        }
      }, {
        '$unset': [
          '_id', 'id', 'username', 'activities', 'friends'
        ]
      }, ]).toArray();


    } finally {
      await client.close();
    }
  }



}

// Takes in username, activityID and activityEvaluation and sets the user information in the DB accordingly
// Function covers case where activityID already exists.
// USAGE: setActivityEval('string <username> ', <activityID>, bool<activityEval>);
// Returns userobj
async function setUserActivityEval(username, activityID, activityEval) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const usersCollection = database.collection("users");
    const userInfo = await usersCollection.findOne({
      'username': username
    });

    for (element in userInfo.activities.likedActivities) {
      if (userInfo.activities.likedActivities[element] == activityID) {
        await usersCollection.updateOne({
          'username': username
        }, {
          $pull: {
            'activities.likedActivities': userInfo.activities.likedActivities[element]
          }
        });
      }
    };
    for (element in userInfo.activities.dislikedActivities) {
      if (userInfo.activities.dislikedActivities[element] == activityID) {
        await usersCollection.updateOne({
          'username': username
        }, {
          $pull: {
            'activities.dislikedActivities': userInfo.activities.dislikedActivities[element]
          }
        });
      }
    };
    if (activityEval) {
      await usersCollection.updateOne({
        'username': username
      }, {
        $push: {
          'activities.likedActivities': activityID
        }
      });
    } else if (!activityEval) {
      await usersCollection.updateOne({
        'username': username
      }, {
        $push: {
          'activities.dislikedActivities': activityID
        }
      });
    }
    return await usersCollection.findOne({
      'username': username
    })
  } finally {
    await client.close();
  }
}

// Takes in username and friendUsername and adds to list of friends for that user
// also adds username to friends list of friendUsername
// Creates a new chat document between the 2 users
// TO USE: addToFriendsList('<username>', '<username of friend>')
// Returns updateOne return Object if successful, otherwise returns false
async function addToFriendsList(username, friendUsername) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const usersCollection = database.collection("users");
    const chatCollection = database.collection("chats");
    if (await usersCollection.findOne({
        $and: [{
          username: username
        }, {
          'friends.friendsList': {
            $nin: [friendUsername]
          }
        }]
      })) {
      newChatID = await chatCollection.count();
      await chatCollection.insertOne({
        'id': newChatID,
        'user1': username,
        'user2': friendUsername,
        'chat': [{
          'date': new Date(),
          'sentBy': "",
          'message': ""
        }]
      });
      return (await usersCollection.updateOne({
        username: username
      }, {
        $push: {
          'friends.friendsList': friendUsername
        }

      }) && await usersCollection.updateOne({
        username: friendUsername
      }, {
        $push: {
          'friends.friendsList': username
        }
      }))

    } else {
      throw "FRIEND ALREADY EXISTS"
    }
  } catch (err) {
    console.log(err);
    return false
  } finally {
    await client.close();
  }
}

// Takes in 2 usernames and gets the chat between the two usernames
// TO USE: getChat('<username>', '<username of friend>')
// Returns array of chat objects
async function getChat(username, friendUsername) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const chatCollection = database.collection("chats");
    const chatObj = await chatCollection.findOne({
      $or: [{
          $and: [{
            'user1': username
          }, {
            'user2': friendUsername
          }]
        },
        {
          $and: [{
            'user1': friendUsername
          }, {
            'user2': username
          }]
        }
      ]
    });
    return chatObj.chat;
  } finally {
    await client.close();
  }
}

// Takes 2 usernames, one who sent the request and one who the request was sent
// and adds requester to friendRequests[]
// TO USE: sendFriendRequest('<username of requester>', '<username of receiver>')
// Returns findOneAndUpdate return Object with relevant info
async function sendFriendRequest(fromUser, toUser) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const userCollection = database.collection("users");
    return await userCollection.findOneAndUpdate({
      $and: [{
        'username': toUser
      }, {
        'friends.friendRequests': {
          $nin: [
            fromUser
          ]
        }
      }]
    }, {
      $push: {
        'friends.friendRequests': fromUser
      }
    })

  } finally {
    await client.close();
  }
}

// Takes 2 usernames, the user who is accepting the request and username to be accepted
// and removes receiver to friendRequests[]
// TO USE: acceptFriendRequest('<username>', '<username to accept as friend>')
// Returns findOneAndUpdate return Object with relevant info of addtofriendslist
async function acceptFriendRequest(username, userToAccept) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const userCollection = database.collection("users");
    await userCollection.findOneAndUpdate({
      $and: [{
        'username': username
      }, {
        'friends.friendRequests': {
          $in: [
            userToAccept
          ]
        }
      }]
    }, {
      $pull: {
        'friends.friendRequests': userToAccept
      }
    });
    return await addToFriendsList(username, userToAccept);
  } finally {
    await client.close();
  }
}

// Takes 2 usernames and a message. Stores message in the chats collection
// SHOULD ONLY BE USED BETWEEN FRIENDS
// TO USE: sendChat('<username of sender>', '<username of receiver>', '<message>')
// returns object containing assertion of success
async function sendChat(sentBy, sentTo, message) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const chatCollection = database.collection("chats");
    return await chatCollection.findOneAndUpdate({
      $or: [{
          $and: [{
            'user1': sentBy
          }, {
            'user2': sentTo
          }]
        },
        {
          $and: [{
            'user1': sentTo
          }, {
            'user2': sentBy
          }]
        }
      ]

    }, {
      $push: {
        chat: {
          $each: [{
            date: new Date(),
            sentBy: sentBy,
            message: message
          }],
          $sort: {
            date: -1
          }
        }
      }
    });
  } finally {
    await client.close();
  }
}



//////////////////////////////////////////////////////////////////////////
///////////////////////////// EXAMPLE CODE ///////////////////////////////
//////////////////////////////////////////////////////////////////////////

//Shows all collections as an array from the DB in the console
async function getDB() {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const userCollection = database.collection("users");
    const chatCollection = database.collection("chats");
    const activityCollection = database.collection("activities")

    const users = await userCollection.find().toArray();
    const chats = await chatCollection.find().toArray();
    //omits img info as it's too long
    const activities = await activityCollection.aggregate([{
      '$unset': 'img'
    }], ).toArray();
    console.log(users, chats, activities);
  } finally {
    await client.close();
  }
}

//example async func that displays user info based on username
async function runGetUser(username) {
  const result = await getUser(username)
  console.log("\ngetUser...");
  console.log(result);
}

//example async func that displays activity id info based on username
async function runGetAllActivities(username) {
  const result = await getAllActivities(username)
  console.log("\ngetAllActivities...");
  console.log(result[0]);
}

//example call that updates users activity preference in the db
async function runSetActivity(username, activityID, activityEval) {
  const result = await setUserActivityEval(username, activityID, activityEval)
  console.log("\nsetUserActivityEval...");
  console.log(result.activities);
}

//example call that adds a new user into the db
async function runAddUser(username) {
  const result = await addUser(username)
  console.log("\naddUser...");
  console.log(result);

}

//example call that adds a friend to a users addToFriendsList
async function runAddFriend(username, friendUsername) {
  const result = await addToFriendsList(username, friendUsername);
  console.log("\naddFriend...");
  console.log(result);
}

//example call that gets chat from 2 users
async function runGetChat(username, friendUsername) {
  const result = await getChat(username, friendUsername);
  console.log("\ngetChat...");
  console.log(result);
}

//example call that sends a friend request
async function runSendFriendRequest(fromUser, toUser) {
  const result = await sendFriendRequest(fromUser, toUser);
  console.log("\nsendFriendRequest...");
  console.log(result);
}

//example call that accepts friend request
async function runAcceptFriendRequest(username, userToAccept) {
  const result = await acceptFriendRequest(username, userToAccept);
  console.log("\acceptFriendRequest...");
  console.log(result);
}

//example call that sends a message to a friends
async function runSendChat(sentBy, sentTo, message) {
  const result = await sendChat(sentBy, sentTo, message);
  console.log("\sendChat...");
  console.log(result);
}
async function runGetActivities() {
  const result = await getActivities();
  console.log(result);

}
//////////////////////TO RUN: node helperDB.js//////////////////////////
//uncomment below to test
runGetActivities();
// getDB();
// runGetUser('Brandon');
// runGetAllActivities('Brandon');
// runSetActivity('Brandon', 5, true);
// runAddFriend('Annelyse', 'Brandon');
// runGetChat('Annelyse', 'Brandon');
// runSendFriendRequest('Annelyse', 'Gary');
// runAcceptFriendRequest('Gary', 'Annelyse');
// runSendChat('Gary', 'Annelyse', 'Who are you');