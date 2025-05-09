import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('https://graphql.datocms.com/', {
  headers: {
    authorization: `Bearer ${import.meta.env.DATOCMS_API_TOKEN}`,
  },
});

export default client;
