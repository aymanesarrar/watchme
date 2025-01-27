import { createLazyFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createLazyFileRoute("/watch/movie/$movieId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();

  return (
    <div className="flex items-center justify-center flex-1">
      <motion.iframe
        src={`https://vidsrc.icu/embed/movie/${movieId}`}
        frameBorder="0"
        scrolling="no"
        className="h-full"
        allowFullScreen
        initial={{ width: 0 }}
        animate={{ width: "100%" }}
        key={movieId}
      ></motion.iframe>
    </div>
  );
}
