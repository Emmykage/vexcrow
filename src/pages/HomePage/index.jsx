import { useNavigate } from 'react-router-dom'
import ClassicBtn from '../../compnents/button/ClassicButton'
import Header from '../../compnents/header/Header'
import ExxlusiveDeals from './components/deals/ExclusiveDeals'
import HighlightInfo from './components/highlight/Highlight'

import './style.scss'
import PopularCards from './components/popular-card/PopularCards'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CallToAction from './components/CallToAction'
import Footer from './components/Footer'
import { Toaster } from '../../compnents/UI/Toaster'
const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="-mt-40 md:-mt-40">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <CallToAction />
        {/* Add Toaster component here */}
      </div>
    </div>
  )
}

export default Home
