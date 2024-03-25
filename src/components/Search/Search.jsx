import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import styles from './Search.module.scss';
import { setValueFromSearch } from '../../redux/slices/song';

export default function Search() {
  const [search, setNewSearch] = useState('');

  const dispatch = useDispatch();
  
  const handleSearchChange = (e) => {
    setNewSearch(e.target.value);
    dispatch(setValueFromSearch(e.target.value));
  };
  return (
    <div className={styles.search}>
      <svg className={styles.search__svg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search" />
      </svg>
      <input
        className={styles.search__text}
        value={search}
        onChange={handleSearchChange}
        type="search"
        placeholder="Поиск"
        name="search"
        role="search"
      />
    </div>
  );
}
