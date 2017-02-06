import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

export const FAKE_DOMAIN = 'http://fakedomain.com/';

export const getAPI = (location, data) => {
    return fetch(createUrl(location) + queryString.stringify(data))
};

const createUrl = (location) => {
    if (process.env.NODE_ENV === 'test') {
        location = FAKE_DOMAIN + location
    }
    return location
};
