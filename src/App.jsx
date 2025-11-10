// src/App.jsx
import React, { useState, useEffect } from "react";
import FeedbackForm from "./Components/FeedbackForm"
import FeedbackList from "./Components/FeedbackList"
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import {db} from "./firebaseConfig"
import "./App.css";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editing, setEditing] = useState(null); // { id, data } or null

  useEffect(() => {
    const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setFeedbacks(items);
    });

    return () => unsub();
  }, []);

  const averageRating = () => {
    if (feedbacks.length === 0) return 0;
    const sum = feedbacks.reduce((s, f) => s + (f.rating || 0), 0);
    return (sum / feedbacks.length).toFixed(1);
  };

  return (
    <div className="app">
      <header>
        <h1>Feedback App</h1>
        <p className="subtitle">Average Rating: <strong>{averageRating()}</strong> / 5 ({feedbacks.length})</p>
      </header>

      <main>
        <FeedbackForm editing={editing} setEditing={setEditing} />
        <FeedbackList feedbacks={feedbacks} setEditing={setEditing} />
      </main>
    </div>
  );
}

export default App;
