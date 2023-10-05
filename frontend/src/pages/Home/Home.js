import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'query-string';
import copy from 'copy-to-clipboard';
import ShareButtons from '../../components/ShareButtons/ShareButtons';
import homePic from '../../assets/home-page.jpg';
import copyImg from '../../assets/copy.png';
import Layout from '../../components/Layout';
import './Home.css';
import Toast from '../../components/Toast/Toast';

const Form = () => {
  const [name, setName] = useState('');
  const [gameId, setGameId] = useState('');
  const user = useSelector(state => state.currentUserReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id: inviteId } = qs.parse(location.search);


  // unique game ID generate on loading the page first time
  useEffect(() => {
    if (inviteId) {
      return setGameId(inviteId);
    }
    const id = Math.random().toString().replace('0.', '');
    setGameId(id);
  }, []);

  // single player
  const switchSinglePlayerHandler = () => {
    if (user) {
      navigate('/gameSingle')
    }
    else {
      navigate('/auth');
    }
  };

  // submit
  const submitHandler = (e) => {
    e.preventDefault();
    if (!name && gameId) {
      dispatch({type: 'SET_MESSAGE', message: 'Enter a name first'})
      return;
    }
    navigate(`/game?name=${name}&id=${gameId}`, { replace: true });
  }

  // Share Game Id
  const copyLink = () => {
    copy(gameId);
    alert('Copied Game Id to clipboard');
  }

  return (
    <div className='form-container'>
      <h2>Have a game of Kings and Queens (Online)</h2>
      <form onSubmit={submitHandler} className='form'>
        <input
          type='text'
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Display Name'
        />
        <input
          type='text'
          className='input'
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          placeholder='Game Id'
        />
        <div className='gameId'>
          <span>Game ID: {gameId}</span>
          <img src={copyImg} alt='' style={{ width: '18px', margin: '0 10px', cursor: 'pointer' }} onClick={copyLink}/>
        </div>
        <ShareButtons shareText={`${window.location.href}?`+`id=${gameId}`}
                    subject="Join me for a game of Chess on Stack Chess"/>
        <button className="submit-button" type='submit'>
          {inviteId ? 'Start Game' : 'Create Game'}
        </button>
      </form>
      <h2>or</h2>
      <button className='single-player' onClick={switchSinglePlayerHandler}>Single Player</button>
      <Toast/>
    </div>
  )
}

const Image = () => {
  return <img src={homePic} alt='home-pic' className='home-img' />;
}

const Home = () => {
  return <Layout Image={Image} Content={Form} />;
}

export default Home;