// src/components/FeedbackForm.jsx
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const FeedbackForm = ({ editing, setEditing }) => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // If editing an existing feedback, load its data into the form
  useEffect(() => {
    if (editing) {
      setName(editing.name || "");
      setRating(editing.rating || 5);
      setMessage(editing.message || "");
    }
  }, [editing]);

  // Reset the form to initial state
  const resetForm = () => {
    setName("");
    setRating(5);
    setMessage("");
    setLoading(false);
    setEditing(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      alert("Please enter a feedback message");
      return;
    }

    setLoading(true);

    try {
      if (editing && editing.id) {
        // Update existing feedback
        const ref = doc(db, "feedbacks", editing.id);
        await updateDoc(ref, {
          name,
          rating: Number(rating),
          message,
          updatedAt: serverTimestamp(),
        });
      } else {
        // Add new feedback
        await addDoc(collection(db, "feedbacks"), {
          name,
          rating: Number(rating),
          message,
          createdAt: serverTimestamp(),
        });
        console.log("new feedback added");      }

      resetForm();
      alert("Feedback saved successfully!");
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <h2>{editing ? "Edit Feedback" : "Leave Feedback"}</h2>

      {/* Name Field */}
      <label>
        Name (optional)
        <input id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />
      </label>

      {/* Rating Field */}
      <label>
        Rating
        <select id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>
              {r} ★
            </option>
          ))}
        </select>
      </label>

      {/* Message Field */}
      <label>
        Message
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          placeholder="Write your feedback..."
        />
      </label>

      {/* Buttons */}
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : editing ? "Update" : "Submit"}
        </button>

        {editing && (
          <button
            type="button"
            className="btn-cancel"
            onClick={() => setEditing(null)}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default FeedbackForm;
