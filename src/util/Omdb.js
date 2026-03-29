export function getFilm(search) {
  return fetch(`https://www.omdbapi.com/?t=${search}&apikey=5c31df61`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return {
        poster: data.Poster,
        title: data.Title,
        year: data.Year,
      };
    });
}
