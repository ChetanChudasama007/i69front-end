import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_ENV === "development"
    ? process.env.NEXT_PUBLIC_STAGING
    : process.env.NEXT_PUBLIC_PRODUCTION;

// HTTP link
var httpLink = new HttpLink({ uri: baseUrl });
// if(`${process.env.NEXT_PUBLIC_APP_ENV}` === 'development'){
//   console.log(`${process.env.NEXT_PUBLIC_APP_ENV}`)
//   var httpLink = new HttpLink({
//     uri: `${process.env.NEXT_PUBLIC_STAGING}`, // Replace with your GraphQL HTTP endpoint
//   });
// }else{
//   console.log(`${process.env.NEXT_PUBLIC_APP_ENV}`)
//   var httpLink = new HttpLink({
//     uri: `${process.env.NEXT_PUBLIC_PRODUCTION}`, // Replace with your GraphQL HTTP endpoint
//   });
// }

// WebSocket link (only created in the browser environment)
if(`${process.env.NEXT_PUBLIC_APP_ENV}` === 'development'){
var wsLink = typeof window !== 'undefined' ? new WebSocketLink({
  uri: 'wss://api.chatadmin-mod.click/ws/graphql', // Replace with your WebSocket endpoint
  options: {
    reconnect: true,
    lazy: true,
  }
}) : null;
}else{
  var wsLink = typeof window !== 'undefined' ? new WebSocketLink({
    uri: 'wss://api.i69app.com/ws/graphql', // Replace with your WebSocket endpoint
    options: {
      reconnect: true,
      lazy: true,
    }
  }) : null;
}

// Auth link to append token to HTTP requests
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Token ${token}` : '',
    }
  };
});

// Split link to direct requests to appropriate link (HTTP or WebSocket) based on operation type
const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink ? authLink.concat(wsLink) : authLink.concat(httpLink),
  authLink.concat(httpLink)
);

// Default options for Apollo Client
const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

// Create Apollo Client instance
export const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  cache: new InMemoryCache(),
  link,
  defaultOptions
});

// UploadLink
const uploadLink = createUploadLink({
  uri: baseUrl,
});

export const clientUpload = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(uploadLink),
});

