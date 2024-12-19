import { createLazyFileRoute, useParams } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/watch/movie/$movieId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { movieId } = Route.useParams();
  return (
    <div className="flex items-center justify-center flex-1">
      <iframe
        src={`https://vidsrc.icu/embed/movie/${movieId}`}
        frameBorder="0"
        scrolling="no"
        className="w-full h-full"
        allowFullScreen
      ></iframe>
    </div>
  );
}
