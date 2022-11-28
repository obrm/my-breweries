import { useEffect } from 'react';

import { getFavoredBreweriesFromAPI } from '../features/breweries/brewerySlice';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { BreweriesList } from '../components';

const FavoritesPage = () => {
  const { favoredBreweries, isLoading } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoredBreweriesFromAPI(favoredBreweries));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <BreweriesList breweries={favoredBreweries} isLoading={isLoading} page='Favorites' />
  );
};

export default FavoritesPage;
