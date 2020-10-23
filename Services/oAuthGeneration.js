import request from "request";

const BASE_URL = "https://login.microsoftonline.com/common/oauth2";
const BASE_METHOD_POST = "POST";
const BASE_METHOD_GET = "GET";

function getAuthorized(
  code,
  clientId,
  clientSecret,
  redirectUri,
  grantType,
  resource
) {
  var URL_EXTENSION = "token";
  var CODE = "code";
  var CLIENT_ID = "client_id";
  var CLIENT_SECRET = "client_secret";
  var REDIRECT_URI = "redirect_uri";
  var GRANT_TYPE = "grant_type";
  var RESOURCE = "resource";

  var option = {
    method: BASE_METHOD_POST,
    url: BASE_URL.concat(URL_EXTENSION),
    formData: {
      CODE: code,
      CLIENT_ID: clientId,
      CLIENT_SECRET: clientSecret,
      REDIRECT_URI: redirectUri,
      GRANT_TYPE: grantType,
      RESOURCE: resource,
    },
  };

  request(option, function (error, response) {
    if (error) {
      console.log(error);
      throw new Error(error);
    }
    console.log(response.body);
    return response.body;
  });
}

export default getAuthorized;
