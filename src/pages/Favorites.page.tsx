import { useAppSelector } from '../hooks/redux';

import { BreweriesList } from '../components';

const FavoritesPage = () => {
  const { favoredBreweries } = useAppSelector((state) => state.brewery);

  return (
    <BreweriesList breweries={favoredBreweries} page='Favorites' />
  );
};

export default FavoritesPage;
