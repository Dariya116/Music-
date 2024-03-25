import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Search from '../../components/Search/Search';
import styles from '../home/home.module.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Track from '../../components/Track/Track';
import { setListTracksToPlay } from '../../redux/slices/song';
import { useNewTokenMutation } from '../../redux/registrationAPI';
import { useGetSelectionIdQuery } from '../../redux/slices/categoryAPI';
import MyLoader from '../../components/MyLoader';

function Category({ setUser, setOpen, categoryOne, categoryTwo, categoryThree }) {
  const dispatch = useDispatch();

  const selectedValueFromCategory = useSelector((state) => state.song.valueFromSearch);
  const { id=1 } = useParams();

  let categoryGenre;
  if (id == 1) {
    categoryGenre = 'Классическая музыка';
  }
  if (id == 2) {
    categoryGenre = 'Электронная музыка';
  }
  if (id == 3) {
    categoryGenre = 'Рок музыка';
  }
  const { data: dataSelectionId, isLoading } = useGetSelectionIdQuery(id, {
    refetchOnMountOrArgChange: true,
  });


  const [upToken] = useNewTokenMutation();
  const refreshToken = { refresh: localStorage.getItem('refreshToken') };
  useEffect(() => {
    upToken(refreshToken).then((data) => {
      if (data.data) {
        localStorage.setItem('accessToken', data.data.access);
      }
    });
    if (dataSelectionId) {
      dispatch(setListTracksToPlay(dataSelectionId.items));
    }
  }, [dataSelectionId]);

  const categoryTrackList = dataSelectionId?.items || [];

  const tracksCategory = categoryTrackList
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(selectedValueFromCategory.toLowerCase())) {
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
        categoryOne={categoryOne}
        categoryTwo={categoryTwo}
        categoryThree={categoryThree}
      />
    ));
  const skeleton = [...new Array(1)].map((_, index) => <MyLoader key={Math.random(index)} />);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Nav setUser={setUser} setOpen={setOpen} />
        <div className={styles.main}>
          <div className={styles.centerblock}>
            <Search />
            <div>
              <h2 className={styles.centerblock__h2}>{categoryGenre}</h2>
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
                <div className={styles.content__playlist}>
                  {isLoading ? skeleton : tracksCategory}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Sidebar setUser={setUser} setOpen={setOpen} />
      </main>

      <div className={styles.bar}></div>
      <footer className={styles.footer} />
    </div>
  );
}
export default Category;
