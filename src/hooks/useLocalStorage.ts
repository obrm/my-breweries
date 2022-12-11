import { useMemo, useEffect } from 'react';

import { useAppDispatch } from './redux';

import { getFavoredBreweriesFromAPI } from '../features/breweries/brewerySlice';

import { LOCAL_STORAGE_KEY } from '../constants';

const useLocalStorage = () => {
  const dispatch = useAppDispatch();

  const storedFavoredBreweriesIds: string | null =
    localStorage.getItem(LOCAL_STORAGE_KEY);

  const favoredBreweriesIds: string[] | [] = useMemo(() => {
    return storedFavoredBreweriesIds
      ? JSON.parse(storedFavoredBreweriesIds)
      : [];
  }, [storedFavoredBreweriesIds]);

  useEffect(() => {
    if (favoredBreweriesIds.length > 0) {
      dispatch(getFavoredBreweriesFromAPI(favoredBreweriesIds));
    }
  }, [dispatch, favoredBreweriesIds]);
};

export default useLocalStorage;
