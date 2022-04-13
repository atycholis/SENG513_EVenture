import classes from './FavActivityList.module.css'
import ActivityItem from "./FavouriteItem";

function FavActivityList(props){
    return (
        <ul className={classes.list}>
            {props.activities.map(activity => (
                <ActivityItem
                    id={activity.id}
                    image={activity.image}
                    title={activity.title}
                    description = {activity.description}
                />
            ))}
        </ul>
    );
}

export default FavActivityList;