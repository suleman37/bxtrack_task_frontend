import Cookies from 'js-cookie';

const Token = 'token';
const authCookieOptions = {
  path: '/',
  sameSite: 'lax' as const,
};

export const setAuthTokenCookie = (token: string) => {
  Cookies.set(Token, token, authCookieOptions);
};

export const removeAuthTokenCookie = () => {
  Cookies.remove(Token, authCookieOptions);
};

export const getAuthTokenCookie = () => Cookies.get(Token);
