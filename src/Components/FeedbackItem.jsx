// src/components/FeedbackItem.jsx
import React, { useState } from "react";
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../firebaseConfig";

const FeedbackItem = ({ item, setEditing }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this feedback?")) return;
    setDeleting(true);
    try {
      await deleteDoc(doc(db, "feedbacks", item.id));
    } catch (err) {
      console.error(err);
      alert("Unable to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="feedback-item">
      <div className="feedback-meta">
        <div className="rating">{item.rating} ★</div>
        <div className="name">{item.name || "Anonymous"}</div>
        <div className="time">{item.createdAt?.toDate ? item.createdAt.toDate().toLocaleString() : ""}</div>
      </div>

      <div className="feedback-message">
        {item.message}
      </div>

      <div className="feedback-actions">
        <button onClick={() => setEditing(item)}>Edit</button>
        <button onClick={handleDelete} disabled={deleting} className="danger">
          {deleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default FeedbackItem;
