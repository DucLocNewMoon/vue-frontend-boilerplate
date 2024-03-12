import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

const getHeaders = () => {
  const headers = {}
  const token = localStorage.getItem('apollo-token')
  if (token) {
    headers.authorization = `Bearer ${token}`
  }
  return headers
}

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/query',
  headers: getHeaders(),
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

export default apolloProvider