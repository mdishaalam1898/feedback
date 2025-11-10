// src/components/FeedbackList.jsx
import React from "react";
import FeedbackItem from "./FeedbackItem";

const FeedbackList = ({ feedbacks, setEditing }) => {
  if (!feedbacks || feedbacks.length === 0) {
    return <p className="no-feedback">No feedback yet — be the first!</p>;
  }

  return (
    <div className="feedback-list">
      {feedbacks.map((f) => (
        <FeedbackItem key={f.id} item={f} setEditing={setEditing} />
      ))}
    </div>
  );
};

export default FeedbackList;
