// 🔥 FIREBASE SETUP
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
const auth = getAuth(app);
const db = getFirestore(app);

// ==================== SIGN UP ====================
window.registerTeacher = async () => {
  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const contact = document.getElementById("contact").value;
  const department = document.getElementById("department").value;
  const position = document.getElementById("position").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

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
};

// ==================== LOGIN ====================
window.loginBtn = async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

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
};

// ==================== DASHBOARD / PROFILE ====================
const mainContent = document.getElementById("main-content");

onAuthStateChanged(auth, async (user) => {
  if (!user) return; // Logged out, dashboard.html will handle redirect
  if (mainContent) loadDashboard(); // only if on dashboard.html
});

// LOGOUT
window.logoutUser = async () => {
  await signOut(auth);
  window.location.href = "login.html";
};

// LOAD DASHBOARD TABLE
window.loadDashboard = () => {
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
};

// LOAD TEACHER PROFILE
window.loadProfile = async () => {
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
};

// Other sections placeholders
window.loadSection = () => mainContent.innerHTML = `<h1>Sections</h1><p>No section assigned yet.</p>`;
window.loadRooms = () => mainContent.innerHTML = `<h1>Rooms</h1><p>Room list will appear here.</p>`;
window.loadAttendance = () => mainContent.innerHTML = `<h1>Attendance</h1><p>Calendar attendance coming soon.</p>`;
window.loadQR = () => mainContent.innerHTML = `<h1>QR Scanner</h1><p>QR Scanner feature here.</p>`;
