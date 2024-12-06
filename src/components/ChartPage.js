import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';  // Automatically registers chart.js components

const ChartPage = ({ chartData }) => {
  if (!chartData) {
    return <div>Loading chart...</div>;
  }

  return (
    <div>
      <h2>Prediction Scores Chart</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartPage;
