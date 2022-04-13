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
