import React, { useContext, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { userNameContext } from '../../routes/routes';
import { setNameTrack } from '../../redux/slices/song';
import { useDispatch } from 'react-redux';

function Sidebar({ setUser, setOpen }) {
  const { dataUser, setDataUser } = useContext(userNameContext);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  
  useEffect(() => {
    setDataUser(localStorage.getItem('data'));
  }, []);

  const exitIcon = () => {
    setUser(false);
    localStorage.clear();
    navigate('/login');
    setOpen(false);
    dispatch(setNameTrack(''));
  };

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personal_name}>{dataUser}</p>
        <div className={styles.sidebar__avatar}>
          <svg alt="exit" onClick={() => exitIcon()}>
            <use href="/img/icon/sprite.svg#icon-exit" />
          </svg>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
