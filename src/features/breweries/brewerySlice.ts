import { AxiosError } from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BreweryState, IBrewery } from './interfaces/Brewery.interfaces';
import { breweryService, errorsService } from '../../services';

import { LOCAL_STORAGE_KEY } from '../../constants';

const initialState: BreweryState = {
  breweries: [],
  favoredBreweries: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getBreweries = createAsyncThunk('breweries', async () => {
  try {
    const breweries = await breweryService.getBreweries();
    return breweries;
  } catch (err) {
    const error = err as AxiosError;
    errorsService.handleError(error);
  }
});

export const getFavoredBreweriesFromAPI = createAsyncThunk(
  'favoredBreweries',
  async (favoriteBreweriesIds: string[]) => {
    try {
      const favoredBreweries = await breweryService.getFavoredBreweriesFromAPI(
        favoriteBreweriesIds
      );
      return favoredBreweries;
    } catch (err) {
      const error = err as AxiosError;
      errorsService.handleError(error);
    }
  }
);

const toggleFavoriteBrewery = (
  favoredBreweries: IBrewery[],
  selectedBrewery: IBrewery
) => {
  let newFavoredBreweries = [...favoredBreweries];
  const favoredBrewery = newFavoredBreweries.find(
    (brewery) => brewery.id === selectedBrewery.id
  );

  if (!favoredBrewery) {
    newFavoredBreweries.push({ ...selectedBrewery });
  } else {
    newFavoredBreweries = newFavoredBreweries.filter(
      (brewery) => brewery.id !== favoredBrewery.id
    );
  }

  const favoredBreweriesIds = newFavoredBreweries.map(
    (brewery: IBrewery) => brewery.id
  );

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoredBreweriesIds));

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
        state.isError = false;
      })
      .addCase(getBreweries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.breweries = action.payload || [];
      })
      .addCase(getBreweries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.breweries = [];
      })
      .addCase(getFavoredBreweriesFromAPI.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getFavoredBreweriesFromAPI.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.favoredBreweries = action.payload || state.favoredBreweries;
      })
      .addCase(getFavoredBreweriesFromAPI.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.favoredBreweries = [];
      });
  },
});

export const { toggleFavorite } = brewerySlice.actions;

export default brewerySlice.reducer;
