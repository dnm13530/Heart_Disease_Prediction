import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PredictionChart = ({ chartData }) => {
  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Prevent aspect ratio lock
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.raw.toFixed(2); // Format tooltip data
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '80%', height: '300px' }}>
      {/* Set width and height of the chart container */}
      <Line data={chartData} options={options} />
    </div>
  );
};

export default PredictionChart;
