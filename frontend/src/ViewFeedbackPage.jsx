import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/ViewFeedbackPage.css'; // Import the CSS for styling

const ViewFeedbackPage = () => {
  const { appointment_id } = useParams(); // Get appointment ID from URL
  const [feedback, setFeedback] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if appointment_id is valid
    if (!appointment_id) {
      setError('Invalid appointment ID.');
      return;
    }

    // Fetch feedback from backend
    axios.get(`http://localhost:8081/feedback/${appointment_id}`)
      .then(response => {
        if (response.data) {
          setFeedback(response.data);
          setError(null);
        } else {
          setError('No feedback found for this appointment');
        }
      })
      .catch(err => {
        console.error('Error fetching feedback:', err);
        setError('No feedback found for this appointment');
      });
  }, [appointment_id]);

  return (
    <div className="feedback-container">
      <h2>Feedback for Appointment ID: {appointment_id}</h2>
      {error && <p style={{ color: '#d32f2f', fontSize: '18px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', backgroundColor: '#ffebee', padding: '10px', borderRadius: '5px', border: '1px solid #d32f2f' }} className="error-message">{error}</p>}
      {feedback ? (
        <div className="feedback-details">
          <p><strong>Rating:</strong> {feedback.rating}</p>
          <p><strong>Comments:</strong> {feedback.comments}</p>
        </div>
      ) : (
        !error && <p className="loading-message">Loading feedback...</p>
      )}
    </div>
  );
};

export default ViewFeedbackPage;
