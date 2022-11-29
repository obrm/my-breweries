import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';

import { theme } from './utils/theme';

import { HomePage, FavoritesPage } from './pages';
import { Header } from './components';

import useLocalStorage from './hooks/useLocalStorage';

function App() {
  useLocalStorage();

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