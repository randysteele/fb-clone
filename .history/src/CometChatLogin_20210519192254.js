const authKey = "33563bcde5404f5";
const uid = "Randy Steele";

CometChat.login(uid, authKey).then(
    user => {
        console.log("Login Successful:", { user });
    },
    error => {
        console.log("Login failed with exception:", { error });
    }
);