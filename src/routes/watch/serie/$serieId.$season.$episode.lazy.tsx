import { createLazyFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
export const Route = createLazyFileRoute(
  "/watch/serie/$serieId/$season/$episode"
)({
  component: RouteComponent,
});

function RouteComponent() {
  const { episode, serieId, season } = Route.useParams();
  window.localStorage.setItem(
    "watchme-episode",
    JSON.stringify({ episode, serieId, season })
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
