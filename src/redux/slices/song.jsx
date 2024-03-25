import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  nameTrack: {},
  dataAll: [],
  requestResponse: [],
  copyRequestResponse: [],
  listTracksToPlay: [],
  urlTrack: '',
  indexTrack: 0,
  icon: false,
  pulse: false,
  idTrack: [],
  valueFromSearch: '',
  valueGenre: '',
  valueAuthor: '',
  valueYearUp: false,
  valueYearDown: false,
  idTrackForLike: '',
  favorites: [],
  mix: false,
};

const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setNameTrack(state, action) {
      state.nameTrack = action.payload;
    },
    setDataAll(state, action) {
      state.dataAll = action.payload;
    },

    setRequestResponse(state, action) {
      state.requestResponse = action.payload;
    },
    setListTracksToPlay(state, action) {
      state.listTracksToPlay = [];
      for (let i = 0; i < action.payload.length; i++) {
        if (action.payload[i].props) {
          state.listTracksToPlay.push(action.payload[i].props);
        } else {
          state.listTracksToPlay = action.payload;
          break;
        }
      }
    },
    setCopyRequestResponse(state, action) {
      state.copyRequestResponse = action.payload;
    },
    setUrlTrack(state, action) {
      state.urlTrack = '';
      state.urlTrack = action.payload;
    },

    setIndexTrack(state, action) {
      state.indexTrack = action.payload;
    },
    setIcon(state, action) {
      state.icon = action.payload;
    },
    setPulse(state, action) {
      state.pulse = action.payload;
    },
    setIdTrack(state, action) {
      state.idTrack = action.payload;
    },
    setValueFromSearch(state, action) {
      state.valueFromSearch = action.payload;
    },
    setValueGenre(state, action) {
      const newValueGenre = [...state.valueGenre, action.payload];
      if (!state.valueGenre.includes(action.payload)) {
        state.valueGenre = newValueGenre;
      } else {
        state.valueGenre = newValueGenre.filter((item) => item !== action.payload);
      }
    },
    setValueAuthor(state, action) {
      const newValueAuthor = [...state.valueAuthor, action.payload];
      if (!state.valueAuthor.includes(action.payload)) {
        state.valueAuthor = newValueAuthor;
      } else {
        state.valueAuthor = newValueAuthor.filter((item) => item !== action.payload);
      }
    },
    setValueYearUp(state, action) {
      state.valueYearUp = action.payload;
    },
    setValueYearDown(state, action) {
      state.valueYearDown = action.payload;
    },
    setIdTrackForLike(state, action) {
      state.idTrackForLike = action.payload;
    },
    setFavorites(state, action) {
      state.favorites = action.payload;
    },
    setMix(state, action) {
      state.mix = action.payload;
    },
  },
});
export const {
  setNameTrack,
  setDataAll,
  setRequestResponse,
  setUrlTrack,
  setIndexTrack,
  setIcon,
  setPulse,
  setCopyRequestResponse,
  setIdTrack,
  setListTracksToPlay,
  setValueFromSearch,
  setValueGenre,
  setValueAuthor,
  setValueYearUp,
  setValueYearDown,
  setIdTrackForLike,
  setFavorites,
  setMix,
} = songSlice.actions;
export default songSlice.reducer;
