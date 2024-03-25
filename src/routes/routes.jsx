import React, { createContext, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation, BrowserRouter as Router } from 'react-router-dom';

import Home from '../pages/home';
import Register from '../pages/Register';
import Login from '../pages/login';
import Favorites from '../pages/favorites';
import Category from '../pages/category';
import NotFound from '../pages/notFound';
import Bar from '../components/Bar/Bar';
export const userNameContext = createContext({
  dataUser: '',
  setDataUser: () => {},
});

function AppRoutes() {
  const [dataUser, setDataUser] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(false);
  const [like, setLike] = React.useState(localStorage.getItem('like'));
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setUser(true);
    }
  }, []);
  const showBar =
    location.pathname.includes('category') ||
    location.pathname === '/favorites' ||
    location.pathname === '/' ||
    location.pathname === '/category1' ||
    location.pathname === '/category2' ||
    location.pathname === '/category3';

  const favoritesPage = location.pathname.includes('favorite');
  const homePage = location.pathname.includes('/');
  const categoryOne = location.pathname.includes('category/1');
  const categoryTwo = location.pathname.includes('category/2');
  const categoryThree = location.pathname.includes('category/3');

  useEffect(() => {
    localStorage.setItem('currentPath', location.pathname);
  }, [location.pathname]);

  const currentPath = localStorage.getItem('currentPath');

  return (
    <userNameContext.Provider value={{ dataUser, setDataUser }}>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route
          path="/"
          element={
            user ? (
              <Home
                open={open}
                setOpen={setOpen}
                user={user}
                setUser={setUser}
                favoritesPage={favoritesPage}
                homePage={homePage}
                setLike={setLike}
                like={like}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/favorites"
          element={
            user ? (
              <Favorites
                open={open}
                setOpen={setOpen}
                setUser={setUser}
                favoritesPage={favoritesPage}
                homePage={homePage}
                setLike={setLike}
                like={like}
              />
            ) : (
              <Navigate to={currentPath || '/login'} replace />
            )
          }
        />
        <Route
          path="/category/:id"
          element={
            user ? (
              <Category
                setUser={setUser}
                setOpen={setOpen}
                categoryOne={categoryOne}
                categoryTwo={categoryTwo}
                categoryThree={categoryThree}
              />
            ) : (
              <Navigate to={currentPath || '/login'} replace />
            )
          }></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showBar && <Bar open={open} setOpen={setOpen} />}
    </userNameContext.Provider>
  );
}
export default AppRoutes;
