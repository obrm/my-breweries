export interface IBrewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  country: string;
  website_url: string | null;
}

export interface BreweryState extends AsyncState {
  breweries: IBrewery[];
  favoredBreweries: FavoredBreweries;
}

export type FavoredBreweries = IBrewery[];

export interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}
