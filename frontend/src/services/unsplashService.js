const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = import.meta.env.VITE_UNSPLASH_SECRET_KEY;

const BASE_URL = '/api/unsplash';

export const searchImages = async (query, page = 1, perPage = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

export const getRandomImages = async (count = 10) => {
  try {
    const response = await fetch(
      `${BASE_URL}/random?count=${count}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch random images');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching random images:', error);
    throw error;
  }
};

export const getImageById = async (id) => {
  try {
    const response = await fetch(
      `${BASE_URL}/photos/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error;
  }
}; 