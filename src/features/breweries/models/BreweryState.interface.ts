import { AsyncState } from './../../../shared/models';
import IBrewery from './Brewery.interface';
import { FavoredBreweries } from './FavoredBreweries.type';

export default interface BreweryState extends AsyncState {
  breweries: IBrewery[];
  favoredBreweries: FavoredBreweries;
}
