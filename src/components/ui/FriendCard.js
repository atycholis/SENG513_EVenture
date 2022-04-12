import classes from './FriendCard.module.css'

function FriendCard(props){
    return (
        <div className={classes.friendcard}>
            {props.children}
        </div>
    );
}

export default FriendCard;