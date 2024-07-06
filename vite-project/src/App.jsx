import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <p>Please use the menu to navigate.</p>
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;