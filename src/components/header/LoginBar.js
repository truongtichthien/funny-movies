import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router';
import {joinCls} from '../../utilities';
import {login, logout} from '../../store/action';
import cls from './Header.module.scss';

export default () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loggedIn = useSelector(({loggedIn}) => loggedIn);
  const currentUser = useSelector(({currentUser}) => currentUser);
  const dispatcher = useDispatch();
  const navigate = useNavigate();

  const handleChangeUsername = (e) => {
    const val = e.target.value;
    setUsername(val);
  };

  const handleChangePassword = (e) => {
    const val = e.target.value;
    setPassword(val);
  };

  const handleLogin = () => {
    console.log(username, password);
    dispatcher(login({username, password}));
  };

  const handleLogout = () => {
    dispatcher(logout());
  };

  const navToShare = () => {
    navigate('/share');
  }

  useEffect(() => {}, []);

  return (
    <div className={cls.loginBar}>
      {loggedIn ? (
        <>
          <div>{currentUser.username}</div>
          <button type="button"
                  className={cls.loginBtn}
                  onClick={navToShare}>Share
          </button>
          <button type="button"
                  className={cls.loginBtn}
                  onClick={handleLogout}>Logout
          </button>
        </>
      ) : (
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
                  className={cls.loginBtn}
                  onClick={navToShare}>Share
          </button>
          <button type="button"
                  className={joinCls([cls.loginBtn, (!username || !password) && cls.disabled])}
                  onClick={handleLogin}>Login/Register
          </button>
        </>)}
    </div>
  )
}
