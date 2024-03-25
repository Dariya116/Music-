import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/selection/',
    prepareHeaders: async (headers) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getSelection: build.query({
      query: () => ``,
    }),

    getSelectionId: build.query({
      query: (id) => `${id}/`,
    }),
  }),
});
export const { useGetSelectionIdQuery, useGetSelectionQuery, useLazyGetSelectionIdQuery } =
  categoryApi;
