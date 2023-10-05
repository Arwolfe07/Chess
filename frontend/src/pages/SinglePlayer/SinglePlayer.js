import React, { useState } from 'react'
import SinglePlayerGame from '../../components/SinglePlayerGame/SinglePlayerGame';
import { useSelector } from 'react-redux';
import './SinglePlayer.css';

const SinglePlayer = () => {


  return (
    <div className='single-container'>

      <SinglePlayerGame />

    </div>
  );
};

export default SinglePlayer;