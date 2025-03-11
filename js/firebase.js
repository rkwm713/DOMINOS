// Firebase configuration
const firebaseConfig = {
  // Use a demo Firebase project configuration
  // In a real application, you would use your own Firebase project configuration
  apiKey: "AIzaSyDemoKey123456789",
  authDomain: "permit-tracker-demo.firebaseapp.com",
  databaseURL: "https://permit-tracker-demo-default-rtdb.firebaseio.com",
  projectId: "permit-tracker-demo",
  storageBucket: "permit-tracker-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
const database = firebase.database();
const permitsRef = database.ref('permits');

// Firebase error handling
function handleFirebaseError(error) {
  console.error('Firebase Error:', error);
  alert(`Error: ${error.message}`);
}

// Firebase real-time synchronization status
let isOnline = true;

// Listen for online/offline status changes
database.ref('.info/connected').on('value', (snapshot) => {
  isOnline = snapshot.val();
  
  if (isOnline) {
    console.log('Connected to Firebase');
    document.querySelector('.loading').style.display = 'none';
  } else {
    console.log('Disconnected from Firebase');
    document.querySelector('.loading').textContent = 'Offline: Reconnecting...';
    document.querySelector('.loading').style.display = 'block';
  }
});

// Note: In a real application, you would set up Firebase properly
// and replace this demo configuration with your actual Firebase project
// configuration from the Firebase console.
// 
// Alternatively, if no backend is available, you can modify this file
// to use localStorage for data persistence.
