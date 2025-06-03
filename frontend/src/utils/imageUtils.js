const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export const getUnsplashImage = async (query) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return {
        imageUrl: data.results[0].urls.regular,
        photographer: data.results[0].user.name,
        photographerUrl: data.results[0].user.links.html
      };
    }
    return null;
  } catch (error) {
    console.error('Error fetching image from Unsplash:', error);
    return null;
  }
};

// Fallback images for different categories
export const CATEGORY_FALLBACK_IMAGES = {
  comics: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', // comic books
  'action-figures': 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80', // action figures
  'trading-cards': 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80', // trading cards
  posters: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', // posters
  'retro-games': 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=800&q=80', // Retro gaming console
  'vinyl-records': 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80', // Vinyl records
  'movie-memorabilia': 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80', // Movie props
  'sports-memorabilia': 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80', // Sports collectibles
  'art-prints': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80', // Art prints
  'vintage-toys': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=800&q=80', // Vintage toys
  'model-kits': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80' // Model kits
}; 