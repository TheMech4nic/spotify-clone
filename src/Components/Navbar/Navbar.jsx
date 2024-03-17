import React, { useEffect } from 'react'
import styles from './navbar.module.css'
import {FaSearch} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import { useStateProvider } from '../../utils/StateProvider'

const Navbar = ({navBackground}) => {
  const [{userInfo}] =  useStateProvider();

  const bgStyle = {
    backgroundColor :  navBackground ? "rgba(0, 0, 0,0.7)" : "transparent"
  }
  
  return (
    <div className={`${styles.navbarContainer}`} style={bgStyle}>
      <div className={styles.searchBar}>
        <FaSearch />
        <input type="text" placeholder='Artists, songs, or podcast' />
      </div>
      <div className={styles.avatar}>
        <a href="#">
          <CgProfile />
          <span className="">{userInfo?.userName}</span>
        </a>
      </div>
    </div>
  )
}

export default Navbar