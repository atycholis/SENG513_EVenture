import React, { useEffect, useState } from 'react'
import LoginModal from "../components/ui/LoginModal";
import LoginBackdrop from "../components/ui/LoginBackdrop";
import classes from "../components/ui/Login.module.css";

/*Page loaded by router*/
function LoginPage(){
    //react hook that can only be called in component function
    const [ loginIsOpen, setLoginIsOpen ] = useState(true);
    function loginHandler(){
        setLoginIsOpen(false);
    }

    return (
        <div className={classes.login}>
            <ul className={classes.flex_container}>
                <li>
                    <h5>Step 1 Like Games</h5>
                    <div className={classes.container}>
                        <img className={classes.image} src={"https://cdn.discordapp.com/attachments/948624110739685420/959958168950169670/list.png"} alt={'List'}/>
                    </div>
                    <p className={classes.p}>Discover new & exciting video games & like your favorites...</p>
                </li>
                <li>
                    <h5>Step 2 Compare</h5>
                    <div className={classes.container}>
                        <img className={classes.image} src={"https://cdn.discordapp.com/attachments/948624110739685420/959958169403138058/friends.png"} alt={'List'}/>
                    </div>
                    <p className={classes.p}>Compare your favorite games with your friends to discover common games!</p>
                </li>
                <li>
                    <h5>Step 3 Chat</h5>
                    <div className={classes.container}>
                        <img className={classes.image} src={"https://cdn.discordapp.com/attachments/948624110739685420/959958169617043486/chat.png"} alt={'List'}/>
                    </div>
                    <p className={classes.p}>Message friends directly within the app to arrange a time & date to play</p>
                </li>
                <li>
                    <h5>Step 4 Enjoy!</h5>
                    <div className={classes.container}>
                        <img className={classes.image} src={"https://cdn-icons-png.flaticon.com/512/3076/3076944.png"} alt={'List'}/>
                    </div>
                    <p className={classes.p}>Enjoy a game that everyone can get on board with! Meet again next week?</p>
                </li>
            </ul>
            {loginIsOpen && <LoginModal onLogin={loginHandler}/>}
            {loginIsOpen && <LoginBackdrop />}
        </div>
    );
}

export default LoginPage;
