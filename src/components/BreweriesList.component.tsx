import { Helmet } from 'react-helmet';
import Typography from '@mui/material/Typography';

import { IBrewery } from '../features/breweries/models';

import { Brewery } from './';

import './styles/breweriesList.style.scss';

interface Props {
  breweries: IBrewery[];
  page: string;
  isLoading: boolean;
}

const BreweriesList: React.FC<Props> = ({ breweries, page, isLoading }) => {
  return (
    <>
      <Helmet>
        <title>{page}</title>
      </Helmet>
      <div className="container">
        {isLoading ? (
          <img src='assets/images/loader/loader.gif' alt="loading..." className="loader" />
        ) : page === 'Favorites' && breweries.length === 0 ? (
          <Typography variant="h3" sx={{ mt: 12, textAlign: 'center' }}>There are no favorite Breweries</Typography>
        ) : (
          <div className="breweries-grid">
            {breweries.map((brewery) => <Brewery key={brewery.id} brewery={brewery} />)}
          </div>
        )
        }
      </div>
    </>
  );
};

export default BreweriesList;