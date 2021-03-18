
import { useContext, useState } from 'react';
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { handleGoogleSignIn, handleSignOut, initializeLOgInFramework } from "./LoginManager";



function Login() {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState(
        {
            isSignIn: false,
            name: '',
            email: '',
            photo: '',
            error: '',
            success: false
        }

    )

    initializeLOgInFramework();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res)
                history.replace(from);
            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }

    }
    const handleSubmit = (e) => {

        if (newUser && user.email && user.password) {

        }

        if (!newUser && user.email && user.password) {

        }

        e.preventDefault();
    }


    return (
        <div style={{ textAlign: 'center' }} >
            {
                user.isSignIn ? < button onClick={signOut}>Sign out</button> :
                    <button onClick={googleSignIn}>Sign In</button>
            }
            {
                // user.isSignIn ? <p> {user.name}</p> : ''
                user.isSignIn &&
                <div>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <img src={user.photo} alt="" />
                </div >
            }

            <h1>Our Authentication</h1>
            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
            <label htmlFor="newUser">New User Sign Up</label><br />
            <form onSubmit={handleSubmit}>

                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter your Name" />}<br />

                <input type="text" name="email" onBlur={handleBlur} placeholder='Enter your email' required /><br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Enter your password" required /><br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
            </form>
            <p style={{ color: 'red' }}> {user.error}</p>
            {
                user.success && <p style={{ color: 'green' }}> {newUser ? 'Created' : 'Logged In'} successfully!</p>
            }
        </div >
    );
}

export default Login;
