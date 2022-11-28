import { useEffect } from 'react';

import { Helmet } from 'react-helmet';

import { getBreweries } from '../features/breweries/brewerySlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Brewery } from './../features/breweries/components';

import './styles/style.scss';

const HomePage = () => {
  const { breweries } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getBreweries());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container">
        <div className="breweries-grid">
          {breweries.slice(0, 18).map((brewery) => <Brewery key={brewery.id} brewery={brewery} />)}
        </div>
      </div>
    </>
  );
};

export default HomePage;
