import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// TODO: specifying the whole address isn't necessary in production because backend serves these files
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

import App from './App';
import theme from './theme';

const node = document.createElement('div');
document.body.prepend(node);

ReactDom.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </BrowserRouter>,
  node
);
