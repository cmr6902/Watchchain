import Hero from "@/components/LandingPage/Hero"
import { styled } from 'styled-components'
import Navbar from "@/components/Dashboard/Navbar"
import Footer from "@/components/LandingPage/Footer"
import RotatingBar from "@/components/LandingPage/RotatingBar"
import Services from "@/pages/Services"
import WatchPostings from "@/pages/Watches"

export default function Home() {
  return (
    <>
        <Navbar/>
        <Hero/>
        <RotatingBar/>
        <Services/>
        <RotatingBar/>
        <WatchPostings/>
        <Footer />
    </>
  )
}


