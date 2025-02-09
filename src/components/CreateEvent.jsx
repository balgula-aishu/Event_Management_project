import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
        if (!token) {
            alert('You must be logged in to create an event');
            navigate('/login');
            return;
        }
    try {
      await axios.post(
        'http://localhost:5000/api/events',
        { name, description, date },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/dashboard');
    } catch (err) {
      console.error('Error creating event',err);
      if (err.response && err.response.status === 403) {
        alert('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
    } else {
        alert('Error creating event. Please try again.');
    }
    }
};
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h2>Create Event</h2>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <br /><br />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <br /><br />
      <input
        type="datetime-local"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <br /><br />
      <button type="submit">Create Event</button>
    </form>
      
    </>
  )
}

export default CreateEvent
