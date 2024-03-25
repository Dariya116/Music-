import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Track.module.scss';
import {
  setIndexTrack,
  setNameTrack,
  setUrlTrack,
  setIcon,
  setPulse,
  setRequestResponse,
  setCopyRequestResponse,
  setIdTrackForLike,
  setFavorites,
  setListTracksToPlay,
} from '../../redux/slices/song';
import {
  useAddFavoritesTracksMutation,
  useDeleteFavoritesTracksMutation,
  useLazyGetFavoritesQuery,
} from '../../redux/favoritesAPI';
import { useNewTokenMutation } from '../../redux/registrationAPI';

function Track({
  author,
  name,
  album,
  duration_in_seconds,
  track_file,
  id,
  setOpen,
  index,
  favoritesPage,
  homePage,
  categoryOne,
  categoryTwo,
  categoryThree,
}) {
  const dispatch = useDispatch();
  let requestResponseTrack = useSelector((state) => state.song.requestResponse);
  const selectedTrack = useSelector((state) => state.song.nameTrack);
  const selectedIcon = useSelector((state) => state.song.icon);
  const selectedPulse = useSelector((state) => state.song.pulse);
  const selectedListFavorite = useSelector((state) => state.song.listTracksToPlay);
  let copyRequestResponseHome = useSelector((state) => state.song.copyRequestResponse);
  const selectedFavorites = useSelector((state) => state.song.favorites);
  const selectedMixPlay = useSelector((state) => state.song.mix);
  const currentIndexTrack = useSelector((state) => state.song.indexTrack);
  const [updateToken] = useNewTokenMutation();

  const ref = useRef();
  const [addTracks] = useAddFavoritesTracksMutation();

  const [deleteTracks] = useDeleteFavoritesTracksMutation();
  function shuffle(array) {
    let newArray = array.slice();
    let originalArray = array.slice();
    let currentIndex = newArray.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = newArray[currentIndex];
      newArray[currentIndex] = newArray[randomIndex];
      newArray[randomIndex] = temporaryValue;
    }

    return { shuffledArray: newArray, originalArray: originalArray };
  }

  const clickTrack = (e) => {
    if (homePage) {
      dispatch(setRequestResponse(copyRequestResponseHome));
      if (selectedMixPlay) {
        let newRequestResponseTrack = shuffle(copyRequestResponseHome);

        dispatch(setRequestResponse(newRequestResponseTrack.shuffledArray));

        dispatch(
          setIndexTrack(
            newRequestResponseTrack.shuffledArray.indexOf(requestResponseTrack[currentIndexTrack]),
          ),
        );
      }
    }
    if (favoritesPage || categoryOne || categoryTwo || categoryThree) {
      dispatch(setRequestResponse(selectedListFavorite));
      dispatch(setCopyRequestResponse(selectedListFavorite));
      if (selectedMixPlay) {
        let newRequestResponseTrack = shuffle(selectedListFavorite);

        dispatch(setRequestResponse(newRequestResponseTrack.shuffledArray));

        dispatch(
          setIndexTrack(
            newRequestResponseTrack.shuffledArray.indexOf(requestResponseTrack[currentIndexTrack]),
          ),
        );
      }
    }

    dispatch(setRequestResponse(selectedListFavorite));
    dispatch(setCopyRequestResponse(selectedListFavorite));

    e.preventDefault();
    dispatch(setNameTrack({ name, author, id }));
    dispatch(setIndexTrack(index));
    dispatch(setIdTrackForLike(id));
    setOpen(true);
    dispatch(setIcon(true));
    dispatch(setPulse(true));
    dispatch(setUrlTrack(track_file));
    sessionStorage.setItem('url', track_file);

    if (selectedMixPlay) {
      let newRequestResponseTrack = shuffle(selectedListFavorite);

      dispatch(setRequestResponse(newRequestResponseTrack.shuffledArray));

      dispatch(
        setIndexTrack(
          newRequestResponseTrack.shuffledArray.indexOf(requestResponseTrack[currentIndexTrack]),
        ),
      );
    }
  };

  const onKeyPressTrack = (e) => {
    const enterOrSpace =
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.which === 13 ||
      e.which === 32;

    if (enterOrSpace) {
      e.preventDefault();
      clickTrack(e);
    }
  };

  function secondsToTime() {
    const minutes = duration_in_seconds % (60 * 60);
    const m = Math.floor(minutes / 60);
    const seconds = minutes % 60;
    const s = Math.ceil(seconds);

    return `${m}:${s < 10 ? `0${s}` : s}`;
  }
  const time = secondsToTime(duration_in_seconds);

  const [favoritesData, { data }] = useLazyGetFavoritesQuery();

  const refreshToken = { refresh: localStorage.getItem('refreshToken') };

  useEffect(() => {
    favoritesData();
  }, []);

  useEffect(() => {
    if (data) {
      const favoritesId = data.map((item) => item.id);
      dispatch(setFavorites(favoritesId));
    }
  }, [data]);

  const handleLike = async () => {
    await updateToken(refreshToken).then((data) => {
      if (data.data) {
        console.log('token:', data.data.access);
        localStorage.setItem('accessToken', data.data.access);
      }
    });
    selectedFavorites.includes(id) ? await deleteTracks(id) : await addTracks(id);
    await favoritesData();
    console.log(id);
  };

  return (
    <div className={styles.playlist__item}>
      <div id="track" ref={ref} className={styles.track}>
        <div
          className={styles.track}
          role="button"
          tabIndex={0}
          onClick={(e) => clickTrack(e)}
          onKeyDown={(e) => onKeyPressTrack(e)}>
          <div className={styles.track__title}>
            <div className={styles.track__title_image}>
              <svg className={`${styles.track__title_svg} `} alt="music">
                {selectedIcon && selectedTrack.name === name ? (
                  <use
                    className={selectedPulse ? styles.active_icon : ''}
                    href="/img/icon/sprite.svg#icon-dot"
                  />
                ) : (
                  <use href="/img/icon/sprite.svg#icon-note" />
                )}
              </svg>
            </div>
            <div className={styles.track__title_text}>
              <a className={styles.track__title_link} href="http://">
                {name}
                <span className={styles.track__title_span} />
              </a>
            </div>
          </div>
          <div className={styles.track__author}>
            <a className={styles.track__author_link} href="http://">
              {author}
            </a>
          </div>
          <div className={styles.track__album}>
            <a className={styles.track__album_link} href="http://">
              {album}
            </a>
          </div>
        </div>
        <div className={styles.track__time}>
          <svg onClick={() => handleLike()} className={styles.track__time_svg} alt="time">
            {!selectedFavorites?.includes(id) ? (
              <use href="/img/icon/sprite.svg#icon-like" />
            ) : (
              <use href="/img/icon/sprite.svg#icon-favorite" />
            )}
          </svg>
          <span className={styles.track__time_text}>{time}</span>
        </div>
      </div>
    </div>
  );
}
export default Track;
