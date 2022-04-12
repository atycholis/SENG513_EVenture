import Friend from './Friend'
import Card from '../ui/FriendCard.js'
function FriendsList(props){
    return (
        <Card>
        <ul className={"FriendsList"}>
        <strong>My Friends</strong>
            {props.friends.map(friend => (
                <Friend
                friend={friend.name}
                />   
            ))}
        </ul>
        </Card>
    );
}

export default FriendsList;