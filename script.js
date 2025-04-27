import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js"; 

const firebaseConfig = {
    apiKey: "AIzaSyBNIUk5SLHuRjd8adp-vkpMnuKlsPmqj7w",
    authDomain: "sign-up-login-form-cc6ff.firebaseapp.com",
    databaseURL: "https://sign-up-login-form-cc6ff-default-rtdb.firebaseio.com",
    projectId: "sign-up-login-form-cc6ff",
    storageBucket: "sign-up-login-form-cc6ff.firebasestorage.app",
    messagingSenderId: "913552980541",
    appId: "1:913552980541:web:6a67328d1ecf559b934854",
    measurementId: "G-9FXZ80M8QV"
  };
 
// Initialize Firebase 
const app = initializeApp(firebaseConfig); 
const analytics = getAnalytics(app); 
const auth = getAuth(app); 
const provider = new GoogleAuthProvider(); 
 
// Sign Up with Email/Password 
document.getElementById("signup-btn")?.addEventListener("click", () => { 
  const email = document.getElementById("signup-email").value; 
  const password = document.getElementById("signup-password").value; 
 
  createUserWithEmailAndPassword(auth, email, password) 
    .then(() => { 
      alert("Sign Up Successful!"); 
      window.location.href = "welcome.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Login with Email/Password 
document.getElementById("login-btn")?.addEventListener("click", () => { 
  const email = document.getElementById("login-email").value; 
  const password = document.getElementById("login-password").value; 
 
  signInWithEmailAndPassword(auth, email, password) 
    .then(() => { 
      alert("Login Successful!"); 
      window.location.href = "welcome.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Continue with Google 
document.getElementById("google-btn")?.addEventListener("click", () => { 
  signInWithPopup(auth, provider) 
    .then(() => { 
      alert("Login Successful!"); 
      window.location.href = "welcome.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Logout 
document.getElementById("logout-btn")?.addEventListener("click", () => { 
  signOut(auth) 
    .then(() => { 
      alert("Logged Out Successfully!"); 
      window.location.href = "signup.html"; 
    }) 
    .catch((error) => { 
      alert(error.message); 
    }); 
}); 
 
// Show User Email on Welcome Page 
onAuthStateChanged(auth, (user) => { 
  if (user && window.location.pathname.includes("welcome.html")) { 
    document.getElementById("user-email").textContent = user.email; 
  } else if (!user && window.location.pathname.includes("welcome.html")) { 
    window.location.href = "signup.html"; 
  } 
}); 