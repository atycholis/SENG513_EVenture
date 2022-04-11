import classes from './LoginModal.module.css'
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

function LoginModal(props){
    let textInput = React.createRef();
    const [login, setLogin] = useState();

    useEffect(() => {
        if (login) {
            fetch("/login/" + textInput.current.value).then(
                response => response.json()
            ).then(
                data => {
                    console.log('login request complete');
                    console.log(data);
                    props.onLogin();
                }
            )
        }
    }, [login])

    return(
        <div className={classes.modal}>
            <h4 className={classes.modal_text}>Welcome to eVenture! <br/> An activity Planning Web Application</h4>
            <p className={classes.p}>Enter Username</p>
            <input ref={textInput} autoComplete={'off'}/><button onClick={() => setLogin(true)}>Login</button>
        </div>
    )
}

export default LoginModal;