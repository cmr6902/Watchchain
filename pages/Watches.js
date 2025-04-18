import Navbar from '@/components/Dashboard/Navbar';
import React from 'react';
import styled from 'styled-components';

const WatchPostings = () => {
  return (
    <WatchSection>
      <Navbar />
      <Title>What Watch Postings Look Like</Title>
      <WatchContainer>
        {/* === Watch 1 === */}
        <WatchCard>
          <WatchImage>
            <img
              src="https://i.ebayimg.com/images/g/SpkAAOSwPVJmecXl/s-l1200.jpg"
              alt="Rolex Submariner"
            />
          </WatchImage>
          <WatchDetails>
            <h3>Rolex Submariner</h3>
            <WatchMeta>
              <p className="metaBrand">Brand: Rolex</p>
              <p>Model: Submariner Date</p>
            </WatchMeta>
            <CardFeatures>
              <des>Details</des>
              <ul>
                <li>Year: 2021</li>
                <li>Condition: Slightly Worn</li>
                <li>Price: 5.1 ETH</li>
              </ul>
            </CardFeatures>
          </WatchDetails>
          <BuyNowButton>Buy Now</BuyNowButton>
        </WatchCard>

        {/* === Watch 2 === */}
        <WatchCard>
          <WatchImage>
            <img
              src="https://s3-us-west-1.amazonaws.com/chronocash.eu/uploads/images/catalog/2020/11/24/watch_160622084133979.jpg"
              alt="Omega Speedmaster"
            />
          </WatchImage>
          <WatchDetails>
            <h3>Omega Speedmaster</h3>
            <WatchMeta>
              <p className="metaBrand">Brand: Omega</p>
              <p>Model: Moonwatch Professional</p>
            </WatchMeta>
            <CardFeatures>
              <des>Details</des>
              <ul>
                <li>Year: 2019</li>
                <li>Condition: Excellent</li>
                <li>Price: 4 ETH</li>
              </ul>
            </CardFeatures>
          </WatchDetails>
          <BuyNowButton>Buy Now</BuyNowButton>
        </WatchCard>

        {/* === Watch 3 === */}
        <WatchCard>
          <WatchImage>
            <img
              src="https://celebritywatchs.in/wp-content/uploads/2024/08/cartier-santos-green-scaled.jpeg"
              alt="Santos Green"
            />
          </WatchImage>
          <WatchDetails>
            <h3>Cartier Santos</h3>
            <WatchMeta>
              <p className="metaBrand">Brand: Cartier</p>
              <p>Model: Santos Green</p>
            </WatchMeta>
            <CardFeatures>
              <des>Details</des>
              <ul>
                <li>Year: 2024</li>
                <li>Condition: New</li>
                <li>Price: 4.5 ETH</li>
              </ul>
            </CardFeatures>
          </WatchDetails>
          <BuyNowButton>Buy Now</BuyNowButton>
        </WatchCard>
      </WatchContainer>
    </WatchSection>
  );
};
const WatchSection = styled.section`
  text-align: center;
  padding: 100px 20px;
  background-color: #141414;
  width: 100%;
`;

const Title = styled.h2`
  color: white;
  margin-bottom: 30px;
  font-size: 4rem;
`;

const WatchContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  min-height: 70vh;
`;

const WatchCard = styled.div`
  width: 300px;
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  color: black;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

`;

const WatchImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

const WatchDetails = styled.div`
  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.75rem;
    font-size: 1.1rem;
  }
`;

const WatchMeta = styled.div`
  .metaBrand {
    font-weight: bold;
  }
`;

const CardFeatures = styled.div`
  text-align: left;

  des {
    font-weight: bold;
    font-size: 1.2rem;
    display: block;
    margin-bottom: 0.5rem;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    font-size: 1rem;
    margin-top: 0.4rem;
  }
`;

const BuyNowButton = styled.button`
  margin-top: 1rem;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: darkblue;
  color: white;
  border: none;
  border-radius: 8px;
  transition: background 0.2s ease-in-out;
`;

export default WatchPostings;