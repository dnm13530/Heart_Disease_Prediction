import React, { useState } from 'react';

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    chestPainType: '',
    restingBP: '',
    cholesterol: '',
    fastingBloodSugar: '',
    restingECG: '',
    maxHeartRate: '',
    exerciseAngina: '',
    oldpeak: '',
    stSlope: '',
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:5000/predict', {
            features: [
                inputData.age,
                inputData.sex,
                inputData.chestPain,
                inputData.restingBP
            ]
        });

        console.log(response.data);  // For debugging: Log the response
        setPrediction(response.data.prediction);  // Assuming response contains prediction
        setProbability(response.data.probability);  // Assuming response contains probability
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
};

  
  

  return (
    <div className="container mt-4">
      <h2>Predict Individual Health</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div className="mb-3" key={key}>
            <label className="form-label">
              {key.replace(/([A-Z])/g, ' $1')}:
            </label>
            <input
              type="text"
              name={key}
              value={formData[key]}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Predict
        </button>
      </form>
      {result && <h3 className="mt-4">Prediction: {result}</h3>}
    </div>
  );
};

export default PredictionForm;
