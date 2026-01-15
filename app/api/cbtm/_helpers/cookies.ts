export const getCookiesFromResponse = (response: Response) => {
  return response.headers
    .getSetCookie()
    .map((cookie) => {
      // Split by semicolon and take only the first part (the name=value pair)
      return cookie.split(';')[0].trim();
    })
    .join('; ');
};
