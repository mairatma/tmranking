export const buildCrawlerResponse = <T extends Record<string, unknown>>(
  data: T,
) => {
  return {
    ...data,
    crawledAt: new Date().toISOString(),
  };
};
