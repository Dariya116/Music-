import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Filter.module.scss';
import {
  setValueAuthor,
  setValueGenre,
  setValueYearDown,
  setValueYearUp,
} from '../../redux/slices/song';

export function Filter() {
  const dispatch = useDispatch();

  const dataAllTracks = useSelector((state) => state.song.dataAll);
  const authorFilter = dataAllTracks.map((obj) => obj.author);
  const genreFilter = dataAllTracks.map((obj) => obj.genre);
  const selectedValueGenre = useSelector((state) => state.song.valueGenre);
  const selectedValueAuthor = useSelector((state) => state.song.valueAuthor);
  const selectedValueYearDown = useSelector((state) => state.song.valueYearDown);
  const selectedValueYearUp = useSelector((state) => state.song.valueYearUp);
  const makeUniqAuthor = (author) => [...new Set(author)];

  const makeUniqGenre = (genre) => [...new Set(genre)];

  const [musicFilter, setMusicFilter] = React.useState(false);
  const [musicYear, setMusicYear] = React.useState(false);
  const [musicStyle, setMusicStyle] = React.useState(false);

  const musicFilterClick = () => {
    setMusicFilter(!musicFilter);
    setMusicStyle(false);
    setMusicYear(false);
  };

  const musicYearClick = () => {
    setMusicYear(!musicYear);
    setMusicStyle(false);
    setMusicFilter(false);
  };

  const musicStyleClick = () => {
    setMusicStyle(!musicStyle);
    setMusicYear(false);
    setMusicFilter(false);
  };

  const ref = useRef();
  const ref1 = useRef();
  const ref2 = useRef();

  useEffect(() => {
    const clickOutside = (event) => {
      if (!event.composedPath().includes(ref.current)) {
        setMusicFilter(false);
      }
      if (!event.composedPath().includes(ref1.current)) {
        setMusicYear(false);
      }
      if (!event.composedPath().includes(ref2.current)) {
        setMusicStyle(false);
      }
    };

    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }, []);

  const onClickGenre = (e) => {
    dispatch(setValueGenre(e.target.textContent));
  };
  
  const onClickAuthor = (e) => {
    dispatch(setValueAuthor(e.target.textContent));
  };

  const onClickYearUp = () => {
    if (selectedValueYearUp === true) {
      dispatch(setValueYearUp(false));
    } else {
      dispatch(setValueYearUp(true));
      dispatch(setValueYearDown(false));
    }
  };
  const onClickYearDown = () => {
    if (selectedValueYearDown === true) {
      dispatch(setValueYearDown(false));
    } else {
      dispatch(setValueYearDown(true));
      dispatch(setValueYearUp(false));
    }
  };
  const onClickYear = () => {
    dispatch(setValueYearDown(false));
    dispatch(setValueYearUp(false));
  };
  return (
    <div className={styles.filter}>
      <div className={styles.filter__title}>Искать по:</div>
      <div ref={ref} className={styles.filter__choice}>
        <div
          role="button"
          tabIndex="0"
          className={`${styles.filter__button} ${styles.btn_text}`}
          onClick={() => musicFilterClick()}
          onKeyDown={() => musicFilterClick()}>
          исполнителю
        </div>
        {musicFilter && (
          <ul className={styles.filter__menu}>
            <li className={styles.filter__item}>
              {makeUniqAuthor(authorFilter).map((author) => (
                <p
                  href="http://"
                  className={
                    selectedValueAuthor.includes(author)
                      ? styles.filter__link_active
                      : styles.filter__link
                  }
                  key={author}
                  onClick={onClickAuthor}>
                  {author}
                </p>
              ))}
            </li>
          </ul>
        )}
      </div>
      {selectedValueAuthor.length > 0 && (
        <p className={styles.filter__count_author}>{selectedValueAuthor.length}</p>
      )}
      <div ref={ref1} className={styles.filter__choice}>
        <div
          role="button"
          tabIndex="0"
          className={`${styles.filter__button} ${styles.btn_text}`}
          onClick={() => musicYearClick()}
          onKeyDown={() => musicYearClick()}>
          год выпуска
        </div>

        {musicYear && (
          <ul className={styles.filter__menu}>
            <li className={styles.filter__item}>
              <p onClick={onClickYear} className={styles.filter__link}>
                По умолчанию
              </p>
              <p
                onClick={onClickYearDown}
                className={
                  !selectedValueYearDown ? styles.filter__link : styles.filter__link_active
                }>
                Сначала новые
              </p>
              <p
                onClick={onClickYearUp}
                className={!selectedValueYearUp ? styles.filter__link : styles.filter__link_active}>
                Сначала старые
              </p>
            </li>
          </ul>
        )}
      </div>
      {(selectedValueYearUp === true || selectedValueYearDown === true) && (
        <p className={styles.filter__count_year}>1</p>
      )}

      <div ref={ref2} className={styles.filter__choice}>
        <div
          role="button"
          tabIndex="0"
          className={`${styles.filter__button} ${styles.btn_text}`}
          onClick={() => musicStyleClick()}
          onKeyDown={() => musicStyleClick()}>
          жанру
        </div>
        {musicStyle && (
          <ul className={styles.filter__menu}>
            <li className={styles.filter__item}>
              {makeUniqGenre(genreFilter).map((genre) => (
                <p
                  className={
                    selectedValueGenre.includes(genre)
                      ? styles.filter__link_active
                      : styles.filter__link
                  }
                  value={genre}
                  key={genre}
                  onClick={onClickGenre}>
                  {genre}
                </p>
              ))}
            </li>
          </ul>
        )}
      </div>
      {selectedValueGenre.length > 0 && (
        <p className={styles.filter__count_genre}>{selectedValueGenre.length}</p>
      )}
    </div>
  );
}
