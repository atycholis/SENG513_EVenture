import Chat from './Chat.js'
import Card from '../ui/MiniCard.js'

function OpenChat(props){
    return (
        <Card>
        <ul className={"OpenChat"}>
        {props.chat.map(openchat => (
            
            <Chat
                sender={openchat.sender}
                time={openchat.time}
                message={openchat.message}
            />
            
        ))}
        </ul>
        </Card>
    );
}

export default OpenChat;