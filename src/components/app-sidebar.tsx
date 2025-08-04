import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import { useQuery } from "@tanstack/react-query";
import { ISearch } from "@/types/types";
import { motion } from "motion/react";
import { Link, useParams } from "@tanstack/react-router";
import { useQueryState } from "nuqs";
import { Button } from "./ui/button";
import { fetchEpisodeList } from "@/utils/request";
import { LoaderCircle } from "lucide-react";
async function fetchMovieList(key: string): Promise<ISearch> {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "https://watchme-backend-production.up.railway.app"}/search/${key}`
  ).then((data) => data.json());
  return response;
}

export function AppSidebar() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const { serieId, season, episode } = useParams({ strict: false });
  const { data: episodes } = useQuery({
    queryKey: [serieId, season],
    queryFn: () => fetchEpisodeList(serieId || "", season || ""),
    enabled: !!serieId && !!season && !!episode,
  });

  const { data } = useQuery({
    queryKey: ["movieList", search],
    queryFn: () => fetchMovieList(search),
    enabled: search.length > 0,
  });

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const lastWatched = window.localStorage.getItem("watchme-episode")
    ? JSON.parse(window.localStorage.getItem("watchme-episode") as string)
    : null;

  return (
    <Sidebar>
      <SidebarHeader>
        <Input onChange={handleInputSearch} value={search} />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 p-2">
          {data?.d?.map((item) => (
            <Link
              key={item.id}
              to={
                item.qid === "movie"
                  ? `/watch/movie/$movieId`
                  : `/watch/serie/$serieId/$season`
              }
              params={{ movieId: item.id, serieId: item.id, season: "1" }}
              search={{
                q: search,
              }}
            >
              <motion.img
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                src={item?.i?.imageUrl}
                alt={item?.s}
                className="hover:cursor-pointer"
              />
            </Link>
          ))}
        </div>
      </SidebarContent>
      <SidebarFooter>
        {episodes && episode && season && serieId && (
          <div className="flex flex-col w-full gap-1 justify-between ">
            <Link
              to={`/watch/serie/$serieId/$season/$episode`}
              params={{
                serieId: serieId,
                season: episodes?.episodes[+episode]
                  ? season
                  : episodes.seasons > +season
                    ? (+season + 1).toString()
                    : season,
                episode: episodes?.episodes[+episode]
                  ? (+episode + 1).toString()
                  : episodes.seasons > +season
                    ? "1"
                    : episode,
              }}
              search={{
                q: search,
              }}
              className="w-full"
            >
              <Button className="w-full">Next episode</Button>
            </Link>
            <Link
              to={`/watch/serie/$serieId/$season/$episode`}
              params={{
                serieId: serieId,
                season: episode == "1" ? (+season - 1).toString() : season,
                episode:
                  episode === "1"
                    ? (episodes.episodes.length - 1).toString()
                    : (+episode - 1).toString(),
              }}
              className="w-full"
            >
              <Button className="w-full">Previous episode</Button>
            </Link>
          </div>
        )}
        {lastWatched && (
          <Link
            to={`/watch/serie/$serieId/$season/$episode`}
            params={{
              serieId: lastWatched.serieId,
              season: lastWatched.season,
              episode: lastWatched.episode,
            }}
            className="w-full"
          >
            <Button className="w-full">Continue Watching</Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
