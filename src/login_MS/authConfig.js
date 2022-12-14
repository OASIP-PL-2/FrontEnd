import * as msal from '@azure/msal-browser';

const msalConfig = {
    auth: {
        clientId: "9d2b94d8-c9c7-4a35-8f2c-6910f6576911",
        authority: "https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d",
        redirectUri: "http://localhost:3000/pl2/",
    },
    cache: {
        cacheLocation: "localStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add here the endpoints and scopes for the web API you would like to use.
const apiConfig = {
    uri: "http://localhost:8082/api", // e.g. http://localhost:5000/api ** url ที่จะเรียกไป backend
    scopes: ["api://9d2b94d8-c9c7-4a35-8f2c-6910f6576911/access_as_user"] // e.g. ["scp1", "scp2"] ** scope ของ api
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
    scopes: ["openid", "profile"]
};

/**
 * Scopes you add here will be used to request a token from Azure AD to be used for accessing a protected resource.
 * To learn more about how to work with scopes and resources, see: 
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
    scopes: [...apiConfig.scopes],
};

// exporting config object for jest
if (typeof exports !== 'undefined') {
    module.exports = {
        msalConfig: msalConfig,
    };
}

export { msalConfig, apiConfig, loginRequest, tokenRequest };