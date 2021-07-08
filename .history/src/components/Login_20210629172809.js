import React from 'react';
import "../styles/Login.css";
import { Button } from "@material-ui/core";
import { auth, provider } from "../adapters/firebase"
import { actionTypes } from "../reducer/reducer";
import { useStateValue } from "../adapters/StateProvider";
import { CometChat } from "@cometchat-pro/chat";
import { AUTH_KEY, APP_ID } from "../adapters/Constants";
import { useState, setLoading } from 'react'
import { cometChat } from './app.config'



const Login = () => {
    const [state, dispatch] = useStateValue();

    // const signIn = () => {
    //     auth.signInWithPopup(provider)
    //         .then((result) => {
    //             dispatch({
    //                 type: actionTypes.SET_USER,
    //                 user: result.user,
    //             });
    //         })
    //         .catch((error) => alert(error.message))
    // }

    const signIn = () => {
        setLoading(true)
        auth
            .signInWithPopup(provider)
            .then((res) => loginCometChat(res.user))
            .catch((error) => {
                setLoading(false)
                alert(error.message)
            })
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1200px-Facebook_f_logo%282019%29.svg.png" alt="login logo" />
                <img src="https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg" alt="logo" />
            </div>
            <Button type="submit" onClick={signIn}>
                SignIn
            </Button>

        </div>
    );
};

export default Login;