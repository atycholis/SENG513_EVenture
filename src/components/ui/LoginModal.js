import classes from './LoginModal.module.css'
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

function LoginModal(props){
    let textInput = React.createRef();
    // This doesn't work
    useEffect(() => {
        fetch("/login").then(
            response => response.json()
        ).then(
            data => {
                //setBackendData(data);
                console.log(data);
            }
        )
    }, [])

    function confirmHandler(){
        props.onLogin();
        

        console.log('sent login-request');

        //Not certain if this is the correct place for the response event
        //Leaning towards no will likely have to be outside the scope of a function

        /*socket.on('login-response', () =>{
            //TO DO include output if username already exists
        });*/
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