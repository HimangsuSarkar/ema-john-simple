import firebase from "firebase/app"
import "firebase/auth"
import firebaseConfig from './firebaseConfig'

export const initializeLOgInFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

}

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const signedInUser = {
                isSignIn: true,
                name: displayName,
                email: email,
                password: '',
                photo: photoURL,
            };
            return signedInUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignIn: false,
                name: '',
                email: '',
                photo: '',
                error: '',
                success: false
            };
            return signedOutUser;
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
}

// export const createUserWithEmailAndPassword = () => {

//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then(res => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//         })
//         .catch(error => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//             updateUserName(user.name);
//         });
// }

// export const signInWithEmailAndPassword = () => {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = '';
//             newUserInfo.success = true;
//             setUser(newUserInfo);
//             setLoggedInUser(newUserInfo);
//             history.replace(from);
//             console.log('sign in user info', res.user);
//         })
//         .catch((error) => {
//             const newUserInfo = { ...user };
//             newUserInfo.error = error.message;
//             newUserInfo.success = false;
//             setUser(newUserInfo);
//         });

// }

// const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: name,
//     }).then(function () {
//         console.log('user name updated successfully')
//     }).catch(function (error) {
//         console.log(error)
//     });
// }
