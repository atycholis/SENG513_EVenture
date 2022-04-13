import ChatsList from "../components/activities/ChatsList";
import React, { useEffect, useState } from 'react'

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