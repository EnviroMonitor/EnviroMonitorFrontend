import fetch from 'isomorphic-fetch';
import queryString from 'query-string';

export const getAPI = (location, data) => {
    return fetch(location + queryString.stringify(data))
};