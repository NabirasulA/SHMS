import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom
import './styles/UpcomingAppointments.css'; // Import the CSS file for styling

function UpcomingAppointmentsPatient() {
    const { patientId } = useParams(); // Get patientId from the URL parameters
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (patientId) {
            axios
                .get(`http://localhost:8081/api/upcoming-appointments/${patientId}`)
                .then((res) => {
                    setAppointments(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Error fetching upcoming appointments.');
                    setLoading(false);
                    console.error('Error fetching upcoming appointments:', err);
                });
        }
    }, [patientId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading indicator while data is being fetched
    }

    if (error) {
        return <div>{error}</div>; // Display error message if something goes wrong
    }

    return (
        <div className="appointments-Box">
            <h2>Upcoming Appointments</h2>
            {appointments.length === 0 ? (
                <p>No upcoming appointments found.</p> // Show message when no appointments are found
            ) : (
                <table className="appointments-appointmentTable">
                    <thead>
                        <tr>
                            <th>Appointment ID</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Doctor Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.appointment_id}>
                                <td>{appointment.appointment_id}</td>
                                <td>{new Date(appointment.appointment_date).toLocaleDateString()}</td>
                                <td>{appointment.status}</td>
                                <td>{appointment.doctor_name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default UpcomingAppointmentsPatient;
