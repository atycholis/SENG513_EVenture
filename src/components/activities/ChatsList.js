import ChatPreview from './ChatPreview.js'
import Card from '../ui/ChatCard.js'

function setActive(chatid)
{
    

}

function ChatsList(props){
    return (
        
        <ul className={"ChatsList"}>
            
            {props.chats.map(chat => (
                <Card 
                active={chat.active} onClick={() => {setActive(chat.id)}}>
                <ChatPreview
                    sender={chat.sender}
                    time={chat.time}
                    message={chat.message}
                />
                </Card>
            ))}
        </ul>
        
    );
}

export default ChatsList;