import EpisodeCard from "@/components/episode-card";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/watch/serie/$serieId/$season/")({
  component: RouteComponent,
});

const fetchEpisodeList = async (
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
    `http://localhost:3000/serie/${serieId}/${season}`
  );
  return await response.json();
};

function RouteComponent() {
  const { serieId, season } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: [serieId, season],
    queryFn: () => fetchEpisodeList(serieId, season),
  });
  if (isLoading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div>
      <Pagination
        seasonsCount={data?.seasons as number}
        currentSeason={season}
        serieId={serieId}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.episodes?.map((episode, index) => (
          <Link
            key={episode.title}
            href={`/watch/serie/${serieId}/${season}/${index}`}
          >
            <EpisodeCard
              title={episode.title}
              description={episode.description}
              releaseDate={episode.releaseDate}
              image={episode.image}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
