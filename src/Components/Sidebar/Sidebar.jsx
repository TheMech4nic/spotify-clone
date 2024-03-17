import React from 'react'
import styles from './sidebar.module.css'
import {IoLibrary} from 'react-icons/io5'
import {MdHomeFilled, MdSearch} from 'react-icons/md'
import Playlists from '../Playlists/Playlists'

const Sidebar = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.topLinks}>
        <div className={styles.logo}>
          <img 
              className={styles.imgSpotify}
              src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png'
              alt='spotify'
          />
        </div>
        <ul className={styles.quickLinks}>
          <li className={styles.quickLinks_Li}>
            <MdHomeFilled />
            <span>Home</span></li>
          <li className={styles.quickLinks_Li}>
            <MdSearch />
            <span>Search</span></li>
          <li className={styles.quickLinks_Li}>
            <IoLibrary />
            <span>Your Library</span></li>
        </ul>
      </div>
      <Playlists />
    </section>
  )
}

export default Sidebar