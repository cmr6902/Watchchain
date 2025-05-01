import React from 'react';
import styled from 'styled-components';
import Link from 'next/link'
import { logOut } from '@/backend/Auth';
import { ethers } from "ethers";
import { useState } from "react";
const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  // connect wallet 
  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const wallet = accounts[0];
        setWalletAddress(wallet);
        setUser(wallet);
      } 
      catch (error) {
        console.error("User denied connection:", error);
      }
    } 
  };

  // disconnect
  const disconnectWallet = () => {
    setWalletAddress(null);
  };
  return (
    <Nav role="navigation" aria-label="Main Navigation">
      <NavContainer>
        {/* Logo with Logout Function */}
        <Logo onClick={() => logOut(setUser)} href="/">WatchChain</Logo>

        {/* Home Component */}
        {/* <Home /> */}

        {/* links */}
        <NavMenu>
          {walletAddress ? (
            <>
            <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Services">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/AvaWatches"> Available Watches</NavLink>
          </NavItem>
            </>
          ):(
            <>
            <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Services">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/Watches">Watches</NavLink>
          </NavItem>
            </>
          )}
        </NavMenu>
        <NavLinks>
        {walletAddress ? ( // if wallet is connected
          <>
            <ConnectButton disabled>
              Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </ConnectButton>
            <DisconnectButton onClick={disconnectWallet}>
              Disconnect Wallet
            </DisconnectButton>
          </>
        ) : ( // not connected
            <ConnectButton onClick={connectWallet}>
            Connect Wallet
            </ConnectButton>
        )}
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};


const Nav = styled.nav`
width: 100%;
position: fixed;
top: 0;
left: 0;
background: darkblue;
z-index: 1000;
padding: 0 50px;
height: 80px;
display: flex;
align-items: center;
`;

const NavContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
`

const Logo = styled(Link)`
font-size: 2rem;
  color: white;
  text-decoration: none;
  cursor: pointer;
`;

const NavMenu = styled.ul`
display: flex;
  justify-content: center;
  list-style: none;
  margin: 0 auto;
`
const NavItem = styled.li`
height: 80px;
`

const NavLink = styled(Link)`
display: flex;
align-items: center;
color: white;
text-decoration: none;
height: 100%;
padding: 0 1rem;
cursor: pointer;

&:hover {
  color: green;
  transition: all 0.5s ease;
}
`;

const ConnectButton = styled.button`
display: flex;
align-items: center;
background: black;
color: white;
padding: 10px 20px;
border: none;
text-decoration: none;
border-radius: 10px;
cursor: pointer;
margin: 10px;


&:hover {
  background: green;
  transition: all 0.5s ease;
}
`;

const DisconnectButton = styled.button`
display: flex;
align-items: center;
background: black;
color: white;
padding: 10px 20px;
border: none;
text-decoration: none;
border-radius: 10px;
cursor: pointer;
margin: 10px;


&:hover {
  background: green;
  transition: all 0.5s ease;
}
`;

const NavLinks = styled.div`
display: flex;
align-items: center;
`

const LogoutButton = styled.button`
display: flex;
align-items: center;
background: black;
color: white;
padding: 10px 20px;
border: none;
text-decoration: none;
border-radius: 10px;
cursor: pointer;
margin: 10px;
font-size: 1rem;


&:hover {
  background: green;
  transition: all 0.5s ease;
}
`;

export default Navbar;
