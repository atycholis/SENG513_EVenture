import classes from './MiniCard.module.css'

function MiniCard(props){
    return (
        <div className={classes.minicard}>
            {props.children}
        </div>
    );
}

export default MiniCard;