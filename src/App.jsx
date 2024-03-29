import React, { useEffect } from 'react'
import Login from './Components/Login/Login'
import { useStateProvider } from './utils/StateProvider';
import { reducerCases } from './utils/Constant';
import Spotify from './Components/Spotify/Spotify';

const App = () => {
  const [{ token }, dispatch] = useStateProvider();

  useEffect (() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("&")[0].split("=")[1];
      if (token) {
        dispatch({ type: reducerCases.SET_TOKEN, token });
      }
    }
    document.title = "Spotify";
  }, [dispatch, token]);

  return <div>{token ? <Spotify /> : <Login />}</div>;
}

export default App