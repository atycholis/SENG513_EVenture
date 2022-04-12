import classes from './ActivityItem.module.css'
import Card from '../ui/Card'

function addToFavourites(activity, id)
{
    //TODO: Add activity to favourites
}

function addToDislikes(activity, id)
{
    //TODO: Add activity to dislikes
}

function ActivityItem(props){
    const likeID = props.id + "like";
    const dislikeID = props.id + "dislike"; 
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
                    <button id={likeID} onClick={() => {addToFavourites(props.title, props.id)}}>{"Like"}</button>
                    <button id={dislikeID} onClick={() => {addToDislikes(props.title, props.id)}}>{"Dislike"}</button>
                </div>
            </Card>
        </li>
    );
}

export default ActivityItem;