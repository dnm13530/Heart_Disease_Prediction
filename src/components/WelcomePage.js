import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h1>Heart Disease Prediction System</h1>
      <p>
        This application predicts the likelihood of cardiac arrest based on user inputs 
        and provides insights using machine learning models.
      </p>
      <p>Models used: Stacked Model, Logistic Regression, Decision Trees</p>
      <div className="mt-4">
        <button className="btn btn-primary mx-2" onClick={() => navigate('/predict')}>
          Predict Individual Health
        </button>
        <button className="btn btn-secondary mx-2" onClick={() => navigate('/bulk-test')}>
          Analyze Bulk Data
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
