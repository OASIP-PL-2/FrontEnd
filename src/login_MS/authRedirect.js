import { msalConfig, apiConfig, loginRequest, tokenRequest } from './authConfig.js'
import * as msal from '@azure/msal-browser';

// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
const myMSALObj = new msal.PublicClientApplication(msalConfig);

let username = "";

myMSALObj.handleRedirectPromise()
    .then(handleResponse)
    .catch(error => {
        console.error(error);
    });

function selectAccount () {

    /**
     * See here for more information on account retrieval: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
     */

    const currentAccounts = myMSALObj.getAllAccounts();

    if (!currentAccounts  || currentAccounts.length < 1) {
        return;
    } else if (currentAccounts.length > 1) {
        // Add your account choosing logic here
        console.warn("Multiple accounts detected.");
    } else if (currentAccounts.length === 1) {
        username = currentAccounts[0].username;
        console.log(username);
        // welcomeUser(username);
    }
}

function handleResponse(response) {

    /**
     * To see the full list of response object properties, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
     */

    if (response !== null) {

        username = response.account.username;
        const claims =  response.idTokenClaims;
        console.log(claims);
        const user = {
            name : claims.name,
            email : claims.preferred_username,
            role : claims.roles[0]
        }
        
        localStorage.setItem('userDetail', JSON.stringify(user))
        localStorage.setItem('isLoginMs', true)

        getTokenRedirect(tokenRequest)
        .then(response => {
            localStorage.setItem('accessToken', response.accessToken)
            localStorage.setItem('refreshToken', response.accessToken)
        }).catch(error => {
            console.error(error);
        });

        // Swal.fire(
        //     'Login Successfully',
        //     'You clicked the button!',
        //     'success'
        // ).then((res) => {
        //     window.location.replace("../");
        // })
        // welcomeUser(username);
    } else {
        selectAccount();
    }
}

function signIn() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    myMSALObj.loginRedirect(loginRequest); //มันจะไปเรียก handleResponse auto
}

function signOut() {

    /**
     * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
     */

    // Choose which account to logout from by passing a username.
    const logoutRequest = {
        account: myMSALObj.getAccountByUsername(username)
    };

    myMSALObj.logout(logoutRequest);
}

function getTokenRedirect(request) {

    /**
    * See here for more info on account retrieval: 
    * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
    */

   request.account = myMSALObj.getAccountByUsername(username);
   
   return myMSALObj.acquireTokenSilent(request)
       .catch(error => {
           console.error(error);
           console.warn("silent token acquisition fails. acquiring token using popup");
           if (error instanceof msal.InteractionRequiredAuthError) {
               // fallback to interaction when silent call fails
               return myMSALObj.acquireTokenRedirect(request);
           } else {
               console.error(error);   
           }
   });
}
 
// Acquires and access token and then passes it to the API call
function passTokenToApi() {
    getTokenRedirect(tokenRequest)
        .then(response => {
            callApi(apiConfig.uri, response.accessToken);
        }).catch(error => {
            console.error(error);
        });
}

const callApi = async () =>{
    if(user == 0){return 0}
        console.log('In progress .....');
        const res = await fetch(`http://localhost:8082/api/users`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if(res.status === 201){
            console.log('Successfully executed! ' + res.status);
            Swal.fire(
                'Register Successfully',
                'You clicked the button!',
                'success'
            ).then((res) => {
                window.location=document.referrer
            })
        }else {
            const response = await res.json() 
            Swal.fire({
                icon: 'warning',
                text: response.message,
            }) 
            console.log('Failed to execute! ' + res.status);
        }
}

export { signIn , signOut, callApi}

