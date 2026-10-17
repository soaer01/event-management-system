import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../store/auth';

function Navbar() {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav style={{ background: '#333', color: '#fff', padding: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '1000px', margin: '0 auto' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>EventApp</Link>
        <div>
          <Link to="/" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Home</Link>
          {currentUser ? (
            <>
              <Link to="/my-events" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>My Events</Link>
              <span style={{ marginRight: '15px', color: 'yellow' }}>Hi, {currentUser.name}</span>
              <button onClick={handleLogout} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: '#fff', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
              <Link to="/signup" style={{ background: 'blue', color: 'white', padding: '5px 10px', textDecoration: 'none' }}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;