import { useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { theme } from './utils/theme';

import { HomePage, FavoritesPage } from './pages';
import { Header } from './components';


import { getFavoredBreweriesFromAPI } from './features/breweries/brewerySlice';

import { useAppDispatch } from './hooks/redux';

import { LOCAL_STORAGE_KEY } from './constants';

function App() {
  const dispatch = useAppDispatch();

  const storedFavoredBreweriesIds: string | null =
    localStorage.getItem(LOCAL_STORAGE_KEY);

  const favoredBreweriesIds: string[] | null = useMemo(() => {
    return storedFavoredBreweriesIds
      ? JSON.parse(storedFavoredBreweriesIds)
      : [];
  }, [storedFavoredBreweriesIds]);

  useEffect(() => {
    if (Array.isArray(favoredBreweriesIds)) {
      dispatch(getFavoredBreweriesFromAPI(favoredBreweriesIds));
    }
  }, [dispatch, favoredBreweriesIds]);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/favorites' element={<FavoritesPage />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;