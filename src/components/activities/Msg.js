import Card from '../ui/MsgCard.js'
import TextField from '@mui/material/TextField';
import classes from './Msg.module.css'

function sendMessage(msg)
{
    console.log(msg);
    document.getElementById('sendmsg').value = "";
}

function Msg(){
    return (
        <div className={classes.actions}>
            <Card>
                <TextField id="sendmsg" label="Message" variant="outlined" />
                <button id="msg-button" onClick={() => {sendMessage(document.getElementById('sendmsg').value)}}>Send</button>
            </Card>
        </div>
    );
}

export default Msg;