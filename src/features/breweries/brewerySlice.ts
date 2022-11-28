import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BreweryState, FavoredBreweries, IBrewery } from './models';
import breweryService from './services/brewery.service';

const storedFavoredBreweries: string | null =
  localStorage.getItem('favoredBreweries');
const favoredBreweries: FavoredBreweries = !!storedFavoredBreweries
  ? JSON.parse(storedFavoredBreweries)
  : [];

const initialState: BreweryState = {
  breweries: [],
  favoredBreweries: favoredBreweries,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getBreweries = createAsyncThunk('brewery', async () => {
  try {
    return await breweryService.getBreweries();
  } catch (err) {
    console.error('Error: ', err);
  }
});

const toggleFavoriteBrewery = (
  favoredBreweries: FavoredBreweries,
  selectedBrewery: IBrewery
): FavoredBreweries => {
  const previousFavorites = [...favoredBreweries];
  const favoredBrewery = previousFavorites.find(
    (brewery) => brewery.id === selectedBrewery.id
  );

  let newFavoredBreweries = [];

  if (!favoredBrewery) {
    previousFavorites.push({ ...selectedBrewery, isFavored: true });

    newFavoredBreweries = previousFavorites;
  } else {
    const filteredBreweries = previousFavorites.filter(
      (b) => b.id !== favoredBrewery.id
    );

    newFavoredBreweries = [...filteredBreweries];
  }

  localStorage.setItem('favoredBreweries', JSON.stringify(newFavoredBreweries));

  return newFavoredBreweries;
};

export const brewerySlice = createSlice({
  name: 'brewery',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<IBrewery>) => {
      const modifiedFavoredBreweries = toggleFavoriteBrewery(
        state.favoredBreweries,
        action.payload
      );
      state.favoredBreweries = modifiedFavoredBreweries;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBreweries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBreweries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.breweries = action.payload?.data || [];
      })
      .addCase(getBreweries.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.breweries = [];
      });
  },
});

export const { toggleFavorite } = brewerySlice.actions;

export default brewerySlice.reducer;
