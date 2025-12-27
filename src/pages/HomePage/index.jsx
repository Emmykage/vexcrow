import { useNavigate } from 'react-router-dom'
import ClassicBtn from '../../compnents/button/ClassicButton'
import Header from '../../compnents/header/Header'
import ExxlusiveDeals from './components/deals/ExclusiveDeals'
import HighlightInfo from './components/highlight/Highlight'

import './style.scss'
import PopularCards from './components/popular-card/PopularCards'
const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="-mt-40 md:-mt-40">
      <Header />
      <section className="h-screen lg:h-[900px] relative p-4 w-full hero-header">
        <div className="max-w-app-layout  items-center h-full grid sm:grid-cols-2 m-auto w-full">
          <div className="p-5 mt-10 bg-gray-900/40 rounded-lg">
            <h2 className="lg:text-6xl text-3xl text-white font-bold">
              Get Awesome experience paying your bills{' '}
            </h2>
            <p className="text-2xl text-gray-300 leading-10  my-6 font-semibold">
              Top up your mobile data and pay utility bills
            </p>
            <ClassicBtn
              onclick={() => navigate('/login')}
              className={
                'text-base h-14 !text-primary uppercase rounded-3xl !bg-alt font-semibold !hover:text-primary/50 !hover:bg-alt/80'
              }
            >
              {' '}
              Get Started
            </ClassicBtn>
          </div>
        </div>
        <svg className="wave" viewBox="0 0 1440 150" preserveAspectRatio="none">
          <path d="M0,0 C360,100 1080,0 1440,100 L1440,150 L0,150 Z" fill="white" />
        </svg>
      </section>

      <HighlightInfo />
      <PopularCards />

      <ExxlusiveDeals />

      <section id="app" className="py-20 px-4 bg-gray-100">
        <div className="max-w-4xl m-auto">
          <h2 className="text-primary text-4xl font-semibold text-center my-4">
            Sort bills for your loved ones on the App
          </h2>
        </div>
        <div className="flex justify-center items-center">
          <a target="_blank" href="https://apps.apple.com/ng/app/bitbridge-utility/id6749049356 ">
            <img src="/images/appstore.png" alt="app store" className="h-14 " />
          </a>
          <a
            target="_blank"
            href={'https://play.google.com/store/apps/details?id=com.vortech.bitbridgeapp'}
          >
            <img src="/images/playstore.png" alt="play store" className="h-14 " />
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
