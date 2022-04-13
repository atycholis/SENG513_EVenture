import Card from '../ui/MsgCard2.js'
import TextField from '@mui/material/TextField';
import classes from './AddFriend.module.css'

function addFriend(username)
{
    console.log(username);
    const user = JSON.parse(localStorage.getItem('currentUser'));
    user.friends.push(username);
    document.getElementById('addfriend').value = "";
}

function AddFriend(){
    return (
        <div className={classes.actions}>
            <Card>
                <h4>Add a New Friend</h4>
                <TextField id="addfriend" label="Username" variant="outlined" />
                <button id="msg-button" onClick={() => {addFriend(document.getElementById('addfriend').value)}}>Add Friend</button>
            </Card>
        </div>
    );
}

export default AddFriend;