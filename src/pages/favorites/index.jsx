import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Search from '../../components/Search/Search';
import Sidebar from '../../components/Sidebar/Sidebar';
import Track from '../../components/Track/Track';
import styles from '../home/home.module.scss';
import { useGetFavoritesQuery } from '../../redux/favoritesAPI';
import { setFavorites, setListTracksToPlay } from '../../redux/slices/song';
import { useNewTokenMutation } from '../../redux/registrationAPI';

function Favorites({ setUser, setOpen, favoritesPage, homePage, setLike, like }) {
  const dispatch = useDispatch();
  const selectedFavoritesId = useSelector((state) => state.song.favorites);
  const selectedValueFromFavorites = useSelector((state) => state.song.valueFromSearch);
  const [refreshTokenExecuted, setRefreshTokenExecuted] = useState(false);
  const { data = [] } = useGetFavoritesQuery({}, { refetchOnMountOrArgChange: true });
  const [upToken] = useNewTokenMutation();
  const refreshToken = { refresh: localStorage.getItem('refreshToken') };

  useEffect(() => {
    if (!refreshTokenExecuted) {
      upToken(refreshToken).then((data) => {
        if (data.data) {
          localStorage.setItem('accessToken', data.data.access);
        }
      });
      setRefreshTokenExecuted(true);
    }
  }, [refreshTokenExecuted]);

  useEffect(() => {
    if (data && data.length > 0) {
      const favoritesId = data.map((item) => item.id);
      dispatch(setFavorites(favoritesId));
      dispatch(setListTracksToPlay(data));
    }
  }, [data]);

  const tracksFavorite = data
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(selectedValueFromFavorites.toLowerCase())) {
        return true;
      }
      return false;
    })
    .filter((obj) => {
      if (selectedFavoritesId.includes(obj.id)) {
        return true;
      }
      return false;
    })
    .map((obj, index) => (
      <Track
        setOpen={setOpen}
        key={obj.id}
        {...obj}
        index={index}
        favoritesPage={favoritesPage}
        homePage={homePage}
        setLike={setLike}
        like={like}
      />
    ));

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav setUser={setUser} setOpen={setOpen} />
        <div className={styles.main}>
          <div className={styles.centerblock}>
            <Search />
            <div>
              <h2 className={styles.centerblock__h2}>Мои треки</h2>
              <div className={styles.centerblock__content}>
                <div className={styles.playlist_title}>
                  <div className={`${styles.playlist_title__col} ${styles.col01}`}>Трек</div>
                  <div className={`${styles.playlist_title__col} ${styles.col02}`}>ИСПОЛНИТЕЛЬ</div>
                  <div className={`${styles.playlist_title__col} ${styles.col03}`}>АЛЬБОМ</div>
                  <div className={`${styles.playlist_title__col} ${styles.col04}`}>
                    <svg className={styles.playlist_title__svg} alt="time">
                      <use href="img/icon/sprite.svg#icon-watch" />
                    </svg>
                  </div>
                </div>
                <div className={styles.content__playlist}>{tracksFavorite}</div>
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            <Sidebar setUser={setUser} setOpen={setOpen} />
          </div>
        </div>
      </main>
      <div className={styles.bar}></div>
      <footer className={styles.footer} />
    </div>
  );
}
export default Favorites;
