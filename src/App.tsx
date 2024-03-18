import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';



const App: React.FC = () => {


  const authContext = React.useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const { isAuthenticated } = authContext;

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
      
  );
}

export default App;
