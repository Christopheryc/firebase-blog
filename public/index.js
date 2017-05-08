/**
 * Created by chris on 5/8/17.
 */
let logout = function () {
    firebase.auth().signOut().then(function () {
        console.log("logout successfully");
    }).catch(function (error) {
        //TODO: handle logout error
        console.error(error);
    })
};