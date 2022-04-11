import Chat from './Chat.js'

function OpenChat(props){
    return (
        
        <div className={"OpenChat"}>
               <Chat
                    sender={props.sender}
                    time={props.time}
                    message={props.message}
                />
        </div>
    );
}

export default OpenChat;