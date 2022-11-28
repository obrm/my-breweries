import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import {
  AppBar,
  MenuItem,
  Button,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { LogoTypography, HeaderBox } from './';

import { pages } from '../constants';

import './styles/Header.style.scss';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const handleOnClickNavMenu = (path: string) => {
    setAnchorElNav(null);
    navigate(path);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/' className='link'>
            <LogoTypography isMobile={false} title='My Breweries' />
          </Link>
          <img src="assets/images/logo/logo.png" alt="logo" className='logo' />

          <HeaderBox isMobile={true} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleOnClickNavMenu(page.path)}>
                  <Typography textAlign="center">{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </HeaderBox>
          <Link to='/' className='link'>
            <LogoTypography isMobile={true} title='My Breweries' />
          </Link>

          <HeaderBox isMobile={false}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleOnClickNavMenu(page.path)}
                sx={{ my: 2, mr: 5, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </HeaderBox>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;