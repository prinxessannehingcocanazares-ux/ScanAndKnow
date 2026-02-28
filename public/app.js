// 🔥 Firebase ES Module Setup
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBAG2Hr3l39IUWMZb9J6VoJmAgHqo1quLM",
  authDomain: "scanandknow-14d98.firebaseapp.com",
  projectId: "scanandknow-14d98",
  storageBucket: "scanandknow-14d98.appspot.com",
  messagingSenderId: "572867739400",
  appId: "1:572867739400:web:72fe1a6981418ca6fd76bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// ==================== SIGN UP ====================
export async function registerTeacher(fullName, email, contact, department, position, password, confirm) {
  if (!fullName || !email || !contact || !department || !position || !password || !confirm) {
    alert("Please fill all fields");
    return;
  }
  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "teachers", cred.user.uid), {
      fullName,
      email,
      contact,
      department,
      position,
      createdAt: new Date()
    });
    alert("Account created successfully!");
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Signup Error: " + error.message);
  }
}

// ==================== LOGIN ====================
export async function loginUser(email, password) {
  if (!email || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Login Error: " + error.message);
  }
}

// ==================== LOGOUT ====================
export async function logoutUser() {
  await signOut(auth);
  window.location.href = "index.html";
}

// ==================== AUTH STATE ====================
export function onAuthChange(callback) {
  onAuthStateChanged(auth, callback);
}

// ==================== DASHBOARD / PROFILE ====================
export async function loadProfile(mainContent) {
  const user = auth.currentUser;
  if (!user) return;
  const snap = await getDoc(doc(db, "teachers", user.uid));
  const data = snap.data();

  mainContent.innerHTML = `
    <h1>Profile</h1>
    <p><b>Name:</b> ${data.fullName}</p>
    <p><b>Email:</b> ${data.email}</p>
    <p><b>Contact:</b> ${data.contact}</p>
    <p><b>Department:</b> ${data.department}</p>
    <p><b>Position:</b> ${data.position}</p>
  `;
}

export function loadDashboard(mainContent) {
  mainContent.innerHTML = `
    <h1>Dashboard</h1>
    <table>
      <thead>
        <tr>
          <th>Section</th>
          <th>Room</th>
          <th>Time In</th>
          <th>Time Out</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>---</td>
          <td>Available</td>
        </tr>
      </tbody>
    </table>
  `;
}