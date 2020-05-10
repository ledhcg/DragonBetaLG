
// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const notiVerification = document.querySelector('.noti-verification');


const googleUI =(user) => {

if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}
}

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
    const html = `
    <section class="live">
    <div class="person live-active">
<div class="profile-pic" style="background-image: url('${doc.data().avatarURL}')"></div>
<p class="name">BEST FRIEND</p>
<span><i class="fas fa-fire"></i></span>
</div>

   </section>
      <h2>${doc.data().name}</h2>
      <div>Logged in as ${user.email}</div>
    `;

    const realFriend =`
    <i class="zmdi zmdi-friend zmdi-badge-check"></i>
    `;
    const guest =`
    <p>Only Guest</p>
    `;
      // check readfriend if (friend = true ) => icon if false => only guest
        if (doc.data().friend){
            accountDetails.innerHTML = realFriend + html;
        }else {
            accountDetails.innerHTML = guest + html;
        };
   
      //Notification Verify
    const verify = `
    <div class="jumbotron">
    <h1 class="display-4">Almost done...</h1>
    <p class="lead">Please verify your email address.</p>
    <hr class="my-4">
    <p class="lead">
      <a onclick="getEmailVerification()" class="btn btn-danger btn-sm" href="#" role="button">SEND VERIFICATION EMAIL</a>
      <p class="notify-result"></p>
    </p>
  </div>
    `;
    // Check verify email address
    console.log("Verify: ", user.emailVerified);
   
    if (user.emailVerified) {
      notiVerification.innerHTML = '';
    } else {
      notiVerification.innerHTML = verify;
    };



    //accountDetails.innerHTML = html ;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};
// setup guides
const setupGuides = (data) => {

  if (data.length) {
  let html = '';
  data.forEach(doc => {
    const guide = doc.data();
    const li = `
      <li>
        <div> ${guide.title} </div>
        <div> ${guide.content} </div>
      </li>
    `;
    html += li;
  });
  guideList.innerHTML = html;
} else {
  guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
}

};

$('.loginAgain').on('click',function() {
  $('#modalSignIn').modal('show');
  $('#modalLogout').modal('hide');
});