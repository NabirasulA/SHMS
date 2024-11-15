import React, { useState } from 'react';
import axios from 'axios';

function UserManagementPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleCreateUser = () => {
    axios.post('http://localhost:8081/create-user', {
      username,
      password,
      role
    })
    .then(response => alert('User created successfully!'))
    .catch(error => console.error('Error creating user:', error));
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleCreateUser(); }}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="">Select Role</option>
            <option value="patient">Patient</option>
            <option value="professional">Healthcare Professional</option>
          </select>
        </label>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
}

export default UserManagementPage;
