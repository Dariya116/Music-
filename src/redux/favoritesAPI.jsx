import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const favoritesApi = createApi({
  reducerPath: 'favoritesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://skypro-music-api.skyeng.tech/catalog/track/',
    prepareHeaders: async (headers) => {
      const accessToken = localStorage.getItem('accessToken');

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFavorites: build.query({
      query: () => `favorite/all/`,
    }),

    addFavoritesTracks: build.mutation({
      query: (id) => ({
        url: `${id}/favorite/`,
        method: 'POST',
      }),
    }),
    deleteFavoritesTracks: build.mutation({
      query: (id) => ({
        url: `${id}/favorite/`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const {
  useGetFavoritesQuery,
  useAddFavoritesTracksMutation,
  useDeleteFavoritesTracksMutation,
  useLazyGetFavoritesQuery,
} = favoritesApi;
