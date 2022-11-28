import { useEffect } from 'react';

import { getBreweries } from '../features/breweries/brewerySlice';

import { useAppDispatch, useAppSelector } from '../hooks';

import { BreweriesList } from '../components';

const HomePage = () => {
  const { breweries, isLoading } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  return (
    <BreweriesList breweries={breweries} isLoading={isLoading} page='Home' />
  );
};

export default HomePage;
