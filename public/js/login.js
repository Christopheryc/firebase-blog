/**
 * Created by chris on 5/8/17.
 */

firebase.auth().onAuthStateChanged(function (user) {
    if(user){
        console.log(user);
        window.location = "/";
    } else{
        console.log("not login");
    }
});

let errorMsg = document.getElementsByClassName("errorMsg");

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
    }
    // The signed-in user info.
    var user = result.user;
    console.log(result);
}).catch(function(error) {
    //TODO: handle redirect error
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    console.error(error);
});

let login = function () {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;
    console.log(email);
    console.log(password);
    loginWithEmail(email,password);
};

let loginWithEmail  = function (email, password) {
    firebase.auth().signInWithEmailAndPassword(email,password).catch(function (error) {
        //TODO: handle login error
        console.log(error);
        errorMsg[0].innerHTML = error.message;

        switch(error.code){
            case "auth/invalid-email":
                break;
            case "auth/user-not-found":
                break;
            case "auth/wrong-password":
                break;
            case "auth/user-disabled":
                break;
        }
    })
};

let loginWithGoogle = function () {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/plus.login');
    firebase.auth().signInWithRedirect(provider);

};

let logout = function () {
    firebase.auth().signOut().then(function () {
        console.log("logout successfully");
    }).catch(function (error) {
        //TODO: handle logout error
        console.error(error);
    })
};