import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.scss';
import { useAddLoginMutation, useAddTokenMutation } from '../../redux/registrationAPI';

function Login({ setUser }) {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [disabledEnter, setDisabledEnter] = useState(false);
  const [emailErrorLogin, setEmailErrorLogin] = useState(false);
  const [passwordErrorLogin, setPasswordErrorLogin] = useState(false);
  const [blockErrorLogin, setBlockErrorLogin] = useState(false);
  const [responseErrorLogin, setResponseErrorLogin] = useState('');
  const [responseErrorToken, setResponseErrorToken] = useState('');

  const [login, { isLoading }] = useAddLoginMutation();
  const [token] = useAddTokenMutation();

  const handleInputChangeLogin = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmailLogin(value);
      setEmailErrorLogin(false);
      setBlockErrorLogin(false);
    }
    if (id === 'password') {
      setPasswordLogin(value);
      setPasswordErrorLogin(false);
      setBlockErrorLogin(false);
    }
  };

  const sendingRequestLogin = async () => {
    setResponseErrorLogin('');
    setResponseErrorToken('');
    setBlockErrorLogin(false);
    setDisabledEnter(true);
    setEmailErrorLogin(false);
    setPasswordErrorLogin(false);
    const logData = {
      email: emailLogin,
      password: passwordLogin,
      username: emailLogin,
    };

    login(logData).then((data) => {
      if (data.error) {
        setBlockErrorLogin(true);
        setResponseErrorLogin(data.error.data.detail);
        setUser(false);
      }
      if (data.data) {
        localStorage.setItem('data', data.data.username);
        const tokenBody = { email: emailLogin, password: passwordLogin };
        token(tokenBody).then((data) => {
          if (data.data) {
            localStorage.setItem('accessToken', data.data.access);
            localStorage.setItem('refreshToken', data.data.refresh);
            localStorage.setItem('user', true);
            setUser(true);
          }
          if (data.error) {
            setBlockErrorLogin(true);
            setResponseErrorToken(data.error.data.detail);
            setUser(false);
          }
        });
      }
    });
  };

  const handleSubmitLogin = () => {
    if (emailLogin !== '' && passwordLogin !== '') {
      sendingRequestLogin();
    } else {
      if (emailLogin === '') {
        setEmailErrorLogin(true);
      }
      if (passwordLogin === '') {
        setPasswordErrorLogin(true);
      }

      console.log('не ок');
    }
  };

  const clickRegButton = () => {
    localStorage.clear('accessToken');
    localStorage.clear('refreshToken');
    setUser(false);
  };

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <img className={styles.logo__image} src="img/logo2.png" alt="logo" />
      </div>
      <input
        type="email"
        id="email"
        value={emailLogin}
        onChange={(e) => handleInputChangeLogin(e)}
        placeholder="Почта"
      />
      {emailErrorLogin && <p> Не заполнена почта</p>}
      <input
        type="password"
        id="password"
        value={passwordLogin}
        onChange={(e) => handleInputChangeLogin(e)}
        placeholder="Пароль"
      />
      {passwordErrorLogin && <p> Не заполнен пароль</p>}
      <button
        disabled={isLoading ? true : false}
        onClick={() => handleSubmitLogin()}
        className={!disabledEnter ? styles.login__button1 : styles.login__button1_active}
        type="button">
        Войти
      </button>
      <Link to="/register">
        <button onClick={() => clickRegButton()} className={styles.login__button2} type="button">
          Зарегестрироваться
        </button>
      </Link>
      {blockErrorLogin && (
        <div className={styles.error}>
          {<p>{responseErrorLogin}</p>}
          {<p>{responseErrorToken}</p>}
        </div>
      )}
    </div>
  );
}
export default Login;
