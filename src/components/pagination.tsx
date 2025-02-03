import { MoveLeft, MoveRight } from "lucide-react";
import { PaginationItem } from "./pagination-item";
import { Link } from "@tanstack/react-router";

export const Pagination = ({
  seasonsCount,
  currentSeason,
  serieId,
}: {
  seasonsCount: number;
  currentSeason: string;
  serieId: string;
}) => {
  const seasons = Array.from({ length: seasonsCount }, (_, i) => i + 1);
  return (
    <div className="z-50 fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-white/30 backdrop-blur-md border border-gray-200 rounded-full shadow-lg gap-2 flex p-2 items-center">
      <Link
        to="/watch/serie/$serieId/$season"
        params={{ serieId, season: (+currentSeason - 1).toString() }}
      >
        <PaginationItem disabled={+currentSeason === 1}>
          <MoveLeft />
        </PaginationItem>
      </Link>

      {seasons.map((season) => (
        <Link
          to={`/watch/serie/$serieId/$season`}
          key={`${serieId}-${season}`}
          params={{ serieId, season: season.toString() }}
        >
          <PaginationItem isActive={season.toString() === currentSeason}>
            {season}
          </PaginationItem>
        </Link>
      ))}
      <Link
        to="/watch/serie/$serieId/$season"
        params={{ serieId, season: (+currentSeason + 1).toString() }}
      >
        <PaginationItem disabled={+currentSeason === seasonsCount}>
          <MoveRight />
        </PaginationItem>
      </Link>
    </div>
  );
};
