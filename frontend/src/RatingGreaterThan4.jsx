import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/RatingGreaterThan4.css'; // Optional CSS styling

function RatingGreaterThan4() {
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the list of healthcare professionals with average rating > 4
    axios
      .get('http://localhost:8081/api/nested-query')
      .then((res) => {
        setProfessionals(res.data); // Set the data for display
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="professionals-container">
      <h2>Healthcare Professionals with High Ratings</h2>
      <table className="professionals-table">
        <thead>
          <tr>
            <th>Professional ID</th>
            <th>Healthcare Professional Name</th>
          </tr>
        </thead>
        <tbody>
          {professionals.length > 0 ? (
            professionals.map((professional) => (
              <tr key={professional.professional_id}>
                <td>{professional.professional_id}</td>
                <td>{professional.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No professionals with average rating greater than 4.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default RatingGreaterThan4;
