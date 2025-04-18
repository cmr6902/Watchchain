import React, { useState } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useStateContext } from '@/context/StateContext'
import { isEmailInUse, register } from '@/backend/Auth'
import Link from 'next/link'
import Navbar from '@/components/Dashboard/Navbar'
const Signup = () => {

  const { user, setUser } = useStateContext()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function validateEmail() {
    const emailRegex = /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (emailRegex.test(email) == false) {
      return false;
    }
    console.log('so far so good...')
    // const emailResponse = await isEmailInUse(email)
    // console.log('email response', emailResponse)
    /*     if(emailResponse.length == 0 ){
            return false;
        } */

    return true;
  }

  async function handleSignup() {
    const isValidEmail = await validateEmail()
    // console.log('isValidEmail', isValidEmail)
    // if(!isValidEmail){ return; }

    try {
      await register(email, password, setUser)
      router.push('/')
    } catch (err) {
      console.log('Error Signing Up', err)
    }
  }


  return (
    <>
      <Navbar />
      <Section>
        <Header>Signup</Header>
        <InputTitle>Email</InputTitle>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputTitle>Password</InputTitle>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <UserAgreementText>By signing in, you automatically agree to our <UserAgreementSpan href='/legal/terms-of-use' rel="noopener noreferrer" target="_blank"> Terms of Use</UserAgreementSpan> and <UserAgreementSpan href='/legal/privacy-policy' rel="noopener noreferrer" target="_blank">Privacy Policy.</UserAgreementSpan></UserAgreementText>

        <MainButton onClick={handleSignup}>Signup</MainButton>

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
  margin-top: 100px;
  font-size: 75px; /* Adjusted for better scalability */
  color: white;
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
  // margin: 10px;
  font-size: 5rem;
  jusitfy-content: center;


  &:hover {
    background: green;
    transition: all 0.5s ease;
  }
  `;

const UserAgreementText = styled.p`
font-size: 12px;
margin-top: 20px;
color: #666;
text-align: center;
`;

const UserAgreementSpan = styled(Link)` 
color: #007bff;
cursor: pointer;
`;



export default Signup