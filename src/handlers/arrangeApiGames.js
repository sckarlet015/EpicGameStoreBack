const arrangeApiGames = (videogames) => {
  const arrangedGames = videogames.map((game) => ({
    apiId: game.apiId,
    name: game.name,
    image: game.background_image,
    genres: game.genres.map((genre) => genre.name),
    platforms: game.platforms.map((platform) => platform.platform.name),
    screenshots: game.screenshots.map((screenshot) => screenshot.image).join(','),
    rating: game.rating,
    price: game.price,
    stock: game.stock
  }));
  
  return arrangedGames;
};

module.exports = arrangeApiGames;
