import classes from './ActivityItem.module.css'
import Card from '../ui/Card'
import React, { useEffect, useState } from 'react'



function ActivityItem(props){
    function addToFavourites(im, de, ti, i)
    {
        let game = [{
            id: {i},
            title: {ti},
            image:
                {im},
            description:
                {de},
        }]
        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.likedActivities.push(game);
        setActivityShowing(false);

    }

    function addToDislikes(im, de, ti, i)
    {
        let game = [{
            id: {i},
            title: {ti},
            image:
                {im},
            description:
                {de},
        }]
        const user = JSON.parse(localStorage.getItem('currentUser'));
        user.dislikedActivities.push(game);
        setActivityShowing(false);
    }
    const [ activityShowing, setActivityShowing ] = useState(true);
        
        if(activityShowing) {
            return (
        <div>
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                </div>
                <div className={classes.actions}>
                    <button id={"like"} onClick={() => {addToFavourites(props.image, props.description, props.title, props.id)}}>{"Like"}</button>
                    <button id={"dislike"} onClick={() => {addToDislikes(props.image, props.description, props.title, props.id)}}>{"Dislike"}</button>
                </div>
            </Card>
        </li>
        </div>
        );
        }
}

export default ActivityItem;