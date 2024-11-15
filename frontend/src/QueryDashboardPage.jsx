import React, { useState, useEffect } from 'react';
import './styles/QueryDashboardPage.css';

function QueryDashboardPage() {
    const [joinData, setJoinData] = useState([]);
    const [aggregateData, setAggregateData] = useState([]);
    const [nestedData, setNestedData] = useState([]);
    const [error, setError] = useState('');

    // Fetch data for join query
    const fetchJoinData = () => {
        fetch('http://localhost:8081/api/join-query')
            .then((response) => response.json())
            .then((data) => setJoinData(data))
            .catch(() => setError('Error fetching join data'));
    };

    // Fetch data for aggregate query
    const fetchAggregateData = () => {
        fetch('http://localhost:8081/api/aggregate-query')
            .then((response) => response.json())
            .then((data) => setAggregateData(data))
            .catch(() => setError('Error fetching aggregate data'));
    };

    // Fetch data for nested query (healthcare professionals with high ratings)
    const fetchNestedData = () => {
        fetch('http://localhost:8081/api/nested-query')
            .then((response) => response.json())
            .then((data) => setNestedData(data))
            .catch(() => setError('Error fetching nested data'));
    };

    // Run fetch functions on initial render
    useEffect(() => {
        fetchJoinData();
        fetchAggregateData();
        fetchNestedData();
    }, []);

    return (
        <div className="query-dashboard-container">
            <h1 className="dashboard-title">Query Dashboard</h1>
            {error && <p className="error-message">{error}</p>}

            {/* Join Query Results */}
            <section className="query-section">
                <h2 className="section-title">Join Query Results</h2>
                <div className="query-card">
                    <ul>
                        {joinData.length > 0 ? (
                            joinData.map((item, index) => (
                                <li key={index} className="query-item">
                                    {item.patient_name} - {new Date(item.appointment_date).toLocaleDateString()} - {item.status}
                                </li>
                            ))
                        ) : (
                            <p>No data available.</p>
                        )}
                    </ul>
                </div>
            </section>

            {/* Aggregate Query Results */}
            <section className="query-section">
                <h2 className="section-title">Aggregate Query Results</h2>
                <div className="query-card">
                    <ul>
                        {aggregateData.length > 0 ? (
                            aggregateData.map((item, index) => (
                                <li key={index} className="query-item">
                                    {item.healthcare_professional_name} - Appointments: {item.appointment_count}
                                </li>
                            ))
                        ) : (
                            <p>No data available.</p>
                        )}
                    </ul>
                </div>
            </section>

            {/* Nested Query Results for Healthcare Professionals with High Ratings */}
            <section className="query-section">
                <h2 className="section-title">Nested Query Results</h2>
                <div className="query-card">
                    <ul>
                        {nestedData.length > 0 ? (
                            nestedData.map((item, index) => (
                                <li key={index} className="query-item">
                                    {item.name} - Professional ID: {item.professional_id}
                                </li>
                            ))
                        ) : (
                            <p>No data available.</p>
                        )}
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default QueryDashboardPage;
