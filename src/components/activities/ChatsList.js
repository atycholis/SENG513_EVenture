import ChatPreview from './ChatPreview.js'
import Card from '../ui/ChatCard.js'
import React, { useEffect, useState } from 'react'
import OpenChat from "./OpenChat";
import Msg from "./Msg";
import ActivityModal from "../ui/ActivityModal";
import FriendCard from '../ui/FriendCard.js'
import Friend from './Friend'
import classes from './ChatList.module.css'

function ChatsList(props){
    const [activeChat, setActiveChat] = useState(props.chats.at(0).i);
    const [ activityIsOpen, setActivityIsOpen ] = useState(false);
    function setActive(chatid)
    {
        console.log(chatid);
        props.chats.at(activeChat).active = "false";
        props.chats.at(chatid).active = "true";
        setActiveChat(chatid);
    }
    function activeHandler(){
        setActivityIsOpen(false);
    }
    return (
       <div>
           <FriendCard>
        <ul className={"FriendsList"}>
        <strong>My Friends</strong>
            {props.chats.map(friend => (
                <div className={classes.actions}>
                <Friend
                friend={friend.name}
                />   
                <button id="open-button" onClick={() => {setActivityIsOpen(true)}}>See Mutual Activities</button>
                </div>
            ))}
            
        </ul>
        </FriendCard>
        <ul className={"ChatsList"}>
            
            {props.chats.map(chat => (
                <div onClick={() => {setActive(chat.i)}}>
                <Card 
                active={chat.active}>
                <ChatPreview
                    sender={chat.messages.at(0).sender}
                    time={chat.messages.at(0).time}
                    message={chat.messages.at(0).message}
                />
                </Card>
                </div>
            ))}

                
                <OpenChat chat={props.chats.at(activeChat).messages}/>
                <Msg/>
        </ul>
        {activityIsOpen && <ActivityModal onActivity={activeHandler}/>}
        </div>
    );
}

export default ChatsList;