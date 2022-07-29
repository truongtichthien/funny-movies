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
      <div className={cls.loginGroupInput}>
        <div className={cls.greeting}>{`Welcome ${currentUser.username}!`}</div>
        <button type="button"
                className={joinCls([cls.btn, cls.primaryBtn])}
                onClick={navToShare}>Share a movie
        </button>
        <button type="button"
                className={joinCls([cls.btn, cls.secondaryBtn])}
                onClick={handleLogout}>Logout
        </button>
      </div>
    </>
  );
};

const LoginBar = () => {
  const dispatcher = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginFailed = useSelector(({authentication: {failed}}) => failed);
  const loggingIn = useSelector(({authentication: {loading}}) => loading);

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
      <div className={cls.loginGroupInput}>
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
                className={joinCls([cls.btn, cls.primaryBtn, (!username || !password || loggingIn) && cls.disabled])}
                onClick={handleLogin}>{loggingIn ? 'Processing...' : 'Login/Register'}
        </button>
      </div>
      {loginFailed && <div className={cls.errorMsg}>Login failed! Please check your password!</div>}
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
