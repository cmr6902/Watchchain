import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import {login, isEmailInUse} from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Login = () => {

  const { user, setUser } = useStateContext()
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const router = useRouter()


  async function handleLogin(){
    try {
      await login(email, password);
      router.push("/");
    } 
    catch (error) {
      alert(error.message || "Login failed. Please try again.");
  }
  }


  return (
    <>
    <Navbar/>
    <Section>
        <Header>Login</Header>
        <InputTitle>Email</InputTitle>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <InputTitle>Password</InputTitle>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <MainButton onClick={handleLogin}>Login</MainButton>

    </Section>
    </>
  )
}

const Section = styled.section`
  justify-content: center;
  display: grid;
  background: #121212;
  height: 1200px;
`;

const Header = styled.h1`
  font-size: 75px; /* Adjusted for better scalability */
  color: white;
  margin-top: 100px;
`;

const Input = styled.input`
  font-size: 30px;

`;

const InputTitle = styled.label` /* Changed to label for semantics */
  font-size: 30px;
  color: white;
`;

const MainButton = styled.button`
display: flex;
align-items: center;
background: orangered;
color: white;
padding: 10px 20px;
border: none;
text-decoration: none;
border-radius: 10px;
cursor: pointer;
margin: 10px;
font-size: 5rem;
jusitfy-content: center;


&:hover {
  background: green;
  transition: all 0.5s ease;
}
`;

const UserAgreementText = styled.p`
  font-size: 12px;
  color: #666;
  margin-top: 20px;
  text-align: center;
`;

const UserAgreementSpan = styled(Link)`
  color: #007bff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:not(:last-of-type)::after {
    content: ', '; /* Adds comma between links */
  }
`;


export default Login