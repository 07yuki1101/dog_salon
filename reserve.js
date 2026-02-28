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

  const name = formData.get('name');
  const phone = formData.get('phone');
  const dogType = formData.get('dog-type');
  const menu = formData.get('menu');
  const date = formData.get('date');
  const time = formData.get('time');


  try{
    const q = query(
      collection(db,'customers'),
      where('phone', '==',phone)
    );
    const snapshot = await getDocs(q);
    let customerId;

    if(!snapshot.empty){
      customerId = snapshot.docs[0].id;
    }else{
      const newCustomer = await addDoc(collection(db,'customers'),{
        name,
        phone,
        dogType,
        createdAt:serverTimestamp()
      });
      customerId = newCustomer.id;
    }
    await addDoc(collection(db, 'reservations'), {
    customerId,
    menu,
    date,
    time,
    status: '予約中',
    createdAt: serverTimestamp()
  });
  alert('予約が送信されました！')
  form.reset();
  }catch(error){
    console.error(error);
    alert('エラーが発生しました')
  }
  
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