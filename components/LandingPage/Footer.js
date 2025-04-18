import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <LeftContainer>
          © {new Date().getFullYear()} WatchChain
        </LeftContainer>
        <CenterContainer>
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </CenterContainer>
        <RightContainer>
        <SocialIcon href="https://www.instagram.com" target = "blank" rel="noopener noreferrer">Instagram</SocialIcon>
        <SocialIcon href="https://x.com" target = "blank" rel="noopener noreferrer">Twitter</SocialIcon>
        <SocialIcon href="https://www.linkedin.com" target = "blank" rel="noopener noreferrer">LinkedIn</SocialIcon>
        <SocialIcon href="https://www.reddit.com" target = "blank" rel="noopener noreferrer">Reddit</SocialIcon>
        </RightContainer>
      </FooterContainer>
    </FooterSection>
  );
};

const FooterSection = styled.footer`
color: white;
background: darkblue;
`;

const FooterContainer = styled.div`

`;

const LeftContainer = styled.div`
`;

const CenterContainer = styled.div`
color: white;
`;

const RightContainer = styled.div`

`;

const Link = styled.a`
color: white;
text-decoration: none;
&:hover {
  color: #007bff;
}
`;

const SocialIcon = styled.a`
  color: white;
  padding: 30px;
  text-decoration: none;
  font-size: 1.5rem;
  &:hover {
    color: #007bff;
  }
`;

export default Footer;
