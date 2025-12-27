import { NavLink } from 'react-router-dom'
import './nav.scss'
import { Button } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const Nav = ({ open, setToggle }) => {
  const navRef = useRef()
  const active = 'active text-alt'
  const inActive = `inactive text-alt`

  // const inActive = `inactive  ${(pathname !== "/" && pathname !== "/phone-top-up" ) && "text-primary"}`
  const closeNav = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      if (open) {
        setToggle(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', closeNav)

    return () => {
      document.removeEventListener('mousedown', closeNav)
    }
  }, [navRef, closeNav]) // Add `open` as a dependency

  return (
    <div className="w-full">
      <div
        ref={navRef}
        className={`navslide md:my-0  m-auto w-full md:bg-transparent fixed md:static h-screen md:h-auto top-0 shadow md:shadow-none rounded transition-all duration-150 ease-linear ${
          open ? 'left-0' : '-left-full'
        } text-primary z-50 max-w-sm md:max-w-7xl w-full`}
      >
        <Button
          onClick={() => setToggle((prev) => !prev)}
          className="md:hidden mt-10 ml-auto flex mr-5"
          shape="circle"
          icon={<CloseOutlined />}
        />
        <ul className="flex w-full px-5 justify-center bg-gray-900 md:px-0 py-10 md:py-5 b flex-col md:flex-row hidde gap-5 text-lg font-semibold">
          <li to="#" className="font-medium">
            <NavLink className={({ isActive }) => (isActive ? active : inActive)} to={'/'}>
              Home
            </NavLink>
          </li>
          {/* <li to="#" className="font-medium">
          <NavLink className={({isActive}) => isActive ? active : inActive} to={"/gift-cards"}>Gift Cards</NavLink>
        </li> */}
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? active : inActive)}
              to={'/phone-top-up'}
            >
              Phone Top Ups
            </NavLink>
          </li>
          {/* <li>
        <NavLink 
        className={({isActive}) => isActive ? active : inActive}
        to={"/crypto-exchange"}
        >Crypto Exchange</NavLink>
        </li> */}

          <li>
            <NavLink
              className={({ isActive }) => (isActive ? active : inActive)}
              to={'/utility-services'}
            >
              Utility & Services{' '}
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

Nav.propTypes = {
  setToggle: PropTypes.func,
  open: PropTypes.bool,
}
export default Nav
