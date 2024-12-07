import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage'; // Updated path
import PredictionForm from './components/PredictionForm'; // Updated path
import BulkTest from './components/BulkTest'; // Updated path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/individual" element={<PredictionForm />} />
        <Route path="/bulk" element={<BulkTest />} />
      </Routes>
    </Router>
  );
}

export default App;
