import classes from './ChatCard.module.css'
var className = "";
function ChatCard(props){

    if(props.active === "true")
    {
        className = classes.chatcard;
    }
    else
    {
        className = classes.inactivecard;
    }
    return (
        
        <div className={className}>
            {props.children}
        </div>
    );
}

export default ChatCard;