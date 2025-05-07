import styled, { keyframes } from "styled-components";

// Define animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(29, 255, 150, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(29, 255, 150, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(29, 255, 150, 0);
  }
`;

const TokenomicsWrapper = styled.section`
  padding: 100px 0;
  position: relative;
  z-index: 1;
  background: var(--tokenomics-bg);
  overflow: hidden;
  transition: var(--theme-transition);
  
  &#tokenomics {
    background-image: url('../../../assets/images/Tokenomics-Elon.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  /* Add background gradient and patterns for more visual appeal */
  &#tokenomics:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25); /* Reduced opacity to 25% */
    z-index: -1;
  }

  .tokenomics-title {
    margin-bottom: 30px;
    font-family: ${({ theme }) => theme.fonts.title2};
    font-size: 60px;
    font-weight: 400;
    line-height: 70px;
    color: #FFFFFF;
    text-align: center;
  }

  .tokenomics-subtitle {
    margin-bottom: 50px;
    font-family: ${({ theme }) => theme.fonts.primary};
    font-size: 18px;
    font-weight: 500;
    line-height: 30px;
    color: var(--body-text);
    text-align: center;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
    animation: ${fadeInUp} 0.8s ease-out 0.2s both;
  }

  .tokenomics-chart-container {
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    justify-content: center;
    align-items: center;
    margin-bottom: 70px;
    animation: ${fadeInUp} 0.8s ease-out 0.3s both;

    .chart-wrapper {
      width: 910px; /* Increased width by 30% from 700px */
      height: 845px; /* Increased height by 30% from 650px */
      flex-shrink: 0;
      position: relative;
      filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.15));
      transition: transform 0.3s ease;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
      overflow: visible; /* Allow content to overflow for legend */
      padding-bottom: 80px; /* Additional padding for legend */

      &:hover {
        transform: scale(1.02);
      }

      /* Add glow effect around the chart */
      &:after {
        content: "";
        position: absolute;
        top: -10px;
        left: -10px;
        right: -10px;
        bottom: -10px;
        border-radius: 50%;
        z-index: -1;
        background: radial-gradient(circle at center, rgba(var(--accent-color-rgb, 29, 255, 150), 0.2) 0%, transparent 70%);
      }

      canvas {
        cursor: pointer;
        border-radius: 50%;
        /* Canvas styling to ensure proper size */
        max-width: 100%;
        max-height: 100%;
      }
      
      /* Hide chart legends and titles but keep the pie chart visible */
      .chartjs-legend {
        display: none !important;
      }
    }
    
    /* Hide all text elements in the chart container */
    .chartjs-render-monitor text,
    .chartjs-render-monitor tspan {
      display: none !important;
    }
  }

  .tokenomics-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    justify-content: center;
  }

  .tokenomics-card {
    flex: 1;
    min-width: 280px;
    max-width: 300px;
    border-radius: 20px;
    border: 2px solid var(--card-border);
    background: var(--card-bg);
    --card-bg-rgb: 9, 43, 60; /* RGB values for dark theme card background */
    backdrop-filter: blur(10px);
    padding: 35px 30px;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(30px);
    animation: ${fadeInUp} 0.8s ease-out forwards;
    animation-delay: calc(0.4s + var(--index, 0) * 0.1s);

    /* Add subtle gradient background */
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.025) 0%, transparent 100%);
      z-index: -1;
      opacity: 0.25; /* Reduced opacity to 25% */
    }

    &:hover {
      transform: translateY(-8px) scale(1.05);
      border-color: var(--accent-color);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
    }

    &.active {
      transform: translateY(-8px) scale(1.05);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
      border-width: 2px;
      animation: ${pulse} 2s infinite;
      opacity: 0.9; /* Add 10% transparency when active */
      background: rgba(var(--card-bg-rgb, 20, 20, 20), 0.9);
    }

    .percentage {
      font-family: ${({ theme }) => theme.fonts.title2};
      font-size: 56px;
      font-weight: 500;
      color: var(--accent-color);
      margin-bottom: 15px;
      text-shadow: 0 2px 8px rgba(var(--accent-color-rgb, 29, 255, 150), 0.3);
    }

    .allocation {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 22px;
      font-weight: 600;
      color: var(--heading-text);
      margin-bottom: 18px;
      position: relative;
      display: inline-block;

      /* Add animated divider */
      &:after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: rgba(255, 255, 255, 0.3);
        transition: width 0.3s ease;
      }
    }

    &:hover .allocation:after,
    &.active .allocation:after {
      width: 80px;
      background: rgba(var(--accent-color-rgb, 29, 255, 150), 0.5);
    }

    .description {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-size: 16px;
      line-height: 24px;
      color: var(--card-text);
    }
  }

  .tokenomics-details {
    margin-top: 70px;
    border-radius: 20px;
    border: 2px solid var(--card-border);
    background: var(--tokenomics-detail-bg);
    backdrop-filter: blur(20px);
    padding: 45px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    animation: ${fadeInUp} 0.8s ease-out 0.8s both;

    .details-title {
      color: var(--accent-color);
      font-family: ${({ theme }) => theme.fonts.title2};
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      margin-bottom: 35px;
      position: relative;
      display: inline-block;
      left: 50%;
      transform: translateX(-50%);

      /* Add subtle underline */
      &:after {
        content: "";
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent 0%, rgba(var(--accent-color-rgb, 29, 255, 150), 0.5) 50%, transparent 100%);
      }
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 30px;
      padding-top: 10px;
    }

    .detail-item {
      text-align: center;
      padding: 20px;
      border-radius: 12px;
      transition: all 0.3s ease;
      background: var(--card-bg);
      animation: ${fadeInUp} 0.8s ease-out;
      animation-delay: calc(0.9s + var(--index, 0) * 0.1s);

      &:hover {
        background: rgba(var(--accent-color-rgb, 29, 255, 150), 0.1);
        transform: translateY(-5px);
      }

      .item-label {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 16px;
        color: var(--body-text);
        margin-bottom: 10px;
      }

      .item-value {
        font-family: ${({ theme }) => theme.fonts.title2};
        font-size: 26px;
        font-weight: 500;
        color: var(--heading-text);
      }
    }
  }

  @media screen and (max-width: 1199px) {
    .tokenomics-chart-container {
      .chart-wrapper {
        width: 845px; /* Adjusted for this breakpoint (30% increase from 650px) */
        height: 780px; /* Adjusted for this breakpoint (30% increase from 600px) */
      }
    }
  }

  @media screen and (max-width: 991px) {
    .tokenomics-chart-container {
      .chart-wrapper {
        width: 754px; /* Adjusted for this breakpoint (30% increase from 580px) */
        height: 715px; /* Adjusted for this breakpoint (30% increase from 550px) */
      }
    }
  }

  @media screen and (max-width: 767px) {
    .tokenomics-title {
      font-size: 48px;
      line-height: 58px;
      color: #FFFFFF;
    }

    .tokenomics-details {
      padding: 35px;
    }

    .tokenomics-chart-container {
      flex-direction: column;

      .chart-wrapper {
        width: 650px; /* Adjusted for this breakpoint (30% increase from 500px) */
        height: 650px; /* Adjusted for this breakpoint (30% increase from 500px) */
      }
    }
  }

  @media screen and (max-width: 575px) {
    .tokenomics-title {
      font-size: 36px;
      line-height: 46px;
      color: #FFFFFF;
    }

    .tokenomics-chart-container {
      .chart-wrapper {
        width: 520px; /* Adjusted for this breakpoint (30% increase from 400px) */
        height: 585px; /* Adjusted for this breakpoint (30% increase from 450px) */
      }
    }
  }

  @media screen and (max-width: 480px) {
    padding: 60px 0;

    .tokenomics-title {
      font-size: 30px;
      line-height: 40px;
      color: #FFFFFF;
    }

    .tokenomics-subtitle {
      font-size: 16px;
      line-height: 26px;
    }

    .tokenomics-chart-container {
      display: none !important; /* Hide the chart container on mobile */
    }

    .tokenomics-details {
      padding: 25px;

      .details-title {
        font-size: 26px;
      }

      .detail-item {
        padding: 15px 10px;

        .item-value {
          font-size: 22px;
        }
      }
    }
  }
`;

export default TokenomicsWrapper;
