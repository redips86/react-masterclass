const API_KEY = "19ff57bb5b5c2d03faf98bcd8fe0d7c1";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IGetMoviesResult {
    dates: Dates;
    page: number;
    results: Result[];
    total_pages: number;
    total_results: number;
}

export interface Dates {
    maximum: Date;
    minimum: Date;
}

export interface Result {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export enum OriginalLanguage {
    En = "en",
    Es = "es",
    Fr = "fr",
}


export async function getMovies() {
    return await fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
        .then(response => response.json());
}

