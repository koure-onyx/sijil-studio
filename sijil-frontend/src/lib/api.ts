
// Search API functions
export const searchContent = async (
  query: string,
  filters: { type?: string; subject?: string; grade?: string; page?: number }
) => {
  const params = new URLSearchParams({ q: query });
  if (filters.type) params.set('type', filters.type);
  if (filters.subject) params.set('subject', filters.subject);
  if (filters.grade) params.set('grade', filters.grade);
  if (filters.page) params.set('page', filters.page.toString());

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Search failed: ${response.status}`);
  }

  return response.json();
};

export const getSearchSuggestions = async (query: string) => {
  const response = await fetch(`${API_BASE_URL}/search/suggestions?q=${encodeURIComponent(query)}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch suggestions');
  }

  return response.json();
};

export const getSearchFilters = async () => {
  const response = await fetch(`${API_BASE_URL}/search/filters`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch filters');
  }

  return response.json();
};

export const trackSearch = async (query: string, resultId?: string) => {
  try {
    await fetch(`${API_BASE_URL}/analytics/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        result_id: resultId,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    console.error('Failed to track search:', error);
  }
};
