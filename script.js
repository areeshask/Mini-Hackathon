import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js"; 
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut,signInWithPopup,GoogleAuthProvider, onAuthStateChanged,} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js"; 
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js"; 

const firebaseConfig = {
  apiKey: "AIzaSyCsCdI05k_NpIkNpYbOfu9LLW_c2TNDvn4",
  authDomain: "hackathon-27902.firebaseapp.com",
  databaseURL: "https://hackathon-27902-default-rtdb.firebaseio.com",
  projectId: "hackathon-27902",
  storageBucket: "hackathon-27902.firebasestorage.app",
  messagingSenderId: "866556674602",
  appId: "1:866556674602:web:e9237d4989bb6e34d17953",
  measurementId: "G-5D1287756S"
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
