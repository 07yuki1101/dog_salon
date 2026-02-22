import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB01-MWSZl4Us-XUyXEfeLQjgxUHEUtpQM",
  authDomain: "training-log-app-d219c.firebaseapp.com",
  projectId: "training-log-app-d219c",
  storageBucket: "training-log-app-d219c.firebasestorage.app",
  messagingSenderId: "962315651869",
  appId: "1:962315651869:web:9ed712ea04a815d3d6eff4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById("reserve-form");
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  await addDoc(collection(db, 'reservations'), {
    name: formData.get('name'),
    dogType: formData.get('dog-type'),
    menu: formData.get('menu'),
    date: formData.get('date'),
    time: formData.get('time'),
    status: '予約中',
    createdAt: serverTimestamp()
  });
  alert('予約が送信されました！')
  form.reset();
});

const menuSelect = document.getElementById('menu');

const loadService = async()=>{
  const q = query(
    collection(db,'services'),
    where('status','==','公開中')
  );
  const snapshot = await getDocs(q);
  snapshot.forEach(doc=>{
    const data = doc.data();
    const option = document.createElement('option');
    option.value = doc.id;
    option.textContent = data.name;

    menuSelect.appendChild(option);
  });
};
loadService();