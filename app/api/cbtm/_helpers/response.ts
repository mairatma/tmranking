// 1 hour CDN cache
export const CACHE_CONTROL_HEADER_ONE_HOUR = 'public, max-age=3600';
export const CACHE_CONTROL_HEADER_NO_CACHE =
  'no-store, no-cache, must-revalidate';

/**
 * Return today's date in YYYY-MM-DD format
 */
export function buildEtag() {
  return new Date().toISOString().split('T')[0];
}

interface ResponseHeadersOptions {
  noCache?: boolean;
}

export function buildResponseHeaders(options?: ResponseHeadersOptions) {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
    ETag: buildEtag(),
    'Cache-Control': options?.noCache
      ? CACHE_CONTROL_HEADER_NO_CACHE
      : CACHE_CONTROL_HEADER_ONE_HOUR,
  };
}
