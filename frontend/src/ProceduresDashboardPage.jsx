import React, { useState, useEffect } from 'react';
import './styles/ProceduresDashboardPage.css';

function ProceduresDashboardPage() {
    const [upcomingAppointments, setUpcomingAppointments] = useState([]);
    const [averageFeedback, setAverageFeedback] = useState(null);
    const [error, setError] = useState('');
    const [professionalId, setProfessionalId] = useState(1); // Default value, can be changed dynamically
    const [patientId, setPatientId] = useState(1); // Default value, can be changed dynamically

    const fetchUpcomingAppointments = (patientId) => {
        fetch(`http://localhost:8081/api/upcoming-appointments?patientId=${patientId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching upcoming appointments');
                }
                return response.json();
            })
            .then(data => {
                console.log("Upcoming appointments data:", data);
                setUpcomingAppointments(data);
            })
            .catch((error) => {
                console.error("Error fetching upcoming appointments:", error);
            });
    };

    useEffect(() => {
        fetchUpcomingAppointments(patientId); // Fetch upcoming appointments when the component mounts or patientId changes
    }, [patientId]);

    const fetchAverageFeedback = (professionalId) => {
        fetch(`http://localhost:8081/api/average-feedback/${professionalId}`) // Use the dynamic professionalId
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching average feedback');
                }
                return response.json();
            })
            .then(data => {
                console.log("Average feedback data:", data);
                setAverageFeedback(data.avg_feedback); // Use the correct field
            })
            .catch((error) => {
                console.error("Error fetching average feedback:", error);
            });
    };

    useEffect(() => {
        fetchAverageFeedback(professionalId); // Fetch feedback when the professionalId changes
    }, [professionalId]);

    const handleProfessionalIdChange = (e) => {
        const newId = e.target.value;
        setProfessionalId(newId); // Update professionalId state with user input
    };

    const handlePatientIdChange = (e) => {
        const newId = e.target.value;
        setPatientId(newId); // Update patientId state with user input
    };

    return (
        <div className="procedures-dashboard-container">
            <header>
                <h1>Stored Procedures and Functions Dashboard</h1>
            </header>
            {error && <p className="error-message">{error}</p>}

            <h2>Upcoming Appointments</h2>
            {/* Input field for patient ID */}
            <section>
                <h2 style={{ color: '#00B7EB' }}>Enter Patient ID</h2>
                <input
                    type="number"
                    value={patientId}
                    onChange={handlePatientIdChange}
                    placeholder="Enter patient ID"
                    style={{ marginBottom: '20px', padding: '5px' }}
                />
            </section>

            {/* Upcoming Appointments Section */}
            <section>
                <ul>
                    {upcomingAppointments.length > 0 ? (
                        upcomingAppointments.map((appointment, index) => (
                            <li key={index} style={{ listStyle: 'none', padding: 0, textAlign: 'center' }}>
                                {new Date(appointment.appointment_date).toLocaleDateString()}
                            </li>
                        ))
                    ) : (
                        <p>No upcoming appointments available.</p>
                    )}
                </ul>
            </section>

            {/* Average Feedback Section */}
            <section>
                <h2>Average Feedback Score</h2>
                <h2 style={{ color: '#00B7EB' }}>Enter Professional ID</h2>
                <input
                    type="number"
                    value={professionalId}
                    onChange={handleProfessionalIdChange}
                    placeholder="Enter professional ID"
                    style={{ marginBottom: '20px', padding: '5px' }}
                />
                <p style={{ textAlign: 'center', marginTop: '20px' }}>
                    {averageFeedback !== null ? `Average Score: ${averageFeedback}` : 'Loading...'}
                </p>
            </section>
        </div>
    );
}

export default ProceduresDashboardPage;
