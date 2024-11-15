import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/BookAppointmentPage.css'; // Import external CSS for styling

function BookAppointmentPage() {
    const [professionals, setProfessionals] = useState([]);
    const [selectedProfessional, setSelectedProfessional] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [appointmentTime, setAppointmentTime] = useState("");
    const [patientId, setPatientId] = useState("");

    useEffect(() => {
        axios.get('http://localhost:8081/healthcare-professionals')
            .then((res) => setProfessionals(res.data))
            .catch((err) => console.error("Error fetching professionals:", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newAppointment = {
            appointment_date: appointmentDate,
            appointment_time: appointmentTime,
            patient_id: patientId,
            professional_id: selectedProfessional,
        };

        axios.post('http://localhost:8081/appointments', newAppointment)
            .then((res) => {
                alert("Appointment booked successfully!");
                setSelectedProfessional("");
                setAppointmentDate("");
                setAppointmentTime("");
                setPatientId("");
            })
            .catch((err) => {
                console.error("Error adding appointment:", err);
                alert("Failed to book appointment.");
            });
    };

    return (
        <div className="container">
            <h2 className="title">Book Your Appointment</h2>
            <form className="appointment-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="professional">Select Healthcare Professional:</label>
                    <select
                        id="professional"
                        value={selectedProfessional}
                        onChange={(e) => setSelectedProfessional(e.target.value)}
                        required
                    >
                        <option value="">--Select a professional--</option>
                        {professionals.map((prof) => (
                            <option key={prof.professional_id} value={prof.professional_id}>
                                {prof.name} - {prof.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="date">Appointment Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="time">Appointment Time:</label>
                    <input
                        type="time"
                        id="time"
                        value={appointmentTime}
                        onChange={(e) => setAppointmentTime(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="patient">Patient ID:</label>
                    <input
                        type="number"
                        id="patient"
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        required
                    />
                </div>

                <button className="submit-btn" type="submit">Book Appointment</button>
            </form>

            <p className="link-text">
                <Link to="/appointments">View Your Appointments</Link>
            </p>
        </div>
    );
}

export default BookAppointmentPage;
