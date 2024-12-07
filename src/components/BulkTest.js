import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function BulkTest() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!file) {
      setError("Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/bulk", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Bulk Prediction</h1>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload CSV File</label>
          <input
            type="file"
            className="form-control"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Predict</button>
      </form>
      {results && (
        <div className="mt-4">
          <h4>Prediction Results</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Age</th>
                <th>Sex</th>
                <th>Chest Pain Type</th>
                <th>Resting BP</th>
                <th>Prediction</th>
                <th>Cardiac Arrest Chance (%)</th>
              </tr>
            </thead>
            <tbody>
              {results.predictions.map((row, index) => (
                <tr key={index}>
                  <td>{row.age}</td>
                  <td>{row.sex}</td>
                  <td>{row.chestPainType}</td>
                  <td>{row.restingBP}</td>
                  <td>{row.prediction}</td>
                  <td>{row.cardiac_arrest_chance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default BulkTest;
