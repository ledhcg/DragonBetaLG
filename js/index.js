
// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
    const html = `
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
    

    const verify = `
    <div>Please verify your email address.</div>
    `;
    // Check verify email address
    console.log("Verify: ", user.emailVerified);
    if (user.emailVerified) { 
        if (doc.data().friend){
            accountDetails.innerHTML = realFriend + html;
        }else {
            accountDetails.innerHTML = guest + html;
        }
    } else {
        if (doc.data().friend){
            accountDetails.innerHTML = verify + realFriend + html;
        }else {
            accountDetails.innerHTML = verify + guest + html;
        }
    }
    



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