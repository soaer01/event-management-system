import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-events" element={
            <PrivateRoute>
              <div style={{ padding: '20px' }}><h2>My Events Protected Page</h2></div>
            </PrivateRoute>
          } />
          <Route path="/" element={<div style={{ padding: '20px' }}><h2>Home Page Placeholder</h2></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;