// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const pledgesRef = db.collection("pledges");

document.getElementById("pledgeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const pledge = document.getElementById("pledge").value.trim();
  if (pledge !== "") {
    pledgesRef.add({
      name: name || "Anonymous",
      text: pledge,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      document.getElementById("pledgeForm").reset();
    });
  }
});

pledgesRef.orderBy("timestamp", "desc").onSnapshot(snapshot => {
  const pledgeList = document.getElementById("pledgeList");
  pledgeList.innerHTML = "";
  snapshot.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.className = "pledge";
    div.innerHTML = `<strong>${data.name}</strong><br>${data.text}`;
    pledgeList.appendChild(div);
  });
});
