import classes from './LoginModal.module.css'
import React from "react"

function LoginModal(props){
    let textInput = React.createRef();

    function confirmHandler(){
        props.onLogin();
        //FOR BACKEND - username from UI
        console.log(textInput.current.value);
    }

    return(
        <div className={classes.modal}>
            <h4 className={classes.modal_text}>Welcome to eVenture! <br/> An activity Planning Web Application</h4>
            <p className={classes.p}>Enter Username</p>
            <input ref={textInput} autoComplete={'off'}/><button onClick={confirmHandler}>Login</button>
        </div>
    )
}

export default LoginModal;