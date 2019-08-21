import { adalFetch, AuthenticationContext, withAdalLogin } from 'react-adal';
import { adalConfig } from './adalConfig';

export const authContext = new AuthenticationContext(adalConfig);

export const getToken = authContext.getCachedToken(adalConfig.clientId);

export const logout = (e: any) => {
  e.preventDefault();
  return authContext.logOut();
};

export const userInfo = () => {
  let user: any = authContext.getCachedUser();
  return user && user.userName ? user.userName : '';
};

export const adalApiFetch = (fetch: any, url: any, options: any) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
