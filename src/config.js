import 'dotenv/config'
console.log(process.env.CONTENTFUL_API_KEY, 'api key');
export default {
  // 'https://ratemycampsite.herokuapp.com/api'
  // 'http://localhost:8000/api'
  // `https://cdn.contentful.com/spaces/6mser4nwj822/entries?access_token=8NlYniHxHQAjYGpiBOVpLFhxNcCeNrOFzZU0Xgu8bo4`
  SPACE_ID: "wsqedv1nml2h",
  CONTENTFUL_API_KEY: "f8tjQX0ds2oGDtBCjgfOsw-UtY_LkvW2mcWOq7SJkDU",
  API_ENDPOINT: `https://cdn.contentful.com/spaces/6mser4nwj822/entries?access_token=8NlYniHxHQAjYGpiBOVpLFhxNcCeNrOFzZU0Xgu8bo4`,
  TOKEN_KEY: "rate-my-campsite",
};