
  var firebaseConfig = {
    apiKey: "AIzaSyB-UBz6aYZW1tn5JOD8H1W-jiiRxBOhqAY",
    authDomain: "dinhcuong-users.firebaseapp.com",
    databaseURL: "https://dinhcuong-users.firebaseio.com",
    projectId: "dinhcuong-users",
    storageBucket: "dinhcuong-users.appspot.com",
    messagingSenderId: "818165810364",
    appId: "1:818165810364:web:4783b8c064767425d0fcb9",
    measurementId: "G-T5FMBS7VDX"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    
    const auth = firebase.auth();
      function Redirect() {
          window.location="http://blog.dinhcuong.me";
       }
    function signUp(){
  
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        var rePass = document.getElementById("re_pass").value;
    
          if (password == ""){
              document.getElementById("messagePass").innerHTML="Please enter your password";
              document.write("Please enter your password");
              return false;
          } else
          if (password.length < 6){
              document.getElementById("messagePass").innerHTML="Your password must be longer than 6 characters"; 
              return false;
          } else
          if (password.length > 25){
              document.getElementById("messagePass").innerHTML="Your password must be less than 25 characters";
              return false;
          } else
  
          if (password != rePass){
              document.getElementById("messageRePass").innerHTML="Repeat password is not same as your password";
              return false;
          } else {
            const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));
        
        alert("Signed Up");
        
        document.write("You will be redirected to main page in 10 sec.");
       setTimeout('Redirect()', 10000);
       
          }
        }
        
       
       
       
       
       
       function signIn(){
        
        var email = document.getElementById("email");
        var password = document.getElementById("password");
        
        const promise = auth.signInWithEmailAndPassword(email.value, password.value);
        promise.catch(e => alert(e.message));
        
        document.write("You will be redirected to main page in 10 sec.");
       setTimeout('Redirect()', 10000);
        
        
       }
       
       
       function signOut(){
        
        auth.signOut();
        alert("Signed Out");
        
       }
       
       
       
       auth.onAuthStateChanged(function(user){
        
        if(user){
         
         var email = user.email;
         alert("Active User " + email);
         
         //Take user to a different or home page
      
         //is signed in
         
        }else{
         
         alert("No Active User");
         //no user is signed in
        }
        
        
        
       });
  