const MongoClient = require('mongodb').MongoClient;

// Takes in username and returns full user obj as promise.
// USAGE: *IN ASYNC FUNCTION* const result = getUser('<username>').then(result => result);
async function getUser(username) {
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
// USAGE: *IN ASYNC FUNCTION* const result = getUser('<username>').then(result => result);
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
        'username': 'Tarnished'
      }
    }, {
      '$lookup': {
        'from': 'activities',
        'localField': 'likedActivities',
        'foreignField': 'id',
        'as': 'likedActivityArray'
      }
    }, {
      '$lookup': {
        'from': 'activities',
        'localField': 'dislikedActivities',
        'foreignField': 'id',
        'as': 'dislikedActivityArray'
      }
    }, {
      '$unset': [
        '_id', 'id', 'username', 'likedActivities', 'dislikedActivities'
      ]
    }, ]).toArray();


  } finally {
    await client.close();
  }
}

// Takes in username, activityID and activityEvaluation and sets the user information in the DB accordingly
// Function covers case where activityID already exists.
// USAGE: setActivityEval('string <username> ', <activityID>, bool<activityEval>);
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

    for (element in userInfo.likedActivities) {
      if (userInfo.likedActivities[element] == activityID) {
        await usersCollection.updateOne({
          'username': username
        }, {
          $pull: {
            'likedActivities': userInfo.likedActivities[element]
          }
        });
      }
    };
    for (element in userInfo.dislikedActivities) {
      if (userInfo.dislikedActivities[element] == activityID) {
        await usersCollection.updateOne({
          'username': username
        }, {
          $pull: {
            'dislikedActivities': userInfo.dislikedActivities[element]
          }
        });
      }
    };
    if (activityEval) {
      await usersCollection.updateOne({
        'username': username
      }, {
        $push: {
          'likedActivities': activityID
        }
      });
    } else if (!activityEval) {
      await usersCollection.updateOne({
        'username': username
      }, {
        $push: {
          'dislikedActivities': activityID
        }
      });
    }

  } finally {
    await client.close();
  }
}

// Takes in username, creates new user
// throws error if username already exists
//USAGE: addUser('<username>');
async function addUser(username) {
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
      throw console.error('\USERNAME TAKEN\n');
    else {
      var index = await usersCollection.count();
      await usersCollection.insertOne({
        "id": index,
        "username": username,
        "likedActivities": [],
        "dislikedActivities": []
      })
    }
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
    .then(result => result);
  console.log(result);
}

//example async func that displays activity id info based on username
async function runGetAllActivities(username) {
  const result = await getAllActivities(username)
    .then(result => result[0]);
  console.log(result);
}

//example call that updates users activity preference in the db
function runSetActivity(username, activityID, activityEval) {
  setUserActivityEval(username, activityID, activityEval);
}

//example call that adds a new user into the db
function runAddUser(username) {
  addUser(username);
}

//////////////////////TO RUN: node helperDB.js//////////////////////////
//uncomment below to test

//runGetUser('Brandon');
//runGetAllActivities('Brandon');
//runSetActivity('Brandon', 5, true);
//runAddUser('Annelyse');