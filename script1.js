import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsCdI05k_NpIkNpYbOfu9LLW_c2TNDvn4",
  authDomain: "hackathon-27902.firebaseapp.com",
  projectId: "hackathon-27902",
  storageBucket: "hackathon-27902.firebasestorage.app",
  messagingSenderId: "866556674602",
  appId: "1:866556674602:web:e9237d4989bb6e34d17953",
  measurementId: "G-5D1287756S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const createTaskBtn = document.getElementById('create-task-btn');
const taskModal = document.getElementById('task-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const saveTaskBtn = document.getElementById('save-task-btn');
const todoColumn = document.getElementById('todo-tasks');
const inProgressColumn = document.getElementById('in-progress-tasks');
const doneColumn = document.getElementById('done-tasks');

let currentEditId = null;

// Open modal for creating task
createTaskBtn.addEventListener('click', () => {
  currentEditId = null;
  clearModalInputs();
  taskModal.style.display = 'flex';
});

// Close modal
closeModalBtn.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

// Save task (Create or Update)
saveTaskBtn.addEventListener('click', async () => {
  const title = document.getElementById('task-title').value.trim();
  const description = document.getElementById('task-description').value.trim();
  const assignedTo = document.getElementById('task-assigned').value.trim();

  if (!title) {
    alert('Task Title is required!');
    return;
  }

  try {
    if (currentEditId) {
      const taskRef = doc(db, "tasks", currentEditId);
      await updateDoc(taskRef, {
        title,
        description,
        assignedTo
      });
      console.log("Task updated:", currentEditId);
    } else {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        assignedTo,
        status: "To Do",
      });
      console.log("Task created.");
    }

    taskModal.style.display = 'none';
    loadTasks();
  } catch (e) {
    console.error("Error saving task: ", e);
  }
});

// Load all tasks
async function loadTasks() {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  todoColumn.innerHTML = '';
  inProgressColumn.innerHTML = '';
  doneColumn.innerHTML = '';

  querySnapshot.forEach(docSnap => {
    const task = docSnap.data();
    const taskCard = createTaskCard(task, docSnap.id);
    if (task.status === 'To Do') {
      todoColumn.appendChild(taskCard);
    } else if (task.status === 'In Progress') {
      inProgressColumn.appendChild(taskCard);
    } else {
      doneColumn.appendChild(taskCard);
    }
  });
}

// Create task card (with conditional buttons)
function createTaskCard(task, id) {
  const card = document.createElement('div');
  card.classList.add('task-card');

  const title = document.createElement('h4');
  title.textContent = task.title;

  const description = document.createElement('p');
  description.textContent = task.description;

  const assigned = document.createElement('p');
  assigned.textContent = Assigned to: ${task.assignedTo};

  // Buttons
  if (task.status === 'To Do') {
    const moveToInProgressBtn = document.createElement('button');
    moveToInProgressBtn.textContent = 'Move to In Progress';
    moveToInProgressBtn.addEventListener('click', () => moveTask(id, 'In Progress'));
    card.appendChild(moveToInProgressBtn);
  }

  if (task.status === 'To Do' || task.status === 'In Progress') {
    const moveToDoneBtn = document.createElement('button');
    moveToDoneBtn.textContent = 'Move to Done';
    moveToDoneBtn.addEventListener('click', () => moveTask(id, 'Done'));
    card.appendChild(moveToDoneBtn);
  }

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.style.backgroundColor = '#f39c12';
  editBtn.addEventListener('click', () => openEditModal(id, task));

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.style.backgroundColor = '#e74c3c';
  deleteBtn.addEventListener('click', () => deleteTask(id));

  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(assigned);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);

  return card;
}

// Move task
async function moveTask(id, newStatus) {
  try {
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, { status: newStatus });
    loadTasks();
  } catch (e) {
    console.error("Error moving task: ", e);
  }
}

// Delete task
async function deleteTask(id) {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteDoc(doc(db, "tasks", id));
      console.log("Task deleted:", id);
      loadTasks();
    } catch (e) {
      console.error("Error deleting task: ", e);
    }
  }
}

// Open Edit Modal
function openEditModal(id, task) {
  currentEditId = id;
  document.getElementById('task-title').value = task.title;
  document.getElementById('task-description').value = task.description;
  document.getElementById('task-assigned').value = task.assignedTo;
  taskModal.style.display = 'flex';
}

// Clear modal inputs
function clearModalInputs() {
  document.getElementById('task-title').value = '';
  document.getElementById('task-description').value = '';
  document.getElementById('task-assigned').value = '';
}

// Initial load
loadTasks();
