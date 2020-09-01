import React from 'react';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const cache = new InMemoryCache();
const link = createHttpLink({ uri: 'https://twitter-clone-serverside.herokuapp.com' });
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('jwtToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null
    } 
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: cache,
  credentials: 'same-origin',
});

export default (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
);