import Cookies from 'js-cookie';

const Token = 'token';
const Role = 'role';
const ActingOrganizationId = 'acting_organization_id';
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

export const setAuthRoleCookie = (role: string) => {
  Cookies.set(Role, role, authCookieOptions);
};

export const removeAuthRoleCookie = () => {
  Cookies.remove(Role, authCookieOptions);
};

export const getAuthRoleCookie = () => Cookies.get(Role);

export const setActingOrganizationIdCookie = (organizationId: string) => {
  Cookies.set(ActingOrganizationId, organizationId, authCookieOptions);
};

export const removeActingOrganizationIdCookie = () => {
  Cookies.remove(ActingOrganizationId, authCookieOptions);
};

export const getActingOrganizationIdCookie = () =>
  Cookies.get(ActingOrganizationId);
