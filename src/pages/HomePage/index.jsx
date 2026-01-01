import Header from '../../compnents/header/Header'

import './style.scss'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import CallToAction from './components/CallToAction'
const Home = () => {
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
