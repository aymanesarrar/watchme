import { fetchEpisodeList } from "@/utils/request";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import { motion } from "motion/react";
import { useQueryState } from "nuqs";
import { useCallback, useEffect } from "react";
export const Route = createLazyFileRoute(
  "/watch/serie/$serieId/$season/$episode"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useQueryState("q");
  const { episode, serieId, season } = Route.useParams();
  window.localStorage.setItem(
    "watchme-episode",
    JSON.stringify({ episode, serieId, season })
  );
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [serieId, season, episode],
    queryFn: () => fetchEpisodeList(serieId, season),
  });
  const handleKeyPress = useCallback(
    (e: any) => {
      if (data) {
        if (e.key === "n" || e.key === "N") {
          if (data?.episodes[+episode]) {
            navigate({
              to: `/watch/serie/$serieId/$season/$episode`,
              params: { serieId, season, episode: (+episode + 1).toString() },
              search: { search },
            });
          } else {
            if (data?.seasons > +season) {
              navigate({
                to: `/watch/serie/$serieId/$season/$episode`,
                params: {
                  serieId,
                  season: (+season + 1).toString(),
                  episode: "1",
                },
                search: { search },
              });
            }
          }
        }
      }
    },
    [data, episode, season, serieId, navigate]
  );
  useEffect(() => {
    window.addEventListener("keyup", handleKeyPress);
    return () => {
      window.removeEventListener("keyup", handleKeyPress);
    };
  }, [handleKeyPress]);
  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <LoaderCircle className="animate-spin h-10 w-10" />
      </div>
    );
  return (
    <div className="flex items-center justify-center flex-1">
      <motion.iframe
        src={`https://vidsrc.icu/embed/tv/${serieId}/${season}/${episode}`}
        frameBorder="0"
        scrolling="no"
        className="h-full relative"
        allowFullScreen
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        key={serieId}
      ></motion.iframe>
    </div>
  );
}
