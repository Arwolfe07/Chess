import React, { useEffect } from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home/Home';
import Game from './pages/Game/Game';
import './App.css';
import Auth from './pages/Auth/Auth';
import SinglePlayer from './pages/SinglePlayer/SinglePlayer';
import { useDispatch } from 'react-redux';
import { currentUser } from './actions/currentUser';

const router = createBrowserRouter([{
  path: '/',
  children: [
    {
      index: true,
      element: <Home />
    },
    {
      path: '/game',
      element: <Game />
    },
    {
      path: '/auth',
      element: <Auth/>
    },
    {
      path: '/gameSingle',
      element: <SinglePlayer/>
    }
  ]
}])

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(currentUser(JSON.parse(localStorage.getItem('Profile'))));
  })
  return (<RouterProvider router={router} />);
}

export default App;
