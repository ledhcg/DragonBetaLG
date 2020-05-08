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
  firebase.analytics();

    
    const auth = firebase.auth();
    
    
    function signUp(){
      
      var email = document.getElementById("email");
      var password = document.getElementById("pass");
      
      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
      
      alert("Signed Up");
      function Redirect() {
        window.location="http://blog.dinhcuong.me";
     }
     
     document.write("You will be redirected to main page in 10 sec.");
     setTimeout('Redirect()', 10000);
    }
    
    
    
    function signIn(){
      
      var email = document.getElementById("your_email");
      var password = document.getElementById("your_pass");
      
      const promise = auth.signInWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
      
      
      
      
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
        window.location="https://blog.dinhcuong.me";
  
        //is signed in
        
      }else{
        
        alert("No Active User");
        //no user is signed in
      }
      
      
      
    });
    
  