import EpisodeCard from "@/components/episode-card";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";

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

  return (
    <div>
      <Pagination
        seasonsCount={data?.seasons as number}
        currentSeason={season}
        serieId={serieId}
      />
      <AnimatePresence mode="wait">
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, layout: { duration: 0.3 } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          key={season}
        >
          {data?.episodes?.map((episode, index) => (
            <motion.div
              layout
              key={episode.title}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/watch/serie/${serieId}/${season}/${index + 1}`}>
                <EpisodeCard
                  title={episode.title}
                  description={episode.description}
                  releaseDate={episode.releaseDate}
                  image={episode.image}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
