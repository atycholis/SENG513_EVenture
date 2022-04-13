import classes from './MsgCard2.module.css'

function MsgCard2(props){
    return (
        <div className={classes.msgcard2}>
            {props.children}
        </div>
    );
}

export default MsgCard2;