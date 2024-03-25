import React, { useState } from 'react';

import { setupApiStore } from '../../mock/test-utilit';

import { render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { categoryApi } from '../../redux/slices/categoryAPI';
import Category from './index';
import { store } from '../../redux/slices/store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Redirect, useParams } from 'react-router-dom';
import { userNameContext } from '../../routes/routes';
import { nanoid } from '@reduxjs/toolkit';

const token = nanoid();
export const handlers = [
  rest.get('https://skypro-music-api.skyeng.tech/catalog/selection/:id/', (req, res, ctx) => {
    const id = req.params.id;
    return res(
      ctx.set('Authorization', `Bearer ${token}`),
      ctx.json({
        id: 1,
        items: [
          {
            id: 8,
            name: 'Chase',
            author: 'Alexander Nakarada',
            release_date: '2005-06-11',
            genre: 'Классическая музыка',
            duration_in_seconds: 205,
            album: 'Chase',
            logo: null,
            track_file:
              'https://skypro-music-api.skyeng.tech/media/music_files/Alexander_Nakarada_-_Chase.mp3',
          },
        ],
      }),
    );
  }),
  rest.post('https://skypro-music-api.skyeng.tech/user/token/refresh/', (req, res, ctx) => {
    return res(ctx.set('authorization', `Bearer ${token}`), ctx.json({ token: 'refreshedToken' }));
  }),
];

// Готовим моковый сервер
const server = setupServer(...handlers);

// Мокируем api store
const storeRef = setupApiStore(categoryApi);

describe('TodoList feature', () => {
  // Поднимаем тестовый сервер перед запуском тестов
  beforeAll(() => server.listen());

  // Чистим обработчики между тестами
  afterEach(() => server.resetHandlers());

  // Отрубаем сервер после выполнения тестов.
  // НЕ ЗАБЫВАЙТЕ ЭТО ДЕЛАТЬ, иначе сервер будет работать вхолостую
  afterAll(() => server.close());
  const dataUser = localStorage.getItem('data');
  const setDataUser = jest.fn();
  it('should show requested data', async () => {
    server.use(...handlers);
    render(
      <userNameContext.Provider value={{ dataUser, setDataUser }}>
        <Provider store={store}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Category />} />
              {storeRef.wrapper}
            </Routes>
          </BrowserRouter>
        </Provider>
      </userNameContext.Provider>,
    );

    expect(await screen.findAllByText('Chase')).toBeTruthy();
  });
});
