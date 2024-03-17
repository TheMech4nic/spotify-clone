import React, { useEffect } from 'react'
import styles from './body.module.css'
import {AiFillClockCircle} from "react-icons/ai"
import { useStateProvider } from '../../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../../utils/Constant';

const Body = ({headerBackgorund}) => {
  const [{token, selectedPlaylistId, selectedPlaylist}, dispatch] =  useStateProvider();
  const bgStyle = {
    backgroundColor :  headerBackgorund ? "#000000dc" : "transparent"
  } 

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id : response.data.id,
        name : response.data.name,
        description : response.data.description.startsWith("<a") ? "" : response.data.description,
        image : response.data.images[0].url,
        tracks : response.data.tracks.items.map(({track}) => ({
          id : track.id,
          name : track.name,
          artists : track.artists.map((artist) => artist.name),
          image : track.album.images[2].url,
          duration : track.duration_ms,
          album : track.album.name,
          constext_uri : track.album.uri,
          track_number : track.track_number
        }))
      }
      dispatch({type : reducerCases.SET_PLAYLIST, selectedPlaylist})
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const msToMinSec = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = Math.floor((ms%60000)/1000).toFixed(0);
    return `${minutes} : ${seconds < 10 ? 0 : ""}${seconds}`
  }

  const playTrack = async (id, name, artists, image, constext_uri, track_number) => {
    const response = await axios.put(`https://api.spotify.com/v1/me/play`, 
    {
      constext_uri,
      offset :{
        position : track_number-1,

      },
      position_ms : 0
    },
    {
      headers : {
          Authorization: "Bearer "+token,
          "Content-Type" : "application/json"
      },
    });
    if(response.status === 204){
      const currentlyPlaying = {
        id,
        name,
        artists,
        image
      }
      dispatch({type: reducerCases.SET_PLAYING, currentlyPlaying})
      dispatch({type: reducerCases.SET_PLAYER_STATE, playerState : true})
    }else{
      dispatch({type: reducerCases.SET_PLAYER_STATE, playerState : true})
    }
  }
  
  return (
    <section>
      {
        selectedPlaylist && (
          <>
            <div className={styles.playlist}>
              <div className={styles.image}>
                <img src={selectedPlaylist.image} alt="selectedplaylist" />
              </div>
              <div className={styles.details}>
                <span className="type">PLAYLIST</span>
                <h1 className={styles.title}>{selectedPlaylist.name}</h1>
                <p className='description'>{selectedPlaylist.description}</p>
              </div>
            </div>
            <div className="lists">
              <div className={styles.headRow} style={bgStyle}>
                <div className="col">
                  <span>#</span>
                </div>
                <div className="col">
                  <span>TITLE</span>
                </div>
                <div className="col">
                  <span>ALBUM</span>
                </div>
                <div className="col" style={{display : 'flex',justifyContent : 'end'}}>
                  <span>
                    <AiFillClockCircle />
                  </span>
                </div>
              </div>
              <div className={styles.tracks}>
                {
                  selectedPlaylist.tracks.map(({id, name, artists, image, duration, album, constext_uri, track_number}, index) => {
                    return (
                      <div className={styles.row} key={id} onClick={() => playTrack(id, name, artists, image,  constext_uri, track_number)}>
                        <div className={styles.col}>
                          <span>{index+1}</span>
                        </div>
                        <div className={`${styles.detail} ${styles.col}`}>
                          <div className="image">
                            <img src={image} alt="track" />
                          </div>
                          <div className={styles.info}>
                            <span className="name">{name}</span>
                            <span className="artist">{artists.join(", ")}</span>
                          </div>
                        </div>
                        <div className={styles.col}>
                          <span>{album}</span>
                        </div>
                        <div className={styles.col} style={{justifyContent : 'end'}}>
                          <span>{msToMinSec(duration)}</span>
                        </div>
                      </div>
                    )

                  })
                }
              </div>
            </div>
          </>
        )
      }
    </section>
  )
}

export default Body