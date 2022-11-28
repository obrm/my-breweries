import { useEffect, useMemo } from 'react';

import { getFavoredBreweriesFromAPI } from '../features/breweries/brewerySlice';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { BreweriesList } from '../components';
import { LOCAL_STORAGE_KEY } from '../constants';

const FavoritesPage = () => {
  const { favoredBreweries } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  const storedFavoredBreweriesIds: string | null =
    localStorage.getItem(LOCAL_STORAGE_KEY);

  const favoredBreweriesIds: string[] | null = useMemo(() => {
    return storedFavoredBreweriesIds
      ? JSON.parse(storedFavoredBreweriesIds)
      : [];
  }, [storedFavoredBreweriesIds]);

  useEffect(() => {
    if (Array.isArray(favoredBreweriesIds)) {
      dispatch(getFavoredBreweriesFromAPI(favoredBreweriesIds));
    }
  }, [dispatch, favoredBreweriesIds]);

  return (
    <BreweriesList breweries={favoredBreweries} page='Favorites' />
  );
};

export default FavoritesPage;
