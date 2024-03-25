import React from 'react';
import { useNavigate } from 'react-router-dom';


import styles from './register.module.scss';
import { userNameContext } from '../../routes/routes';
import { useAddRegistrationMutation } from '../../redux/registrationAPI';

function Register() {
    
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [checkedPasswordError, setCheckedPasswordError] = React.useState(false);
  const [responseError, setResponseError] = React.useState({});
  const [errorBlock, setErrorBlock] = React.useState(false);

  const { setDataUser } = React.useContext(userNameContext);

  const [registration, { isLoading }] = useAddRegistrationMutation();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'email') {
      setEmail(value);
      setEmailError(false);
      setErrorBlock(false);
    }
    if (id === 'password') {
      setPassword(value);
      setPasswordError(false);
      setErrorBlock(false);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
      setConfirmPasswordError(false);
      setErrorBlock(false);
    }
  };

  const sendingRequest = () => {
    setResponseError({});
    setCheckedPasswordError(false);
    setConfirmPasswordError(false);
    setPasswordError(false);
    setEmailError(false);
    setErrorBlock(false);

    const regData = {
      email,
      password,
      username: email,
    };

    registration(regData).then((data) => {
     
      if (data.data && data.data.email && email.includes('@')) {
        setDataUser(localStorage.getItem('data'));
        navigate('/login');
      }
      if (data.error) {
        setResponseError(data.error.data);
        setErrorBlock(true);
      }
    });
  };

  const handleSubmit = () => {
    if (email !== '' && password !== '' && password === confirmPassword) {
      sendingRequest();
    } else {
      if (email === '') {
        setEmailError(true);
      }
      if (password === '') {
        setPasswordError(true);
      }
      if (confirmPassword === '') {
        setConfirmPasswordError(true);
      }

      if (password !== confirmPassword) {
        setCheckedPasswordError(true);
      }
      console.log('не ок');
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.logo}>
        <img className={styles.logo__image} src="img/logo2.png" alt="logo" />
      </div>
      <input
        type="email"
        id="email"
        className="form__input"
        value={email}
        onChange={(e) => handleInputChange(e)}
        placeholder="Почта"
      />
      {emailError && <p> Не заполнена почта</p>}
      <input
        className="form__input"
        type="password"
        id="password"
        value={password}
        onChange={(e) => handleInputChange(e)}
        placeholder="Пароль"
      />
      {passwordError && <p> Не заполнен пароль</p>}
      <input
        className="form__input"
        type="password"
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => handleInputChange(e)}
        placeholder="Повторите пароль"
      />
      {checkedPasswordError && <p>Не совпадает пароль </p>}
      {confirmPasswordError && <p>Не заполнен повторный пароль </p>}
      <button
        className={!isLoading ? styles.button_btn : styles.button_btn_active}
        disabled={isLoading ? true : false}
        onClick={() => handleSubmit()}
        type="button">
        Зарегестрироваться
      </button>

      {errorBlock && (
        <div className={styles.errors}>
          {<p>{responseError.email}</p>}
          {<p>{responseError.password}</p>}
        </div>
      )}
    </div>
  );
 
}
export default Register;
