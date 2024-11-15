import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './styles/UpcomingAppointments.css';

const UpcomingAppointmentsProfessional = () => {
  const { professionalId } = useParams(); // Access the `professionalId` from the URL
  console.log(professionalId); 
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch appointments when the component mounts or professionalId changes
  useEffect(() => {
    if (professionalId) {  // Ensure professionalId is available before making the request
      axios.get(`http://localhost:8081/api/professional-upcoming-appointments/${professionalId}`)
        .then(response => {
          setAppointments(response.data); // Update the state with the fetched appointments
          setLoading(false); // Set loading to false once data is fetched
        })
        .catch((error) => {
          console.error('API error:', error.response || error); // Log the detailed error
          setError('Error fetching upcoming appointments');
          setLoading(false); // Set loading to false even if there's an error
        });
    } else {
      setError('Professional ID is missing');
      setLoading(false);
    }
  }, [professionalId]);

  if (loading) {
    return <div>Loading...</div>; // Show loading text while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue fetching data
  }

  return (
    <div className="appointments-Box">
      <h2>Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p>No upcoming appointments found.</p> // Display message if no appointments exist
      ) : (
        <table className="appointments-appointmentTable">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.appointment_id}>
                <td>{appointment.patient_name}</td>
                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                <td>{appointment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );  
};

export default UpcomingAppointmentsProfessional;
