function Chat(props){
    return (
        <div className={"Chat"}>
                <strong>{props.sender}</strong>
                <p>{props.time}</p>
                <p>{props.message}</p>
        </div>
    );
}

export default Chat;