import React from 'react';
import NavBar from './components/NavBar';
import Login from './components/Login';
import Register from './components/Register';
import Tasks from './components/Tasks';
import Footer from './components/Footer';
import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import './styles/App.css';

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
        <Header />
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
