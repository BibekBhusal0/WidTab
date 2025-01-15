export const urlPattern = /(https?:\/\/[^\s"'"]+|www\.[^\s"'"]+)/;

export function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export const extractURL = (text: string) => text.match(urlPattern) || [];

export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str;
  const urls = extractURL(str);
  if (urls.length > 0) return urls[0];
  try {
    if (str.includes(".") && !str.includes(" ")) {
      return new URL(`https://${str}`).toString();
    }
  } catch (e) {
    return null;
  }
  return null;
}
