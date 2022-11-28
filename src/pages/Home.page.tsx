import { useEffect } from 'react';

import { getBreweries } from '../features/breweries/brewerySlice';

import { useAppDispatch, useAppSelector } from '../hooks/redux';

import { BreweriesList } from '../components';

const HomePage = () => {
  const { breweries } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  return (
    <BreweriesList breweries={breweries} page='Home' />
  );
};

export default HomePage;
