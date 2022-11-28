
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { toggleFavorite } from '../features/breweries/brewerySlice';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IBrewery } from '../interfaces';

interface Props {
  brewery: IBrewery;
}

const Brewery: React.FC<Props> = ({ brewery }) => {

  const dispatch = useAppDispatch();

  const { favoredBreweries } = useAppSelector((state) => state.brewery);

  const breweryItem = favoredBreweries.find((item) => item.id === brewery.id);

  const handleClickToggle = () => {
    dispatch(toggleFavorite(brewery));
  };

  return (
    <Card sx={{ width: 350, minWidth: 350, minHeight: 290 }}>
      <CardContent>
        <Typography gutterBottom variant='h5' sx={{ fontWeight: 700 }} component='div'>
          {brewery.name}
        </Typography>
        <Typography gutterBottom variant='h6' component='div' sx={{ mb: 1.5 }}>
          {`Brewery Type: ${brewery.brewery_type}`}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>
          {`${brewery.street}, ${brewery.city}, ${brewery.state}`}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ mb: 1.5 }}>
          {brewery.country}
        </Typography>
        {brewery.website_url && <Link href={brewery.website_url} variant="body2">
          website
        </Link>}
      </CardContent>
      <CardActions>
        <Button onClick={handleClickToggle}
          size='large'
          sx={{ fontWeight: 800 }}>
          {breweryItem ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon color='error' />}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Brewery;