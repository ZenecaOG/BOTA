import { useState, useEffect, useRef } from "react";
import TokenomicsWrapper from "./Tokenomics.style";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Import tokenomics data from separate file
import tokenomicsData from './tokenomicsData.js';

// Register required Chart.js components with the latest syntax
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors
);

const Tokenomics = () => {
  // State for selected tokenomics section
  const [selectedSection, setSelectedSection] = useState(null);
  const chartRef = useRef(null);

  // Chart data with simplified structure
  const chartData = {
    labels: tokenomicsData.map(item => item.allocation),
    datasets: [
      {
        data: tokenomicsData.map(item => item.percentage),
        backgroundColor: tokenomicsData.map(item => item.color),
        borderColor: tokenomicsData.map(item => item.color.replace("0.9", "1")),
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  // Simplified chart options for more reliable rendering
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: 0, // Ensure it's a pie chart not a doughnut
    radius: '104%', // Increased by 30% from 80%
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 20, // Reduced padding since we're hiding the legend
        left: 20
      }
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}%`;
          }
        },
        backgroundColor: 'rgba(20, 65, 48, 0.95)',
        titleFont: {
          family: 'Poppins, sans-serif',
          size: 16,
          weight: 'bold'
        },
        titleColor: '#1dff96',
        bodyFont: {
          family: 'Poppins, sans-serif',
          size: 14
        },
        padding: 15,
        cornerRadius: 10,
        displayColors: true
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 800,
    },
  };

  // Handle click on tokenomics card
  const handleCardClick = (item) => {
    // Toggle selection state
    setSelectedSection(item === selectedSection ? null : item);

    if (chartRef.current) {
      const chart = chartRef.current;
      const index = tokenomicsData.findIndex(data => data.allocation === item.allocation);

      try {
        // Clear any active elements
        chart.setActiveElements([]);

        // Highlight the clicked segment if not already selected
        if (item !== selectedSection) {
          chart.setActiveElements([{
            datasetIndex: 0,
            index: index
          }]);
        }

        chart.update();
      } catch (error) {
        console.error("Error updating chart:", error);
      }
    }
  };

  // Calculate total supply for display
  const totalSupplyValue = 100000000; // Raw number value
  const totalSupply = totalSupplyValue.toLocaleString(); // Format with commas

  // Function to format token amount with short suffix for display
  const formatTokenAmount = (amount) => {
    if (amount >= 1000000) {
      return (amount / 1000000).toFixed(1) + ' M';
    } else if (amount >= 1000) {
      return (amount / 1000).toFixed(1) + ' K';
    }
    return amount.toString();
  };

  return (
    <TokenomicsWrapper id="tokenomics">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="tokenomics-title">TOKENOMICS</h2>
            <p className="tokenomics-subtitle">
              Our token distribution is designed for long-term sustainability and growth
            </p>

            <div className="tokenomics-chart-container">
              <div className="chart-wrapper">
                <Pie
                  key="tokenomics-pie-chart"
                  data={chartData}
                  options={chartOptions}
                  ref={chartRef}
                />
              </div>
            </div>

            <div className="tokenomics-grid">
              {tokenomicsData.map((item, index) => (
                <div
                  key={index}
                  className={`tokenomics-card ${selectedSection === item ? 'active' : ''}`}
                  onClick={() => handleCardClick(item)}
                  style={{
                    borderColor: selectedSection === item ? item.color : undefined,
                    '--index': index // Set CSS custom property for animation delay
                  }}
                >
                  <div className="percentage" style={{ color: item.color }}>{item.percentage}%</div>
                  <div className="allocation">{item.allocation}</div>
                  <div className="description">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>

            <div className="tokenomics-details">
              <h3 className="details-title">Token Details</h3>
              <div className="details-grid">
                {[
                  { label: "Token Name", value: "BNBMAGA" },
                  { label: "Token Type", value: "BSC" },
                  { label: "Total Supply", value: totalSupply },
                  { label: "Initial Price", value: "$0.05" },
                  { label: "Sale Hard Cap", value: "$2,000,000" },
                  { label: "Sale Soft Cap", value: "$500,000" }
                ].map((detail, index) => (
                  <div
                    key={index}
                    className="detail-item"
                    style={{ '--index': index }}
                  >
                    <div className="item-label">{detail.label}</div>
                    <div className="item-value">{detail.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </TokenomicsWrapper>
  );
};

export default Tokenomics;
