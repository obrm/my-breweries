export default interface IBrewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  country: string;
  website_url: string | null;
}
