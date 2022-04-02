import classes from './ActivityItem.module.css'
import Card from '../ui/Card'

function addToFavourites(activity, id)
{
    if(document.getElementById(id).innerText==="To Favorites")
    {    
        alert ("Added " + activity + " to favorites.");
        document.getElementById(id).innerText="Remove Favorite";
    }
    else
    {
        alert ("Removed " + activity + " from favorites.");
        document.getElementById(id).innerText="To Favorites";
    }
}

function ActivityItem(props){
    let buttonText = "To Favorites";
    return (
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <img src={props.image} alt={props.title}/>
                </div>
                <div className={classes.content}>
                    <h3>{props.title}</h3>
                    <address>{props.address}</address>
                    <p>{props.description}</p>
                </div>
                <div className={classes.actions}>
                    <button id={props.id} onClick={() => {addToFavourites(props.title, props.id)}}>{buttonText}</button>
                </div>
            </Card>
        </li>
    );
}

export default ActivityItem;