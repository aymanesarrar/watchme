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
import { Link } from "@tanstack/react-router";
import { useQueryState } from "nuqs";
async function fetchMovieList(key: string): Promise<ISearch> {
  const response = await fetch(
    `${import.meta.env.VITE_NODE_ENV === "development" ? "http://localhost:3000" : "https://watchme-backend-production.up.railway.app"}/search/${key}`
  ).then((data) => data.json());
  return response;
}

export function AppSidebar() {
  const [search, setSearch] = useQueryState("q", { defaultValue: "" });
  const { data } = useQuery({
    queryKey: ["movieList", search],
    queryFn: () => fetchMovieList(search),
    enabled: search.length > 0,
  });

  const handleInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
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
      <SidebarFooter />
    </Sidebar>
  );
}
