import ChatsList from "../components/activities/ChatsList";
import React, { useEffect, useState } from 'react'

var date_format_options = {day : 'numeric', month : 'numeric', year : 'numeric', hour : 'numeric', minute : 'numeric', second : 'numeric'};

const DUMMY_CHATS_LIST = [{
    active: "true",
    i: "0",
    name: "Brandon",
    messages: [{
        message: "Hello this is a chat",
        sender: "Brandon",
        time: "6:01pm",
        
    },
    {
    message: "Hey Brandon, what's popping king?",
    sender: "Joel",
    time: "6:03pm",
    
    },
    {
    message: "Not much, just chilling.",
    sender: "Brandon",
    time: "6:09pm",
    
    },]
},
{
    active: "false",
    i: "1",
    name: "Jed",
    messages: [{
        message: "I want to see Batman! This is an example of a reaaaaaaaaaaaaaally looooooong chat message. This is to test if a preview works or if it doesn't.",
        sender: "Jed",
        time: "3:02pm",
   
    },
    {
    message: "Ok",
    sender: "Joel",
    time: "3:03pm",
   
    },
  ]
},
    ]

/*Page loaded by router*/
function Friends(){
    const [activity, setFriends] = useState(1);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(user);

    useEffect(() => {
        fetch("/friends/" + user.username).then(
            response => response.json()
        ).then(
            data => {
                console.log(data);

                for(let i = 0; i < data.chats.length; ++i) {
                    let new_chat = {};
                    new_chat.active = "false";
                    new_chat.i = 2 + i;
                    new_chat.messages = [];
                    for (let j = 0; j < data.chats[i].chat.length; ++j) {
                        let new_message = {};
                        new_message.message = data.chats[i].chat[j].message;
                        new_message.sender = data.chats[i].chat[j].sentBy;
                        let date_string = new Date(data.chats[i].chat[j].date).toLocaleString('en-us', date_format_options);
                        new_message.time = date_string;

                        new_chat.messages.push(new_message);
                    }

                    DUMMY_CHATS_LIST.push(new_chat);
                }

                setFriends(activity + 1);
            }
        )
    }, [])

    return (
        <div>
            <h1>My Friends and Chats</h1>
            <ChatsList chats={DUMMY_CHATS_LIST} />      
        </div>
    );
}

export default Friends;

/*{[<li>Item1</li>,<li>Item2</li>]}
<ul>
{DUMMY_DATA.map((meetup)=>{
    return <li key={meetup.id}>{meetup.title}</li>
})}
</ul>*/