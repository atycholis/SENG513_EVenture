import { useState } from 'react'
import LoginModal from "../components/ui/LoginModal";
import LoginBackdrop from "../components/ui/LoginBackdrop";

/*Page loaded by router*/
function LoginPage(){
    //react hook that can only be called in component function
    const [ loginIsOpen, setLoginIsOpen ] = useState(true);

    function loginHandler(){
        setLoginIsOpen(false);
    }

    return (
        <div>
            <div className={'actions'}>

            </div>
            {loginIsOpen && <LoginModal onLogin={loginHandler}/>}
            {loginIsOpen && <LoginBackdrop />}
        </div>
    );
}

export default LoginPage;
