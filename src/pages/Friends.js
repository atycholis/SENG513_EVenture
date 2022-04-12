import ChatsList from "../components/activities/ChatsList";
import FriendsList from "../components/activities/FriendsList";
import React, { useEffect, useState } from 'react'

const DUMMY_CHATS_LIST = [{
    active: "true",
    i: "0",
    messages: [{
        message: "Hello this is a chat",
        sender: "Brandon",
        time: "6:01pm",
        chatID: "1"
    },
    {
    message: "Hey Brandon, what's popping king?",
    sender: "Joel",
    time: "6:03pm",
    chatID: "3"
    },
    {
    message: "Not much, just chilling.",
    sender: "Brandon",
    time: "6:09pm",
    chatID: "4"
    },]
},
{
    active: "false",
    i: "1",
    messages: [{
        message: "I want to see Batman! This is an example of a reaaaaaaaaaaaaaally looooooong chat message. This is to test if a preview works or if it doesn't.",
        sender: "Jed",
        time: "3:02pm",
        chatID: "2"
    },
    {
    message: "Ok",
    sender: "Joel",
    time: "3:03pm",
    chatID: "5"
    },
  ]
},
    ]



    const DUMMY_FRIENDS_LIST = [{
        name: "Brandon"
    },
    {
        name: "Jed"
    },
    ]
/*Page loaded by router*/
function Friends(){
    return (
        <div>
            <h1>My Friends and Groups</h1>
            <FriendsList friends={DUMMY_FRIENDS_LIST} />
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