import classes from './LoginModal.module.css'
import {useState} from "react";

function LoginModal(props){
    const [ value, setValue ] = useState(true);

    function confirmHandler(){
        props.onLogin();
    }

    return(
        <div className={classes.modal}>
            <h1 className={classes.text}>eVenture</h1>
            <h4 className={classes.text}>Activity Planning Web Application</h4>
            <div className={classes.text}>
                <h5>Step 1 Like Activities</h5>
                <p className={classes.p}>Discover new & exciting local activities & like your favorites</p>
                <h5>Step 2 Compare</h5>
                <p className={classes.p}>Compare your favorite activities with your friends to discover common activities!</p>
                <h5>Step 3 Chat</h5>
                <p className={classes.p}>Message friends & groups directly within the app to arrange a time & date</p>
                <h5>Step 4 Enjoy!</h5>
                <p className={classes.p}>Enjoy an event that everyone can get on board with! Meet again next week?</p>
            </div>
            <p className={classes.text}>Enter Username</p>
            <input autoComplete="off"/><button onClick={confirmHandler}>Login</button>
        </div>
    )
}

export default LoginModal;