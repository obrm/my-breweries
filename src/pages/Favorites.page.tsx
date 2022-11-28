import { useEffect } from 'react';

import { Helmet } from 'react-helmet';
import Typography from '@mui/material/Typography';

import { getFavoredBreweriesFromAPI } from '../features/breweries/brewerySlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Brewery } from './../features/breweries/components';

import './styles/style.scss';

const FavoritesPage = () => {
  const { favoredBreweries } = useAppSelector((state) => state.brewery);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoredBreweriesFromAPI());
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Favorites</title>
      </Helmet>
      <div className="container">
        <div className="breweries-grid">
          {favoredBreweries.length > 0 ?
            favoredBreweries.slice(0, 18).map((brewery) => <Brewery key={brewery.id} brewery={brewery} />) :
            <Typography variant="h2">There are no favorite Breweries</Typography>}
        </div>
      </div>
    </>
  );
};

export default FavoritesPage;
