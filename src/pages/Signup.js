import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, clearErr } from '../store/auth';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErr, setValidationErr] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearErr());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleRegister = (e) => {
    e.preventDefault();
    setValidationErr('');

    if (!name.trim() || !email.trim() || !password.trim()) {
      setValidationErr('All fields are required.');
      return;
    }

    if (password.length < 6) {
      setValidationErr('Password must be at least 6 characters long.');
      return;
    }

    dispatch(clearErr());
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Sign Up</h2>
      {validationErr && <p style={{ color: 'red' }}>{validationErr}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />
        <button type="submit">Register</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Already registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;