import * as contentful from 'contentful';

import config from '../../config';

// exports the single client so we can refactore the fetch file
// We will change the hard coded items into the .env and retrieve from the config
let client = contentful.createClient({
    space: config.SPACE_ID,
    accessToken: config.CONTENTFUL_API_KEY,
});

export default client;