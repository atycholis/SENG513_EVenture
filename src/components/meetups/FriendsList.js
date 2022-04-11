import Friend from './Friend'
function FriendsList(props){
    return (
        <ul className={"FriendsList"}>
            {props.friends.map(friend => (
                <Friend
                friend={friend.name}
                />
            ))}
        </ul>
    );
}

export default FriendsList;