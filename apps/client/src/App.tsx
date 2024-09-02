import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './lib/configs/chakra-ui/mainTheme/ThemeProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ROUTES } from './lib/routes';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUpPage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
