import classes from './MsgCard.module.css'

function MsgCard(props){
    return (
        <div className={classes.msgcard}>
            {props.children}
        </div>
    );
}

export default MsgCard;