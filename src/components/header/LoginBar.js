import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {joinCls} from '../../utilities';
import {login, logout} from '../../store/action';
import cls from './Header.module.scss';

const GreetingBar = () => {
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const currentUser = useSelector(({authentication: {currentUser}}) => currentUser);

  const handleLogout = () => {
    dispatcher(logout());
  };

  const navToShare = () => {
    navigate('/share');
  }

  return (
    <>
      <div className={cls.greeting}>{`Welcome ${currentUser.username}!`}</div>
      <button type="button"
              className={joinCls([cls.btn, cls.primaryBtn])}
              onClick={navToShare}>Share a movie
      </button>
      <button type="button"
              className={joinCls([cls.btn, cls.secondaryBtn])}
              onClick={handleLogout}>Logout
      </button>
    </>
  );
};

const LoginBar = () => {
  const dispatcher = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeUsername = (e) => {
    const val = e.target.value;
    setUsername(val);
  };

  const handleChangePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  const handleLogin = () => {
    dispatcher(login({username, password}));
  };

  return (
    <>
      <input type="text"
             className={cls.input}
             placeholder="username..."
             value={username}
             onChange={handleChangeUsername}/>
      <input type="password"
             className={cls.input}
             placeholder="password..."
             value={password}
             onChange={handleChangePassword}/>
      <button type="button"
              className={joinCls([cls.btn, cls.primaryBtn, (!username || !password) && cls.disabled])}
              onClick={handleLogin}>Login/Register
      </button>
    </>
  );
};

export default () => {
  const loggedIn = useSelector(({authentication: {loggedIn}}) => loggedIn);

  return (
    <div className={cls.loginBar}>
      {loggedIn ? <GreetingBar/> : <LoginBar/>}
    </div>
  )
}
