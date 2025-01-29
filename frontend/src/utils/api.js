export const API_URL = 'http://localhost:5000';

export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  
  return fetch(`http://localhost:5000${url}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    }
  });
}; 