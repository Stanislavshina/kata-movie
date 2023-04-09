import axios from "axios";

const apiKey = '3f4500495f42846a3bc4ece4dad1244b';
const statickUrl = 'https://api.themoviedb.org/3';

export const getRatedMovies = async (token: string, page = 1,  ) => {
  const response = await axios.get(`https://api.themoviedb.org/3/guest_session/${token}/rated/movies?api_key=${apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`);
  return response
}


const getResources = async (url:string, query?: string, page?: number) => {
    const response = await axios.get(`${statickUrl}${url}`, {
      params: {
        api_key: apiKey,
        query: query || 'return',
        page: page  || 1
      }
    })
    return response
  };

export const getMovies =  (searchParam: string, page: number) => {
  return getResources('/search/movie', searchParam, page);
}

export const setGuestSession = async () => {
  const token = await axios.get(`${statickUrl}/authentication/guest_session/new`,{
    params: {
      api_key: apiKey
    }
  });
  localStorage.setItem('token', token.data.guest_session_id)
}

export const getGenres = () => {
  return getResources(`/genre/movie/list`);
}

export const postRate = async (id: number, rate: number, token: string) => {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }, body: JSON.stringify({
      value: rate
    })});
  return response
}

export const deleteRating = async(id: number, token: string) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}&guest_session_id=${token}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
  return response;
}