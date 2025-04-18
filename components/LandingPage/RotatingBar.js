import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const RotatingBar = ({text}) => {
  return (
    <BarContainer>
      <BarLine>
        <span className="bar-text">BUY</span>
        <span className="bar-text">WATCHES</span>
        <span className="bar-text">WITH</span>
        <span className="bar-text">CRYPTO</span>
        <span className="bar-text">SELL</span>
        <span className="bar-text">WATCHES</span>
        <span className="bar-text">FOR</span>
        <span className="bar-text">CRYPTO</span>
        <span className="bar-text">BUY</span>
        <span className="bar-text">WATCHES</span>
        <span className="bar-text">WITH</span>
        <span className="bar-text">CRYPTO</span>
      </BarLine>
    </BarContainer>
  );
};

// Styled Components
const BarContainer = styled.div`
  overflow: hidden;
  background: darkblue;
  white-space: nowrap;
  padding: 40px 0;
`;

const BarLine = styled.div`
  display: inline-block;
  animation: rotate 10s linear infinite;

  .bar-text {
    font-size: 40px;
    font-weight: bold;
    color: white;
    margin: 0 40px;
  }

  @keyframes rotate {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-31%);
    }
  }
`;

export default RotatingBar;