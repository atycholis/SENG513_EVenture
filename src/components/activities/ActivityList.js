import classes from './ActivityList.module.css'
import ActivityItem from "./ActivityItem";

function ActivityList(props){
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

export default ActivityList;