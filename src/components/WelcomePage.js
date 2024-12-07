import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function WelcomePage() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">Welcome to Heart Disease Prediction</h1>
      <p>Select an option below to proceed:</p>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary me-3"
          onClick={() => (window.location.href = "/individual")}
        >
          Individual Prediction
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => (window.location.href = "/bulk")}
        >
          Bulk Prediction
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
