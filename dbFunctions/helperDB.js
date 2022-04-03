const MongoClient = require('mongodb').MongoClient;

// Takes in username and returns full user obj as promise.
// USAGE: *IN ASYNC FUNCTION* const result = getUser('<username>')
export async function getUser(username) {
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

// Takes in username and returns activities liked and disliked as obj as promise.
// USAGE: *IN ASYNC FUNCTION* const result = getUser('<username>')
export async function getAllActivities(username) {
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

// Takes in username, activityID and activityEvaluation and sets the user information in the DB accordingly
// Function covers case where activityID already exists.
// USAGE: setActivityEval('string <username> ', <activityID>, bool<activityEval>);
// Returns liked and dislike activities
export async function setUserActivityEval(username, activityID, activityEval) {
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

// Takes in username, creates new user
// throws error if username already exists
//USAGE: addUser('<username>');
export async function addUser(username) {
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
    }
  } catch (err) {
    console.log(err);
    return false

  } finally {
    await client.close();
  }
}

// Takes in username and friendUsername and adds to list of friends for that user
// TO USE: addToFriendsList('<username>', '<username of friend>')
export async function addTOFriendsList(username, friendUsername) {
  const client = new MongoClient(
    'mongodb+srv://SENG:513@cluster0.a7uvh.mongodb.net/test');
  try {
    await client.connect();
    const database = client.db("513");
    const usersCollection = database.collection("users");
    if (await usersCollection.findOne({
        $and: [{
          username: username
        }, {
          'friends.friendsList': {
            $nin: [friendUsername]
          }
        }]
      })) {
      return await usersCollection.updateOne({
        username: username
      }, {
        $push: {
          'friends.friendsList': friendUsername
        }
      })
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

//////////////////////////////////////////////////////////////////////////
///////////////////////////// EXAMPLE CODE ///////////////////////////////
//////////////////////////////////////////////////////////////////////////
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
  const result = await addTOFriendsList(username, friendUsername);
  console.log("\naddFriend...");
  console.log(result);
}


//////////////////////TO RUN: node helperDB.js//////////////////////////
//uncomment below to test

runGetUser('Brandon');
runGetAllActivities('Brandon');
runSetActivity('Brandon', 5, true);
runAddUser('Annelyse');
runAddFriend('Tarnished', 'Annelyse');