import { useState, useEffect, useRef } from "react";
import TokenomicsWrapper from "./Tokenomics.style";

// Import tokenomics data from separate file
import tokenomicsData from './tokenomicsData.js';

// Import background images for each segment
import segment1Image from '../../assets/images/tokenomics/segment-1.png';
import segment2Image from '../../assets/images/tokenomics/segment-2.png';
import segment3Image from '../../assets/images/tokenomics/segment-3.png';
import segment4Image from '../../assets/images/tokenomics/segment-4.png';
import segment5Image from '../../assets/images/tokenomics/segment-5.png';
import segment6Image from '../../assets/images/tokenomics/segment-6.png';

// Import center circle background image
import centerImage from '../../assets/images/BNBTRMP.jpg';

const Tokenomics = () => {
  // State for selected tokenomics section
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [highlightedSection, setHighlightedSection] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const canvasRef = useRef(null);
  const segmentImagesRef = useRef([]);
  const centerImageRef = useRef(null);
  const containerRef = useRef(null);

  // Enhanced tokenomics data with colors and segment images
  const segmentImages = [segment1Image, segment2Image, segment3Image, segment4Image, segment5Image, segment6Image];

  const enhancedTokenomicsData = tokenomicsData.map((item, index) => {
    // Extract RGB values from the color string
    const rgbMatch = item.color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/);
    let r = 0, g = 0, b = 0;

    if (rgbMatch) {
      r = parseInt(rgbMatch[1]);
      g = parseInt(rgbMatch[2]);
      b = parseInt(rgbMatch[3]);
    }

    // Create brighter versions for hover/selected states
    // Increase brightness while maintaining color identity
    const brightenColor = (val) => Math.min(255, val + 40);

    return {
      ...item,
      // Make colors more vibrant for better visibility
      solidColor: item.color.replace("0.9", "1"),
      // Create a brighter version for hover/selected states
      overlayColor: `rgba(${brightenColor(r)}, ${brightenColor(g)}, ${brightenColor(b)}, 0.7)`,
      // Assign a specific background image to each segment
      backgroundImage: segmentImages[index]
    };
  });

  // Calculate total percentage for the pie chart
  const totalPercentage = enhancedTokenomicsData.reduce((sum, item) => sum + item.percentage, 0);

  // Load background images on component mount
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = enhancedTokenomicsData.length + 1; // +1 for center image

    // Load all segment images
    enhancedTokenomicsData.forEach((item, index) => {
      const img = new Image();
      img.src = item.backgroundImage;
      img.onload = () => {
        segmentImagesRef.current[index] = img;
        loadedCount++;

        // Set images loaded when all images are loaded
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });

    // Load center image
    const centerImg = new Image();
    centerImg.src = centerImage;
    centerImg.onload = () => {
      centerImageRef.current = centerImg;
      loadedCount++;

      // Set images loaded when all images are loaded
      if (loadedCount === totalImages) {
        setImagesLoaded(true);
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        drawPieChart();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Draw the pie chart whenever dependencies change
  useEffect(() => {
    if (imagesLoaded) {
      drawPieChart();
    }
  }, [imagesLoaded, selectedSection, hoveredSection, enhancedTokenomicsData]);

  // Main function to draw the pie chart
  const drawPieChart = () => {
    if (!canvasRef.current || !segmentImagesRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions based on container size
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    // Make the pie chart 20% bigger than original (1.0 * 1.2 = 1.2)
    const size = Math.min(containerWidth, containerHeight) * 1.2;

    canvas.width = size;
    canvas.height = size;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate center and radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.95;

    // Draw pie chart segments with image backgrounds
    let startAngle = -Math.PI / 2; // Start from top (12 o'clock position)

    // First pass: Draw all segments with background images
    enhancedTokenomicsData.forEach((item, index) => {
      const segmentAngle = (item.percentage / totalPercentage) * (Math.PI * 2);
      const endAngle = startAngle + segmentAngle;

      // Save context state
      ctx.save();

      // Create clipping path for this segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.clip();

      // Draw the specific background image for this segment
      const img = segmentImagesRef.current[index];
      // Make the image larger to ensure it covers the segment and is more visible
      const imgSize = Math.max(canvas.width, canvas.height) * 1.5;

      // Calculate the angle midpoint of this segment to position the image better
      const midAngle = startAngle + (endAngle - startAngle) / 2;

      // Offset the image position based on the segment's position in the pie
      // This helps center the image content within each segment
      const offsetDistance = radius * 0.2;
      const offsetX = Math.cos(midAngle) * offsetDistance;
      const offsetY = Math.sin(midAngle) * offsetDistance;

      const imgX = centerX - imgSize / 2 + offsetX;
      const imgY = centerY - imgSize / 2 + offsetY;

      // Enhance image contrast and saturation before drawing - strengthened filters for better visibility
      ctx.filter = 'contrast(1.5) brightness(1.3) saturate(1.4)';

      // Draw the image
      ctx.drawImage(img, imgX, imgY, imgSize, imgSize);

      // Reset filter
      ctx.filter = 'none';

      // Add a color overlay with the segment color
      const isSelected = selectedSection && selectedSection.allocation === item.allocation;
      const isHovered = hoveredSection && hoveredSection.allocation === item.allocation;

      if (isSelected || isHovered) {
        // Reduce opacity by 15% for selected/hovered segments to increase transparency
        const baseColor = item.overlayColor || item.color;
        ctx.fillStyle = baseColor.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/, 'rgba($1, $2, $3, 0.35)');
      } else {
        // Keep standard opacity for other segments
        ctx.fillStyle = item.color.replace(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*[\d\.]+\)/, 'rgba($1, $2, $3, 0.65)');
      }
      ctx.fill();

      // Restore context state
      ctx.restore();

      startAngle = endAngle;
    });

    // Second pass: Draw segment borders
    startAngle = -Math.PI / 2;
    enhancedTokenomicsData.forEach((item) => {
      const segmentAngle = (item.percentage / totalPercentage) * (Math.PI * 2);
      const endAngle = startAngle + segmentAngle;

      // Draw segment border
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();

      // Style for segment border
      const isSelected = selectedSection && selectedSection.allocation === item.allocation;
      const isHovered = hoveredSection && hoveredSection.allocation === item.allocation;

      ctx.lineWidth = isSelected || isHovered ? 3 : 1.5;
      ctx.strokeStyle = isSelected || isHovered ? item.solidColor : "rgba(255, 255, 255, 0.7)";
      ctx.stroke();

      startAngle = endAngle;
    });

    // Draw center circle with background image - make it 30% bigger than current size (0.2579 * 1.3 = 0.33527)
    const centerRadius = radius * 0.33527;

    // Create a circular clipping path for the center circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.clip();

    // Draw the background image in the center circle
    if (centerImageRef.current && centerImageRef.current.complete) {
      // Calculate dimensions to ensure the image fits completely within the circle
      const circleSize = centerRadius * 2; // Diameter of the center circle

      // Get the image dimensions
      const imgWidth = centerImageRef.current.width;
      const imgHeight = centerImageRef.current.height;

      // Calculate scaling factors for width and height
      const scaleWidth = circleSize / imgWidth;
      const scaleHeight = circleSize / imgHeight;

      // Use the smaller scaling factor to ensure the entire image fits
      // without being cut off
      const scale = Math.min(scaleWidth, scaleHeight);

      const scaledWidth = imgWidth * scale;
      const scaledHeight = imgHeight * scale;

      // Position to center the image perfectly in the circle
      const imgX = centerX - scaledWidth / 2;
      const imgY = centerY - scaledHeight / 2;

      // Draw the image to perfectly fit the circle without being cut off
      ctx.drawImage(centerImageRef.current, imgX, imgY, scaledWidth, scaledHeight);

      // Add a golden overlay to enhance the image and match the theme
      ctx.fillStyle = "rgba(243, 186, 47, 0.2)";
      ctx.fill();

      // Add a subtle inner glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#f3ba2f";
      ctx.stroke();
    } else {
      // Fallback if image isn't loaded
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fill();
    }

    // Restore the context and add a stroke around the center circle
    ctx.restore();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Add a stronger golden glow effect around the center circle
    // First outer glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = "#f3ba2f";
    ctx.lineWidth = 8;
    ctx.shadowBlur = 30;
    ctx.shadowColor = "#f3ba2f";
    ctx.stroke();

    // Second inner glow
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius + 4, 0, Math.PI * 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ffffff";
    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Add a white inner stroke for contrast
    ctx.beginPath();
    ctx.arc(centerX, centerY, centerRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  };

  // Handle mouse move on canvas to detect hovering over segments
  const handleMouseMove = (e) => {
    if (!canvasRef.current || !imagesLoaded) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate center and radius
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.95;

    // Calculate distance from center
    const dx = x - centerX;
    const dy = y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // If outside the pie chart or in the center circle, clear hover state
    // Center circle size is now 0.33527 of radius
    if (distance > radius || distance < radius * 0.33527) {
      if (hoveredSection !== null) {
        setHoveredSection(null);
      }
      return;
    }

    // Calculate angle (in radians) of the mouse position
    let angle = Math.atan2(dy, dx);
    // Convert to positive angle (0 to 2π)
    if (angle < 0) angle += Math.PI * 2;
    // Adjust angle to start from top (12 o'clock position)
    angle = (angle + Math.PI * 2.5) % (Math.PI * 2);

    // Find which segment the angle corresponds to
    let startAngle = 0;
    let foundSection = null;

    for (let i = 0; i < enhancedTokenomicsData.length; i++) {
      const segmentAngle = (enhancedTokenomicsData[i].percentage / totalPercentage) * (Math.PI * 2);
      const endAngle = startAngle + segmentAngle;

      if (angle >= startAngle && angle < endAngle) {
        foundSection = enhancedTokenomicsData[i];
        break;
      }

      startAngle = endAngle;
    }

    // Only update state if it's different to avoid unnecessary re-renders
    if (hoveredSection !== foundSection) {
      setHoveredSection(foundSection);
    }
  };

  // Handle mouse leave from canvas
  const handleMouseLeave = () => {
    setHoveredSection(null);
  };

  // Handle click on canvas
  const handleCanvasClick = () => {
    if (hoveredSection) {
      // First clear any existing highlight to ensure animation triggers again
      setHighlightedSection(null);
      
      // Use a small timeout to ensure the state change is processed
      setTimeout(() => {
        // Set the highlighted section to the hovered section
        setHighlightedSection(hoveredSection);
        
        // Add a subtle animation effect by clearing the highlight after a delay
        setTimeout(() => {
          setHighlightedSection(null);
        }, 1500);
      }, 10);
      
      // Set the selected section to highlight the corresponding pie chart segment
      setSelectedSection(hoveredSection);
    }
  };

  // Handle click on tokenomics card
  const handleCardClick = (item) => {
    // Toggle selection state
    setSelectedSection(item === selectedSection ? null : item);
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

  // Function to display tooltip for hovered section
  const renderTooltip = () => {
    if (!hoveredSection) return null;

    return (
      <div className="pie-chart-tooltip">
        <div className="tooltip-title" style={{ color: hoveredSection.solidColor }}>
          {hoveredSection.allocation}
        </div>
        <div className="tooltip-percentage">
          {hoveredSection.percentage}%
        </div>
      </div>
    );
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
              <div className="chart-wrapper" ref={containerRef}>
                <canvas
                  ref={canvasRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleCanvasClick}
                  className="custom-pie-chart"
                />
                {renderTooltip()}

                {/* Loading indicator */}
                {!imagesLoaded && (
                  <div className="chart-loading">
                    <div className="loading-spinner"></div>
                    <div className="loading-text">Loading chart...</div>
                  </div>
                )}
              </div>
            </div>

            <div className="tokenomics-grid">
              {enhancedTokenomicsData.map((item, index) => (
                <div
                  key={index}
                  className={`tokenomics-card ${selectedSection === item ? 'active' : ''} ${highlightedSection === item ? 'highlighted' : ''}`}
                  onClick={() => handleCardClick(item)}
                  style={{
                    borderColor: selectedSection === item ? item.solidColor :
                               highlightedSection === item ? item.solidColor : undefined,
                    '--index': index // Set CSS custom property for animation delay
                  }}
                >
                  <div className="percentage" style={{ color: item.solidColor }}>{item.percentage}%</div>
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
