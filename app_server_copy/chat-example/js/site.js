var socket = io();

var login_form = document.getElementById('login-form');
var login_input = document.getElementById('login-input');
var login_color_dropdown_button = document.getElementById('color-dropdown-button');
var login_color_buttons = document.getElementsByClassName('color-button');

var online_users = document.getElementById('online-users');
var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

var date_format_options = {day : 'numeric', month : 'numeric', year : 'numeric', hour : 'numeric', minute : 'numeric', second : 'numeric'};

/*******************************************************************
 * Login Page
 ******************************************************************/

// Setting up event listeners
for (let i = 0; i < login_color_buttons.length; ++i) {
  let button = login_color_buttons[i];
  button.addEventListener('click', function() {
    login_color_dropdown_button.innerText = button.innerText;
    login_color_dropdown_button.style.backgroundColor = button.style.backgroundColor;
  });
}

login_form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  let msg = {};
  if ('' == login_color_dropdown_button.style.backgroundColor) {
    msg.color = 'rgb(41, 128, 185)';
  } else {
    msg.color = login_color_dropdown_button.style.backgroundColor;
  }

  msg.username = login_input.value;
  socket.emit('user creation', msg);
  login_input.value = '';
});

// Setting up message handlers
socket.on('user creation success', function(msg) {
  document.getElementById('login-site-wrap').style.display = 'none';
  document.getElementById('chat-site-wrap').style.display = 'flex';
});

socket.on('user creation fail', function(msg) {
  document.getElementById('prompt').innerText = 'That username is already taken, try another one';
  document.getElementById('prompt').style.color = 'red';
});

/*******************************************************************
 * Chat Page
 ******************************************************************/

// Setting up event listeners
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    if (input.value.slice(0, 6) == '/nick ') {
      let text = input.value.slice(6);
      if (0 == text.length) {
        return;
      }

      let msg = {};
      msg.username = text;
      msg.color = '';
      socket.emit('change settings', msg);
    } else if (input.value.slice(0, 11) == '/nickcolor ') {
      let text = input.value.slice(11);
      if (6 != text.length) {
        return;
      }
      let r = parseInt(text.slice(0, 2), 16);
      let g = parseInt(text.slice(2, 4), 16);
      let b = parseInt(text.slice(4, 6), 16);
      if (isNaN(r) || isNaN(g) || isNaN(b)) {
        console.log(text);
        console.log(text.slice(11, 13));
        console.log(text.slice(13, 15));
        console.log(text.slice(15, 17));
        return;
      }
      let color = 'rgb(' + r + ', ' + g + ', ' + b  + ')';
      let msg = {};
      msg.username = '';
      msg.color = color;
      socket.emit('change settings', msg);
      console.log(msg.color);
    }
    else {
      socket.emit('chat message', input.value);
    }
    input.value = '';
  }
});

// Setting up message handlers
socket.on('chat message', function(msg) {
  var item = document.createElement('li');

  date_string = new Date(msg.date).toLocaleString('en-us', date_format_options);

  let para = document.createElement("p");
  para.innerHTML = date_string + "\n" + msg.username + "\n<b>" + msg.text + "</b>";

  let li = document.createElement("li");
  li.appendChild(para);
  li.style.background = msg.color;
  messages.appendChild(li);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user joined', function(msg) {
  let item = document.createElement('li');
  item.textContent = msg.username;
  item.style.background = msg.color;

  online_users.appendChild(item);
});

socket.on('user removed', function(msg) {
  let ul = document.getElementById('online-users');
  list_items = ul.childNodes;
  for (let i = 0; i < list_items.length; ++i) {
    if (list_items[i].innerText == msg) {
        ul.removeChild(list_items[i]);
    }
  }
});

function colorDropDownOnClick() {
  document.getElementById("color-dropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
