import ChatPreview from './ChatPreview.js'
import Card from '../ui/ChatCard.js'
import React, { useEffect, useState } from 'react'
import OpenChat from "./OpenChat";
import Msg from "./Msg";

function ChatsList(props){
    const [activeChat, setActiveChat] = useState(props.chats.at(0).i);
    function setActive(chatid)
    {
        console.log(chatid);
        props.chats.at(activeChat).active = "false";
        props.chats.at(chatid).active = "true";
        setActiveChat(chatid);
    }
    return (
       
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
        
    );
}

export default ChatsList;