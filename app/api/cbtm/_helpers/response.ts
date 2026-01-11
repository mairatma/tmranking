// 1 hour CDN cache
export const CACHE_CONTROL_HEADER_VALUE = 'public, max-age=3600';

/**
 * Return today's date in YYYY-MM-DD format
 */
export function buildEtag() {
  return new Date().toISOString().split('T')[0];
}

export function buildResponseHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
    ETag: buildEtag(),
    'Cache-Control': CACHE_CONTROL_HEADER_VALUE,
  };
}
