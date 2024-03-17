import React, { useEffect, useRef, useState } from 'react'
import styles from './spotify.module.css'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import Body from '../Body/Body'
import Footer from '../Footer/Footer'
import { useStateProvider } from '../../utils/StateProvider'
import axios from 'axios'
import { reducerCases } from '../../utils/Constant'

const Spotify = () => {
    const [{token}, dispatch] = useStateProvider();
    const bodyRef = useRef();
    const [navBackground, setNavBackground] = useState(false);
    const [headerBackgorund, setHeaderBackgorund] = useState(false);
    const bodyScrolled = () => {
        bodyRef.current.scrollTop >= 30 ? setNavBackground(true) : setNavBackground(false)
        bodyRef.current.scrollTop >= 268 ? setHeaderBackgorund(true) : setHeaderBackgorund(false)
    }
    useEffect(() => {
      const getUserInfo = async () => {
        const {data} = await axios.get('https://api.spotify.com/v1/me', {
            headers : {
                Authorization: "Bearer "+token,
                "Content-Type" : "application/json"
            },
        });
        const userInfo = {
            userId : data.id,
            userName : data.display_name
        }
        dispatch({type : reducerCases.SET_USER, userInfo})
      }
      getUserInfo()
    }, [token, dispatch])
    
  return (
    <section className={styles.sectionContainer}>
        <div className={styles.spotifyBody}>
            <Sidebar />
            <div className={styles.body} ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground} />
                <div className={styles.bodyContents}>
                    <Body headerBackgorund={headerBackgorund} />
                </div>
            </div>
        </div>
        <div className={styles.spotifyFooter}>
            <Footer />
        </div>
    </section>
  )
}

export default Spotify