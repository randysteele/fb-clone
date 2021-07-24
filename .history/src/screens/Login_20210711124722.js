import '../styles/Login.css'
import { auth, provider } from '../firebase'
import { CometChat } from '@cometchat-pro/chat'
import { cometChat } from '../app.config'
import { useState } from 'react'
import { YoutubeSearchedForSharp } from '@material-ui/icons'

function Login() {
    const [loading, setLoading] = useState(false)

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

    const loginCometChat = (data) => {
        const authKey = cometChat.AUTH_KEY


        CometChat.login(data.uid, authKey)
            .then((u) => {
                localStorage.setItem('user', JSON.stringify(data))
                window.location.href = '/'
                console.log(u)
                setLoading(false)
            })
            .catch((error) => {
                if (error.code === 'ERR_UID_NOT_FOUND') {
                    signUpWithCometChat(data)
                } else {
                    console.log(error)
                    setLoading(false)
                    alert(error.message)
                }
            })
    }

    const signUpWithCometChat = (data) => {
        const authKey = cometChat.AUTH_KEY
        const user = new CometChat.User(data.uid)

        user.setName(data.displayName)
        user.setAvatar(data.photoURL)

        CometChat.createUser(user, authKey)
            .then(() => {
                setLoading(false)
                alert('You are now signed up, click the button again to login')
            })
            .catch((error) => {
                console.log(error)
                setLoading(false)
                alert(error.message)
            })
    }

    return (
        <div className="login">
            <div className="login__logo">
                <img src="https://logodix.com/logo/51169.jpg" alt="fb Logo" />
                <br></br><h4>Sign in to CometChat</h4>
                <button onClick={signIn}>
                    <br></br>{!loading ? 'Sign In With Google' : <div id="loading"></div>}
                </button>
            </div>
        </div>
    )
}

export default Login