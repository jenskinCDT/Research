import { CssBaseline, ThemeProvider } from '@mui/material';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/Common/ProtectedRoute';
import Header from './components/Layout/Header/Header';
import Loading from './components/Loading/Loading';
import { theme } from './GlobalMUI';
import { routes } from './routes';
import 'react-toastify/dist/ReactToastify.css';
import StoreService from './redux/store';
const store = StoreService.setup();

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Suspense fallback={<Loading />}>
            <Routes>
              {routes.map((route, i) =>
                route.protected ? (
                  <Route
                    path={route.path}
                    exact={route.exact}
                    key={i}
                    element={
                      <ProtectedRoute {...route}>
                        <route.component title={route.title} />
                      </ProtectedRoute>
                    }
                  />
                ) : (
                  <Route
                    key={i}
                    path={route.path}
                    exact={route.exact}
                    element={<route.component title={route.title} />}
                  />
                )
              )}
            </Routes>
          </Suspense>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
