/* This utility normalizes image URLs to use a single valid domain,
 because the API returns mixed domains (some with invalid SSL),
 which causes broken images in the frontend. */

const BASE_URL = "https://exam-app.elevate-bootcamp.cloud";

export function normalizeImageUrl(url: string) {
  if (!url) return "";

  if (url.startsWith("/")) {
    return `${BASE_URL}${url}`;
  }

  return url
    .replace("https://elevate-bootcamp.cloud", BASE_URL)
    .replace("https://www.elevate-bootcamp.cloud", BASE_URL);
}
