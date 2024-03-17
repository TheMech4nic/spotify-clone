import React from 'react'
import style from './login.module.css'

const Login = () => {

  const handleClick = () => {
    const clientId = "ea0e0c7005824594b7f1cca129b3824c";
    const redirectUrl = "http://localhost:5173";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scope = [
      'user-read-email', 
      'user-read-private', 
      'user-read-playback-state',
      'user-modify-playback-state' , 
      'user-read-currently-playing',
      'user-read-playback-position',
      'user-top-read',
      'user-read-recently-played'
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
      " "
    )}&response_type=token&show_dialog=true`;
  }

  return (
    <div className={style.container}>
        <img 
            className={style.imgSpotify}
            src='https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png'
            alt='spotify'
        />
        <button type='button' className={style.connectButton} onClick={handleClick}>Connect Spotify</button>
    </div>
  )
}

export default Login