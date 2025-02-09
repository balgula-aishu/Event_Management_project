import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setMessage(res.data.message);
      console.log('Token:', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setMessage(err.response ? err.response.data.message : 'Something went wrong');
    }
}
  return (
    <>
     <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br /><br />
      <button type="submit">Login</button>
    </form>
    {message && <p>{message}</p>}
      <p>
        Don't have an account? <a href="/register">Register Here</a>
      </p>
    </>
  )
}

export default Login
