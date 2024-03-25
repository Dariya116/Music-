import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const registrationApi = createApi({
  reducerPath: 'registrationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/user/',
    prepareHeaders: async (headers) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      headers.set('content-type', 'application/json');

      return headers;
    },
  }),

  endpoints: (build) => ({
    addRegistration: build.mutation({
      query: (body) => ({
        url: `signup/`,
        method: 'POST',
        body,
      }),
    }),
    addLogin: build.mutation({
      query: (body) => ({
        url: `login/`,
        method: 'POST',
        body,
      }),
    }),
    addToken: build.mutation({
      query: (body) => ({
        url: `token/`,
        method: 'POST',
        body,
      }),
    }),
    newToken: build.mutation({
      query: (body) => ({
        url: `token/refresh/`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useAddRegistrationMutation,
  useAddLoginMutation,
  useAddTokenMutation,
  useNewTokenMutation,
} = registrationApi;
