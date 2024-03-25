import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Bar.module.scss';
import {
  setNameTrack,
  setUrlTrack,
  setIndexTrack,
  setIcon,
  setPulse,
  setRequestResponse,
  setMix,
} from '../../redux/slices/song';
import { useNewTokenMutation } from '../../redux/registrationAPI';
import {
  useAddFavoritesTracksMutation,
  useDeleteFavoritesTracksMutation,
  useLazyGetFavoritesQuery,
} from '../../redux/favoritesAPI';

export default function Bar({ open }) {
  const dispatch = useDispatch();

  const audioRef = useRef(null);

  const song = useSelector((state) => state.song.nameTrack.name);
  const authorSong = useSelector((state) => state.song.nameTrack.author);
  let selectedUrlTrack = useSelector((state) => state.song.urlTrack);
  let requestResponseBar = useSelector((state) => state.song.requestResponse);
  let copyRequestResponseBar = useSelector((state) => state.song.copyRequestResponse);
  let selectedIndex = useSelector((state) => state.song.indexTrack);
  const currentIndex = useSelector((state) => state.song.indexTrack);
  const selectedIdFromLike = useSelector((state) => state.song.nameTrack.id);
  const selectedFavoritesBar = useSelector((state) => state.song.favorites);
  const selectedMix = useSelector((state) => state.song.mix);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [repeat, setRepeat] = React.useState(false);
  const [volume, setVolume] = React.useState(60);
  const [duration, setDuration] = React.useState(0);
  const [currentTime, setCurrentTime] = React.useState(0);

  const [updateToken] = useNewTokenMutation();

  const [addTracks] = useAddFavoritesTracksMutation();

  const [deleteTracks] = useDeleteFavoritesTracksMutation();

  const handleStart = () => {
    audioRef.current.play();
    setIsPlaying(true);
    dispatch(setPulse(true));
  };

  const handleStop = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    dispatch(setPulse(false));
  };

  const togglePlay = isPlaying ? handleStop : handleStart;

  useEffect(() => {
    if (song) {
      audioRef.current.play();
      setIsPlaying(true);
      dispatch(setPulse(true));
    }
  }, [song, selectedUrlTrack, selectedIndex, dispatch]);

  const handleRepeat = () => {
    setRepeat(!repeat);
    if (!repeat) {
      audioRef.current.loop = true;
    } else {
      audioRef.current.loop = false;
    }
  };

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      if (audioRef.current !== null) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
      }
    };
  }, []);

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };
  function formatDuration(durationSeconds) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

  const handleNext = () => {
    if (selectedIndex >= requestResponseBar.length - 1) {
      return;
    } else {
      dispatch(setIndexTrack(selectedIndex + 1));
      dispatch(setNameTrack(requestResponseBar[selectedIndex + 1]));
      dispatch(setUrlTrack(requestResponseBar[selectedIndex + 1].track_file));
      dispatch(setIcon(true));
    }
  };

  const handlePrevious = () => {
    if (selectedIndex === 0) {
      return;
    } else {
      dispatch(setIndexTrack(selectedIndex - 1));
      dispatch(setNameTrack(requestResponseBar[selectedIndex - 1]));
      dispatch(setUrlTrack(requestResponseBar[selectedIndex - 1].track_file));
      dispatch(setIcon(true));
    }
  };

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

  let newRequestResponseBar = shuffle(requestResponseBar);

  const handleShuffle = () => {
    dispatch(setRequestResponse(copyRequestResponseBar));

    dispatch(setIndexTrack(copyRequestResponseBar.indexOf(requestResponseBar[currentIndex])));

    if (selectedMix) {
      dispatch(setMix(false));
    } else {
      dispatch(setMix(true));

      if (selectedMix === false) {
        dispatch(setRequestResponse(newRequestResponseBar.shuffledArray));

        dispatch(
          setIndexTrack(
            newRequestResponseBar.shuffledArray.indexOf(requestResponseBar[currentIndex]),
          ),
        );

        dispatch(setMix(true));
      }
    }
  };

  const [favoritesData] = useLazyGetFavoritesQuery();

  const refreshToken = { refresh: localStorage.getItem('refreshToken') };

  useEffect(() => {
    favoritesData();
  }, []);

  const handleLikeBar = async () => {
    await updateToken(refreshToken).then((data) => {
      if (data.data) {
        localStorage.setItem('accessToken', data.data.access);
      }
    });
    selectedFavoritesBar.includes(selectedIdFromLike)
      ? await deleteTracks(selectedIdFromLike)
      : await addTracks(selectedIdFromLike);
    await favoritesData();
  };

  return (
    <div>
      <audio
        src={selectedUrlTrack}
        onEnded={handleNext}
        ref={audioRef}
        style={{ marginBottom: '100px' }}
      />

      <div className={styles.bar__content}>
        {open && (
          <>
            <div>
              <div className={styles.bar__player_progress}>
                <span>{formatDuration(currentTime)}</span>
                <span> / </span>
                {!isNaN(duration) ? <span>{formatDuration(duration)}</span> : '0:00'}
              </div>
              <input
                type="range"
                min="0"
                max={!isNaN(duration) ? duration : null}
                value={currentTime}
                onChange={handleSeek}
                className={styles.input_progress}
              />
            </div>

            <div className={styles.bar__player_block}>
              <div className={styles.player}>
                <div className={styles.player__controls}>
                  <div className={styles.player__btn_prev}>
                    <svg
                      className={styles.player__btn_prev_svg}
                      alt="prev"
                      onClick={() => handlePrevious()}
                      onKeyDown={() => handlePrevious()}>
                      <use href="/img/icon/sprite.svg#icon-prev" />
                    </svg>
                  </div>
                  <div
                    className={`${styles.player__btn_play} ${styles.btn}`}
                    onClick={togglePlay}
                    onKeyDown={togglePlay}>
                    <svg className={styles.player__btn_play_svg} alt="play">
                      <use
                        href={
                          !isPlaying
                            ? '/img/icon/sprite.svg#icon-play'
                            : '/img/icon/sprite.svg#icon-pause'
                        }
                      />
                    </svg>
                  </div>
                  <div
                    className={styles.player__btn_next}
                    onClick={() => handleNext()}
                    onKeyDown={() => handleNext()}>
                    <svg className={styles.player__btn_next_svg} alt="next">
                      <use href="/img/icon/sprite.svg#icon-next" />
                    </svg>
                  </div>
                  <div
                    className={`${styles.player__btn_repeat} ${styles.btn_icon}`}
                    onClick={() => handleRepeat()}
                    onKeyDown={() => handleRepeat()}>
                    <svg
                      className={
                        !repeat
                          ? styles.player__btn_repeat_svg
                          : styles.player__btn_repeat_svg_active
                      }
                      alt="repeat">
                      <use href="/img/icon/sprite.svg#icon-repeat" />
                    </svg>
                  </div>
                  <div
                    className={`${styles.player__btn_shuffle} ${styles.btn_icon}`}
                    onClick={() => handleShuffle()}
                    onKeyDown={() => handleShuffle()}>
                    <svg
                      className={
                        selectedMix
                          ? styles.player__btn_shuffle_svg_active
                          : styles.player__btn_shuffle_svg
                      }
                      alt="shuffle">
                      <use href="/img/icon/sprite.svg#icon-shuffle" />
                    </svg>
                  </div>
                </div>
                <div className={styles.track_play}>
                  <div className={styles.track_play__contain}>
                    <div className={styles.track_play__image}>
                      <svg className={styles.track_play__svg} alt="music">
                        <use href="/img/icon/sprite.svg#icon-note" />
                      </svg>
                    </div>
                    <div className={styles.track_play__author}>
                      <a className={styles.track_play__author_link} key={song} href="http://">
                        {song}
                      </a>
                    </div>
                    <div className={styles.track_play__album}>
                      <a className={styles.track_play__album_link} href="http://">
                        {authorSong}
                      </a>
                    </div>
                  </div>
                  <div className={styles.track_play__like_dis}>
                    <div className={`${styles.track_play__like} ${styles.btn_icon}`}>
                      <svg
                        onClick={() => handleLikeBar()}
                        className={styles.track_play__like_svg}
                        alt="time">
                        {!selectedFavoritesBar?.includes(selectedIdFromLike) ? (
                          <use href="/img/icon/sprite.svg#icon-like" />
                        ) : (
                          <use href="/img/icon/sprite.svg#icon-favorite" />
                        )}
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.volume}>
                <div className={styles.volume__content}>
                  <div className={styles.volume__image}>
                    <svg className={styles.volume__svg} alt="volume">
                      <use href="/img/icon/sprite.svg#icon-volume" />
                    </svg>
                  </div>
                  <div className={`${styles.volume__progress} ${styles.btn}`}>
                    <input
                      className={styles.volume__progress_line}
                      type="range"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      min={0}
                      max={100}
                      name="range"
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
