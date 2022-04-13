const { getCardHeaderUtilityClass } = require('@mui/material');
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3001;

require('./helperDB.js')();

app.get("/login/:user", (req, res) => {
  console.log(req.params.user);

  getUser(req.params.user).then((user) => {
    if (null == user) {
      console.log('user not found, creating...');
      addUser(req.params.user).then((success) => {
        console.log('user creation ' + success);
      });
      getUser(req.params.user).then((user) => {
        res.json({'success' : true, 'user' : user});
      });
    } else {
      console.log(user);
      res.json({'success' : true, 'user' : user});
    }
  }); 

})

app.get("/newActivity/:user", (req, res) => {
  console.log('newActivity' + req.params.user);

  data = {
    id: 'm3',
    title: 'The Batman',
    image:
        'https://images-na.ssl-images-amazon.com/images/I/81DGyn3r62L.jpg',
    address: '3953 University Ave NW #250, Calgary, AB T3B 6K3',
    description:
        "When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.",
  }
  res.json(data);
})

app.get("/friends/:user", (req, res) => {
  console.log('friends' + req.params.user);
  username = req.params.user;
  response_data = {};

  response_data.chats = [];

  (async() => {
    user = await mygetUser(req.params.user);
    console.log(user);

    for(let i = 0; i < user.friends.friendsList.length; ++i) {
      friend = user.friends.friendsList[i];
      console.log(friend);

      let chats = await mygetChat(username, friend);
      console.log(chats);
      chat_data = {};
      chat_data.friend = friend;
      chat_data.chat = chats;
      response_data.chats.push(chat_data);
    }

    res.json(response_data);
  })();
})

function mygetChat(username, friend) {
  return getChat(username, friend);
}

function mygetUser(username) {
  return getUser(username);
}

/*******************************************************************
 * Setup message handlers
 ******************************************************************/
io.on('connection', (socket) => {
  socket.on('login-request', msg => {
    console.log('login-request recevied');
  });

});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
