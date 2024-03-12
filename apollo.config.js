module.exports = {
  client: {
    service: {
      name: 'go-api-backend',
      // URL to the GraphQL API
      url: 'http://localhost:3000/query',
    },
    // Files processed by the extension
    includes: [
      'src/**/*.vue',
      'src/**/*.js',
    ],
  },
}