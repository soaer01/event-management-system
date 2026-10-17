import { createSlice } from '@reduxjs/toolkit';

const eventSlice = createSlice({
  name: 'events',
  initialState: {
    eventList: [],
    loading: false,
    err: null,
    searchKey: '',
    selectedCat: '',
    cityFilter: ''
  },
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
    getEventsSuccess: (state, action) => {
      state.eventList = action.payload;
      state.loading = false;
      state.err = null;
    },
    getEventsFail: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
    updateFilters: (state, action) => {
      state.searchKey = action.payload.searchKey ?? state.searchKey;
      state.selectedCat = action.payload.selectedCat ?? state.selectedCat;
      state.cityFilter = action.payload.cityFilter ?? state.cityFilter;
    }
  }
});

export const { startLoading, getEventsSuccess, getEventsFail, updateFilters } = eventSlice.actions;
export default eventSlice.reducer;