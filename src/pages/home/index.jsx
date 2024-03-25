import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import styles from './home.module.scss';
import Track from '../../components/Track/Track';
import MyLoader from '../../components/MyLoader';
import { Filter } from '../../components/Filter/Filter';
import Nav from '../../components/Nav/Nav';
import Search from '../../components/Search/Search';
import MyLoaderRight from '../../components/MyLoaderRight';
import SideBar from '../../components/Sidebar/Sidebar';
import { setCopyRequestResponse, setDataAll, setListTracksToPlay } from '../../redux/slices/song';
import { useGetFavoritesQuery } from '../../redux/favoritesAPI';
import { useNewTokenMutation } from '../../redux/registrationAPI';

function Home({ setUser, setOpen, favoritesPage, homePage }) {
  const dispatch = useDispatch();

  const selectedValue = useSelector((state) => state.song.valueFromSearch);
  const selectedValueGenre = useSelector((state) => state.song.valueGenre);
  const selectedValueAuthor = useSelector((state) => state.song.valueAuthor);
  const selectedValueYearUp = useSelector((state) => state.song.valueYearUp);
  const selectedValueYearDown = useSelector((state) => state.song.valueYearDown);

  const [loader, setLoader] = useState(true);
  const [item, setItem] = useState([]);
  const [likeId, setLikeId] = useState([]);
  const [addError, setAddError] = useState(null);
  const [changeToken] = useNewTokenMutation();
  const { data = [], isSuccess } = useGetFavoritesQuery({}, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    isSuccess && setLikeId(data.map((el) => el.id));
  }, [data, isSuccess]);

  const filteredTracks = item
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(selectedValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .filter((el) => {
      if (selectedValueGenre.length === 0) {
        return true;
      }
      return selectedValueGenre.includes(el.genre);
    })
    .filter((el) => {
      if (selectedValueAuthor.length === 0) {
        return true;
      }
      return selectedValueAuthor.includes(el.author);
    })
    .sort((a, b) => {
      if (selectedValueYearUp === false) {
        return true;
      }
      return new Date(a.release_date) - new Date(b.release_date);
    })
    .sort((a, b) => {
      if (selectedValueYearDown === false) {
        return true;
      }
      return new Date(b.release_date) - new Date(a.release_date);
    });

  const tracks = filteredTracks.map((obj, index) => (
    <Track
      setOpen={setOpen}
      key={obj.id}
      {...obj}
      all={obj}
      index={index}
      favoritesPage={favoritesPage}
      homePage={homePage}
    />
  ));

  const skeletons = [...new Array(2)].map((_, index) => <MyLoader key={Math.random(index)} />);

  const refreshToken = { refresh: localStorage.getItem('refreshToken') };

  useEffect(() => {
    setLoader(true);
    axios
      .get('https://skypro-music-api.skyeng.tech/catalog/track/all/')

      .then((res) => {
        setItem(res.data);
        setLoader(false);
        dispatch(setCopyRequestResponse(res.data));
        dispatch(setDataAll(res.data));
      })
      .catch((error) => {
        console.log(error);

        setAddError('Не удалось загрузить плейлист, попробуйте позже');
      });

    window.scrollTo(0, 0);
    changeToken(refreshToken).then((data) => {
      if (data.data) {
        localStorage.setItem('accessToken', data.data.access);
      }
    });
  }, []);

  const loaderTest = () => {
    setTimeout(() => {
      setLoader(!true);
    }, 2000);
  };
  useEffect(() => {
    dispatch(setListTracksToPlay(filteredTracks));
  }, [filteredTracks]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav setUser={setUser} setOpen={setOpen} />
        <div className={styles.main}>
          <div className={styles.centerblock}>
            <Search />
            <div>
              <h2 className={styles.centerblock__h2}>Треки</h2>
              <Filter />
              <div className={styles.centerblock__content}>
                <div className={styles.playlist_title}>
                  <div className={`${styles.playlist_title__col} ${styles.col01}`}>Трек</div>
                  <div className={`${styles.playlist_title__col} ${styles.col02}`}>ИСПОЛНИТЕЛЬ</div>
                  <div className={`${styles.playlist_title__col} ${styles.col03}`}>АЛЬБОМ</div>
                  <div className={`${styles.playlist_title__col} ${styles.col04}`}>
                    <svg className={styles.playlist_title__svg} alt="time">
                      <use href="/img/icon/sprite.svg#icon-watch" />
                    </svg>
                  </div>
                </div>
                <div className={styles.content__playlist}>
                  {loaderTest()}
                  {loader ? skeletons : tracks}
                  <p>{addError}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.sidebar}>
            <SideBar setUser={setUser} setOpen={setOpen} />
            {loaderTest()}
            {loader ? (
              <MyLoaderRight />
            ) : (
              <div className={styles.sidebar__block}>
                <div className={styles.sidebar__list}>
                  <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} to="/category/1">
                      <img
                        className={styles.sidebar__img}
                        src="img/playlist01.png"
                        alt="day's playlist"
                      />
                    </Link>
                  </div>
                  <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} to="/category/2">
                      <img
                        className={styles.sidebar__img}
                        src="img/playlist02.png"
                        alt="day's playlist"
                      />
                    </Link>
                  </div>
                  <div className={styles.sidebar__item}>
                    <Link className={styles.sidebar__link} to="/category/3">
                      <img
                        className={styles.sidebar__img}
                        src="img/playlist03.png"
                        alt="day's playlist"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className={styles.bar}></div>
      <footer className={styles.footer} />
    </div>
  );
}
export default Home;
