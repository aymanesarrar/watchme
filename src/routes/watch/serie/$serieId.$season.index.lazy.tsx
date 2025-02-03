import EpisodeCard from "@/components/episode-card";
import { Pagination } from "@/components/pagination";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
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
    `${import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "https://watchme-backend-production.up.railway.app"}/serie/${serieId}/${season}`
  );
  return await response.json();
};

function RouteComponent() {
  const { serieId, season } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: [serieId, season],
    queryFn: () => fetchEpisodeList(serieId, season),
  });
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin h-10 w-10" />
      </div>
    );

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
              <Link
                to={`/watch/serie/$serieId/$season/$episode`}
                params={{ serieId, season, episode: (index + 1).toString() }}
              >
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
