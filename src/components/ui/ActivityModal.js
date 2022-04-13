import classes from './ActivityModal.module.css'
import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import {Link} from "react-router-dom";

function ActivityModal(props){
    const [activity, setActivity] = useState(true);
    let mutualActivities = [];

    useEffect(() => {
        if (activity) {
            fetch("/activities/" + props.myID + "/" + props.friendID).then(
                response => response.json()
            ).then(
                data => {
                    console.log(data);
                    mutualActivities = data;
                }
            )
        }
        else
        {
            props.onActivity();
        }
    }, [activity])

    return(
        <div className={classes.modal}>
            <h4 className={classes.modal_text}>Mutual Activities </h4>
            <button onClick={() => setActivity(false)}>Confirm</button>
        </div>
    )
}

export default ActivityModal;