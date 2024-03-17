import React from 'react'
import styles from './footer.module.css'
import CurrentTrack from '../CurrentTrack/CurrentTrack'
import PlayerControls from '../PlayerControls/PlayerControls'
import Volume from '../Volume/Volume'

const Footer = () => {
  return (
    <section className={styles.sectionContainer}>
      <CurrentTrack />
      <PlayerControls />
      <Volume />
    </section>
  )
}

export default Footer