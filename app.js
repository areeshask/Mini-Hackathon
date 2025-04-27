// Import Firebase modules 
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js"; 
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/11.4.0/firebasedatabase.js"; 
 
// Firebase configuration 
const firebaseConfig = { 
  apiKey: "AIzaSyAhsN00tKhh1uAyo2TstI9tpGD_y-qvMP8", 
  authDomain: "fir-database-cca32.firebaseapp.com", 
  projectId: "fir-database-cca32", 
  storageBucket: "fir-database-cca32.firebasestorage.app", 
  messagingSenderId: "327223621970", 
  appId: "1:327223621970:web:dff822ee3e47b956c9e28b", 
  measurementId: "G-CHR22VXN96" 
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