import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
    import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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
