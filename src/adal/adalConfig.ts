export const adalConfig: any = {
  clientId: process.env.REACT_APP_CLIENT_ID || '1234',
  endpoints: {
    api: 'http://localhost:8080' // Necessary for CORS requests, for more info see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/CORS-usage
  },
  // 'tenant' is the Azure AD instance.
  tenant: process.env.REACT_APP_TENANT || '1234',
  // 'cacheLocation' is set to 'sessionStorage' by default (see https://github.com/AzureAD/azure-activedirectory-library-for-js/wiki/Config-authentication-context#configurable-options.
  // We change it to'localStorage' because 'sessionStorage' does not work when our app is served on 'localhost' in development.
  cacheLocation: 'localStorage'
};
