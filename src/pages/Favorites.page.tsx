import { useEffect } from 'react';

import { getFavoredBreweriesFromAPI } from '../features/breweries/brewerySlice';

import { useAppDispatch, useAppSelector } from '../hooks';

import { BreweriesList } from '../components';

const FavoritesPage = () => {
  const { favoredBreweries, isLoading } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoredBreweriesFromAPI(favoredBreweries));
  }, [dispatch]);

  return (
    <BreweriesList breweries={favoredBreweries} isLoading={isLoading} page='Favorites' />
  );
};

export default FavoritesPage;
