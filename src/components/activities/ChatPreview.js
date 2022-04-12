function ChatPreview(props){
    let msg = props.message;
    if(msg.length > 50)
    {
        msg = msg.substring(0, 50) + "...";
    }
    return (

        <ul className={"ChatPreview"}>
            
            <p><b>{props.sender}</b> {props.time} {msg}</p> 
            
        </ul>
 
        
    );
}

export default ChatPreview;