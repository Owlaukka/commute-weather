import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';

import GlobalStyles from './theme/GlobalStyles';
import Header from './components/header';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const HomePage = React.lazy(() =>
  import(/* webpackPreload: true */ './pages/HomePage')
);
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

const Main = styled.main(
  {
    overflow: 'auto',
  },
  ({ theme }) => ({
    marginTop: theme.sizes.mobileNavbar,
    height: `calc(100vh - ${theme.sizes.mobileNavbar})`,
  })
);

const App = () => {
  const theme = useTheme();
  const [client, setClient] = useState();

  useEffect(() => {
    const cache = new InMemoryCache();
    const apolloClient = new ApolloClient({
      uri:
        process.env.NODE_ENV === 'production'
          ? '/graphql'
          : 'http://localhost:3000/graphql',
      cache,
    });

    (async () => {
      await persistCache({
        cache,
        // Change this back to localStorage when proper cache-busting is implemented
        storage: window.sessionStorage,
      });
      setClient(apolloClient);
    })();
  }, []);

  // TODO: make a better loader.
  // This is only for waiting for cached queries to be restored from localstorage.
  // Might not even show up
  if (!client) return <div>Loading...</div>;

  return (
    <>
      <Global styles={GlobalStyles(theme)} />
      <ApolloProvider client={client}>
        <Header />
        <Main>
          <Suspense fallback={<div>Loading in Suspense!</div>}>
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
              {/* Default route if nothing else matches */}
              <Route path="/">
                <HomePage />
              </Route>
            </Switch>
          </Suspense>
        </Main>
      </ApolloProvider>
    </>
  );
};

export default App;
