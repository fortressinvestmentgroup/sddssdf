export const createPageUrl = (page: string): string => {
  // Simple URL creation utility
  const basePath = page.toLowerCase().replace(/\?.*/, '');
  const queryParams = page.includes('?') ? page.split('?')[1] : '';
  
  if (queryParams) {
    return `/${basePath}?${queryParams}`;
  }
  
  return `/${basePath}`;
};