import React, { useState } from 'react';
import axios from 'axios';

const PredictionForm = () => {
  // State to store the form input values
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    restingBP: '',
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  // Handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      // Send the array directly to match the backend's expectation
      const response = await axios.post('http://127.0.0.1:5000/individual', [
        formData.age,
        formData.sex,
        formData.chestPainType,
        formData.restingBP,
      ]);
  
      console.log(response.data); // Log the response for debugging
  
      // Assuming response contains 'prediction' and 'cardiac_arrest_chance'
      setResult({
        prediction: response.data.prediction,
        probability: response.data.cardiac_arrest_chance,
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('An error occurred. Please try again.');
    }
  };
    

  return (
    <div className="container mt-4">
      <h2>Predict Individual Health</h2>
      <form onSubmit={handleSubmit}>
        {/* Only rendering required fields */}
        <div className="mb-3">
          <label className="form-label">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sex (1=Male, 0=Female):</label>
          <input
            type="number"
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Chest Pain Type:</label>
          <input
            type="number"
            name="chestPainType"
            value={formData.chestPainType}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Resting BP:</label>
          <input
            type="number"
            name="restingBP"
            value={formData.restingBP}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Predict
        </button>
      </form>

      {/* Display the result */}
      {result && (
        <div className="mt-4">
          <h4>Prediction: {result.prediction === 1 ? 'Cardiac Arrest Risk' : 'No Risk'}</h4>
          <p>Cardiac Arrest Probability: {result.probability}%</p>
        </div>
      )}

      {/* Display error if any */}
      {error && <div className="mt-4 alert alert-danger">{error}</div>}
    </div>
  );
};

export default PredictionForm;
