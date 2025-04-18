import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import RotatingBar from './RotatingBar';

const Hero = ({text}) => {
  return (
<Section>
      {/* <Overlay> */}
        <Container>
          {/* left side */}
          <HeroTextColumn>
            <Header>
              See Watches Other People Have
            </Header>
            <SubheaderAndCTA>
              <SubHeader>Buy their Watches with Crypto</SubHeader>
              <SubHeader>Post and Sell Your Own Watches</SubHeader>
              <CTAButton href="/auth/signup">Connect Wallet</CTAButton>
            </SubheaderAndCTA>
          </HeroTextColumn>

          {/* right side image*/}
          <HeroImage>
            <img src="https://cdn1.vectorstock.com/i/1000x1000/51/20/set-cartoon-color-wrist-watches-vector-29565120.jpg" alt="Watch Collection" />
            {/* /images/eventimg1.svg */}
          </HeroImage>
        </Container>
      {/* </Overlay> */}
    </Section>
    

  );
};

// Styled Components
const Section = styled.section`
  background-color: White;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 80px;
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  max-width: 1200px;
`;

const HeroTextColumn = styled.div`
  max-width: 1000px;
`;

const Header = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: darkblue;
`;


const SubheaderAndCTA = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SubHeader = styled.p`
  font-size: 3rem;
  font-weight:Bold;
  text-align: center;
  max-width: 1000px;
`;

const CTAButton = styled(Link)`
  background: darkblue;
  color: white;
  text-align: center;
  justify-content: center;
  align-self: center;
  padding: 20px 40px;
  text-decoration: none;
  font-size: 1.2rem;
  border-radius: 100px;
  display: inline-block;
  width: fit-content;
  margin-top: 10px;

  &:hover {
    background: green;
    transition: all 0.3s ease-in-out;
  }
`;

const HeroImage = styled.div`
  img {
    max-width: 900px;
    max-height: 550px;
    clip-path: inset(0 0 50px 0);
    height: auto;
  }
`;


export default Hero;
