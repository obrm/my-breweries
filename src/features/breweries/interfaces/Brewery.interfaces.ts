// this isnt C#, no ISomething
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


export interface AsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}


// listed in the wrong order
export interface BreweryState extends AsyncState {
  breweries: IBrewery[];
  // why are favored stored whole instead of just ids?
  favoredBreweries: IBrewery[];
}

