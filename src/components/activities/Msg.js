import Card from '../ui/MsgCard.js'
import TextField from '@mui/material/TextField';
import classes from './Msg.module.css'

function sendMessage(msg)
{
    //TODO seng message to chat
}

function Msg(){
    return (
        <div className={classes.actions}>
            <Card>
                <TextField id="outlined-basic" label="Message" variant="outlined" />
                <button id="msg-button" onClick={() => {sendMessage(document.getElementById('outlined-basic').value)}}>Send</button>
            </Card>
        </div>
    );
}

export default Msg;