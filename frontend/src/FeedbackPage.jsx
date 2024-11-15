import React, { useState } from 'react';
import axios from 'axios';
import './styles/FeedbackPage.css'; // Import external CSS for styling

function FeedbackPage() {
  const [rating, setRating] = useState('');
  const [comments, setComments] = useState('');
  const [patientId, setPatientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      rating,
      comments,
      patient_id: patientId,
      professional_id: professionalId,
      appointment_id: appointmentId,
    };

    try {
      const response = await axios.post('http://localhost:8081/feedback', feedbackData);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      // Clear form fields after successful submission
      setRating('');
      setComments('');
      setPatientId('');
      setProfessionalId('');
      setAppointmentId('');
    } catch (error) {
      setErrorMessage(error.response ? error.response.data.error : 'An error occurred');
      setSuccessMessage('');
    }
  };

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Submit Your Feedback</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Rating:</label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="1"
            max="5"
            required
            className="input-field"
          />
        </div>
        
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Patient ID:</label>
          <input
            type="text"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Professional ID:</label>
          <input
            type="text"
            value={professionalId}
            onChange={(e) => setProfessionalId(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Appointment ID:</label>
          <input
            type="text"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
}

export default FeedbackPage;
