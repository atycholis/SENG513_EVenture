import classes from './ChatCard.module.css'

function ChatCard(props){
    return (
        <div className={classes.chatcard}>
            {props.children}
        </div>
    );
}

export default ChatCard;