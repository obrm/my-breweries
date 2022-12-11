import { Helmet } from 'react-helmet';
import Typography from '@mui/material/Typography';

import { IBrewery } from '../features/breweries/interfaces/Brewery.interfaces';

import { Brewery, AlertMessage } from './';

import { useAppSelector } from '../hooks/redux';

import './styles/breweriesList.style.scss';

interface Props {
  breweries: IBrewery[];
  page: string;
}

const BreweriesList: React.FC<Props> = ({ breweries, page }) => {
  /* if we are already using state and are aware of page, why prop for breweries? */
  const { isLoading, isError } = useAppSelector((state) => state.brewery);

  return (
    <>
      <Helmet>
        <title>My Breweries | {page}</title>
      </Helmet>
      <div className="container">
        {isError ?
          (
            <AlertMessage message="An error occurred. Please try again later." severity='error' />
          ) : isLoading ? (
            <img src='assets/images/loader/loader.gif' alt="loading..." className="loader" />
          ) : page === 'Favorites' && breweries.length === 0 ? (
            <Typography variant="h3" sx={{ mt: 12, textAlign: 'center' }}>There are no favorite Breweries</Typography>
          ) : (
            <div className="breweries-grid">
              {breweries.map((brewery) => <Brewery key={brewery.id} brewery={brewery} />)}
            </div>
          )}
      </div>
    </>
  );
};

export default BreweriesList;