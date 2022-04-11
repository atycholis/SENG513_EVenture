import Chat from './Chat.js'

function ChatsList(props){
    return (
        <ul className={"ChatsList"}>
            {props.chats.map(chat => (
                <Chat
                    sender={chat.sender}
                    time={chat.time}
                    message={chat.message}
                />
            ))}
        </ul>
    );
}

export default ChatsList;