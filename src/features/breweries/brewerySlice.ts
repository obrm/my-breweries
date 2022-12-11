import { AxiosError } from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BreweryState, IBrewery } from "./interfaces/Brewery.interfaces";
import { breweryService, errorsService } from "../../services";

import { LOCAL_STORAGE_KEY } from "../../constants";

// initial state should probably read fron local storage
const initialState: BreweryState = {
  breweries: [],
  favoredBreweries: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const getBreweries = createAsyncThunk("breweries", async () => {
  try {
    const breweries = await breweryService.getBreweries();
    return breweries;
  } catch (err) {
    // this is called also in breweryService.getBreweries
    const error = err as AxiosError;
    errorsService.handleError(error);
  }
});

export const getFavoredBreweriesFromAPI = createAsyncThunk(
  "favoredBreweries",
  async (
    favoriteBreweriesIds: string[],
    { /* this is used */ rejectWithValue }
  ) => {
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
  // no need for all the spreads...
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

  // multiple places using local storage, not a good idea.
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(favoredBreweriesIds));

  return newFavoredBreweries;
};

export const brewerySlice = createSlice({
  name: "brewery",
  initialState,
  reducers: {
    toggleFavorite: (
      state,
      /* why not just passing id? */ action: PayloadAction<IBrewery>
    ) => {
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
      .addCase(getBreweries.rejected, (state) => {
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
