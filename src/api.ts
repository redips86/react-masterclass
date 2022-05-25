const API_KEY = "19ff57bb5b5c2d03faf98bcd8fe0d7c1";
const BASE_PATH = "https://api.themoviedb.org/3";


export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => response.json());
}

