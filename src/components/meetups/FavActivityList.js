import classes from './FavActivityList.module.css'
import ActivityItem from "./ActivityItem";

function FavActivityList(props){
    return (
        <ul className={classes.list}>
            {props.activities.map(activity => (
                <ActivityItem
                    key={activity.id}
                    id={activity.id}
                    image={activity.image}
                    title={activity.title}
                    address = {activity.address}
                    description = {activity.description}
                />
            ))}
        </ul>
    );
}

export default FavActivityList;