
// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user);
      googleUI(user);
      // test app
     
    }, err => console.log(err.message));
  } else {
    console.log('user logged out');
    setupUI();
    setupGuides([]);
  }
})

// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    $('#modal-create').modal('hide');
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      name: signupForm['signup-name'].value,
      avatarURL: "https://static1.squarespace.com/static/54b7b93ce4b0a3e130d5d232/54e20ebce4b014cdbc3fd71b/5a992947e2c48320418ae5e0/1519987239570/icon.png",
      //Set state of friend
      friend: false,
      verify: false
    



    });
    console.log(cred.user);
  }).then(() => {
    // close the signup modal & reset form
    //const modal = document.querySelector('#modal-signup');
    //M.Modal.getInstance(modal).close();
    $('#modalSignUp').modal('hide');
    $('#modalVerify').modal('show');
    signupForm.reset();
    signupForm.querySelector('.error').innerHTML = "";
  }).catch( err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    $('#modalUser').modal('hide');
    console.log('user signed out');
    $('#modalUser').modal('hide');
    $('#modalLogout').modal('show');
  })
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
    // close the signup modal & reset form
    $('#modalSignIn').modal('hide');
    $('#modalUser').modal('show');
       loginForm.reset();
       loginForm.querySelector('.error').innerHTML = "";
  }).catch(err =>{
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});

//Google SignIn

const googleLogIn=()=>{

  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    return db.collection('users').doc(result.user.uid).set({
      name: user.displayName,
      avatarURL: user.photoURL,
      //Set state of friend
      friend: false,
      verify: false
    



    });
    console.log(cred.user);
    // ...
    console.log(user.displayName);
    console.log(user.photoURL);
    console.log("Succeeded");
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
   
    console.log(error.message);
  });
};


//Send email of verification



const getEmailVerification=() => {
  
  const notifyResult = document.querySelector('.notify-result');
  var user = firebase.auth().currentUser;
const success =`
<div>Email sent successfully</div>
`;
const error =`
<div>Email sent failed.</div>
`;
user.sendEmailVerification().then(function() {
 notifyResult.innerHTML = success;
}).catch(function(error) {
  notifyResult.innerHTML = error;
});
};
