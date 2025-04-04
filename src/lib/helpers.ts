import { ISearch } from "@/types/types";

export async function fetchMovieList(key: string): Promise<ISearch> {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "https://watchme-backend-production.up.railway.app"}/search/${key}`
  ).then((data) => data.json());
  return response;
}
export const fetchEpisodeList = async (
  serieId: string,
  season: string
): Promise<{
  serieId: string;
  title: string;
  seasons: number;
  episodes: Array<{
    description: string;
    image: string;
    releaseDate: string;
    title: string;
  }>;
}> => {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "https://watchme-backend-production.up.railway.app"}/serie/${serieId}/${season}`
  );
  return await response.json();
};
