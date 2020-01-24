import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import introspectionQueryResultData from './fragmentTypes.json';

export default () => {
    const token = process.env.DATO_TOKEN;

    const link = createHttpLink({
        fetch,
        uri: process.env.isDevEnv ? 'https://graphql.datocms.com/preview' : 'https://graphql.datocms.com/',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });

    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData
    });

    return {
        link,
        cache: new InMemoryCache({ fragmentMatcher }),
        defaultHttpLink: false
    };
};
