// Import Firebase modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"; 
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebasedatabase.js"; 

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
const database = getDatabase(app); 
 
// DOM elements 
const feedbackForm = document.getElementById('feedbackForm'); 
 
// Submit form 
feedbackForm.addEventListener('submit', (e) => { 
    e.preventDefault(); // Prevent page reload 
 
    // Get form values 
    const name = document.getElementById('name').value; 
    const email = document.getElementById('email').value; 
    const rating = document.getElementById('rating').value; 
    const message = document.getElementById('message').value; 
 
    // Save to Firebase 
    push(ref(database, 'feedback'), { name, email, rating, message }) 
        .then(() => { 
            // Show success alert 
            alert("Thank you for your feedback!"); 
            // Clear form 
            feedbackForm.reset(); 
        }) 
        .catch((error) => { 
            // Show error alert 
            alert("Error submitting feedback: " + error.message); 
        }); 
}); 
