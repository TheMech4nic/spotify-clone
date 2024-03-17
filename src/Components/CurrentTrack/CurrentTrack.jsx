import React, { useEffect } from 'react'
import styles from './currentTrack.module.css'
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constant';

const CurrentTrack = () => {
    const [{token, currentlyPlaying}, dispatch] = useStateProvider();
    useEffect(() => {
        const getCurrentTrack = async () => {
            const response = await axios.get('https://api.spotify.com/v1/me/player/currently-playing', {
                headers : {
                    Authorization: "Bearer "+token,
                    "Content-Type" : "application/json"
                },
            })
           if(response.data !== ""){
            const {item} = response.data;
            const currentlyPlaying = {
                id : item.id,
                name : item.name,
                artists : item.artists.map((artist) => artist.name),
                image : item.album.images[2].url
            }
            dispatch({type : reducerCases.SET_PLAYING, currentlyPlaying})
           }
          }
          getCurrentTrack()
    }, [token])
    
  return (
    <div className={styles.trackContainer}>
        {
            currentlyPlaying && (
                <div className={styles.track}>
                    <div className="trackImage">
                        <img src={currentlyPlaying.image} alt="currentlyplaying" />
                    </div>
                    <div className={styles.trackInfo}>
                        <h4 className="">{currentlyPlaying.name}</h4>
                        <h6>{currentlyPlaying.artists.join(", ")}</h6>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default CurrentTrack