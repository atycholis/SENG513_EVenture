import classes from './LoginModal.module.css'
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import {Link} from "react-router-dom";

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
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                    props.onLogin();
                }
            )
        }
    }, [login])

    return(
        <div className={classes.modal}>
            <h4 className={classes.modal_text}>Welcome to eVenture! <br/> A Gaming Activity-Planning Web Application</h4>
            <p className={classes.p}>Login using an existing nickname, or create a new one.</p>
            <input ref={textInput} autoComplete={'off'}/><button onClick={() => setLogin(true)}>Login</button>
        </div>
    )
}

export default LoginModal;