import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './sections/auth/login';
import Signup from './sections/auth/signup';
import { ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SidebarDemo } from './sections/SideBar';
import Auth from './sections/auth';

function App() {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 480_000,
          },
        },
      })
  );

  return (
    <AuthProvider>
      <MantineProvider withCssVariables>
        <ColorSchemeScript defaultColorScheme='light' />
        <QueryClientProvider client={queryClient}>
          <ModalsProvider>
            <Router>
              <AppRoutes />
              <Notifications autoClose={3000} position='top-right' limit={1} />
            </Router>
          </ModalsProvider>
        </QueryClientProvider>
      </MantineProvider>
    </AuthProvider>
  );
}

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* <Route path='/signup' element={<Signup />} /> */}
      <Route
        path='/login'
        element={isAuthenticated ? <Navigate to='/' /> : < Auth/>}
      />
      <Route
        path='/'
        element={isAuthenticated ? <SidebarDemo /> : <Navigate to='/login' />}
      />
    </Routes>
  );
};

export default App;
