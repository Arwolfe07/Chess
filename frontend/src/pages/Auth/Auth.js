import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, signup } from '../../actions/auth';
import './Auth.css';
import Toast from '../../components/Toast/Toast';

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!email && !password) {
      dispatch({ type: 'SET_MESSAGE', message: 'Please enter email and password' });
      return;
    }
    if (isSignup) {
      if (!name) {
        dispatch({ type: 'SET_MESSAGE', message: 'Please enter a user name' });
        return;
      }
      if (password.length < 8) {
        dispatch({ type: 'SET_MESSAGE', message: 'Password must contain atleast 8 letters' });
        return;

      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  }

  return (
    <div className='auth-container'>
      <form className='auth-form' onSubmit={formSubmitHandler}>
        <p className='head-auth'>{isSignup ? 'Signup Form' : 'Login Form'}</p>
        {isSignup &&
          <input
            type='text'
            className='input'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Username'
          />
        }
        <input
          type='email'
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <button className="submit-button" type='submit'>
          {isSignup ? 'Sign In' : 'Login'}
        </button>
        {!isSignup && <p>Do not have an account? <span onClick={() => setIsSignup(!isSignup)}>Sign Up</span></p>}
        {isSignup && <p>Already have an account? <span onClick={() => setIsSignup(!isSignup)}>Login</span></p>}
      </form>
      <Toast />
    </div>
  )
}

export default Auth;