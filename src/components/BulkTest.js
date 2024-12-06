import React, { useState } from 'react';

const BulkTest = () => {
  const [data, setData] = useState('');
  const [metrics, setMetrics] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const rows = data.split('\n').map((row) => row.split(',').map(Number));
    fetch('http://127.0.0.1:5000/bulk-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataset: rows }),
    })
      .then((response) => response.json())
      .then((data) => setMetrics(data))
      .catch((error) => console.error('Error:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Bulk Data Analysis</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="10"
          className="form-control"
          placeholder="Enter dataset in CSV format"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary mt-3">
          Analyze
        </button>
      </form>
      {metrics && (
        <div className="mt-4">
          <h3>Results</h3>
          <p>Accuracy: {metrics.accuracy}</p>
          <p>Precision: {metrics.precision}</p>
          <p>Recall: {metrics.recall}</p>
          <p>F1 Score: {metrics.f1_score}</p>
        </div>
      )}
    </div>
  );
};

export default BulkTest;
