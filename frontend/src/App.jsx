import React, { Suspense, useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Global } from '@emotion/core';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';

import GlobalStyles from './theme/GlobalStyles';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const HomePage = React.lazy(() =>
  import(/* webpackPreload: true */ './pages/HomePage')
);
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));

const Main = styled.main({
  height: '100vh',
});

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
        storage: window.localStorage,
      });
      setClient(apolloClient);
    })();
  }, []);

  // TODO: make a better loader.
  // This is only for waiting for cached queries to be restored from localstorage.
  // Might not even show up
  if (!client)
    return (
      <Main>
        <div style={{ height: '100vh' }}>Loading...</div>;
      </Main>
    );

  return (
    <>
      <Global styles={GlobalStyles(theme)} />
      <ApolloProvider client={client}>
        <Main>
          <Suspense
            fallback={
              <div style={{ height: '100vh' }}>Loading in Suspense!</div>
            }
          >
            <Switch>
              <Route path="/login">
                <LoginPage />
              </Route>
              <Route path="/register">
                <RegisterPage />
              </Route>
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
