import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Navbar from '@/components/Dashboard/Navbar';

const Services = () => {
  return (
    <>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"></link>
    <ServicesSection>
      <Navbar/>
      <Title>What Makes Us Special</Title>
      <IntroText>
        WatchChain is the first website that allows people to exchange watches with other people on a blockchain with cryptocurrency.
      </IntroText>
      <FeaturesContainer>
        <Feature>
          <i className="fa-solid fa-lock icon"></i>
          <h3>Secured Transactions</h3>
          <p>All purchases and sales are encrypted and powered by blockchain and smart contracts to ensure safe and secure transactions.</p>
        </Feature>
        <Feature>
          <i className="fa-solid fa-clock icon"></i>
          <h3>Post Watches</h3>
          <p>Easily list your watches for sale and showcase them to a crypto friendly watch community.</p>
        </Feature>
        <Feature>
          <i className="fa-solid fa-users-viewfinder icon"></i>
          <h3>View Watches</h3>
          <p>Browse a variety of unique watches posted by others and discover pieces available for crypto purchases.</p>
        </Feature>
        <Feature>
          <i className="fa-solid fa-globe icon"></i>
          <h3>Transparent Transactions</h3>
          <p>Buy and sell with confidence through a fully transparent, blockchain powered platform that removes hidden fees and scams.</p>
        </Feature>
      </FeaturesContainer>
    </ServicesSection>
    </>
  );
};

// Styled Components
const ServicesSection = styled.section`
  background-color: #141414;
  padding: 100px 20px;
  text-align: center;

`;

const Title = styled.h2`
color:white;
font-size: 5rem;
margin-bottom: 30px;
`;


const IntroText = styled.p`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 20px;
  margin-top:-10px;
`;

const FeaturesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const Feature = styled.div`
  background-color: darkblue;
  color: white;
  border-radius: 10px;
  padding: 30px;
  text-align: left;
  margin-top: 20px;

  .icon {
    color: yellow;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  p {
    font-size: 1.75rem;
    line-height: 1.5;
  }
`;

export default Services;