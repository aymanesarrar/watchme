import { ChangeEvent, useState } from "react";
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
async function fetchMovieList(key: string): Promise<ISearch> {
  const response = await fetch(
    `https://v3.sg.media-imdb.com/suggestion/x/${key}.json`
  ).then((data) => data.json());
  return response;
}

export function AppSidebar() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["movieList", search],
    queryFn: () => fetchMovieList(search),
    enabled: search.length > 0,
  });

  const handleDebounceValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <Input onChange={handleDebounceValue} value={search} />
      </SidebarHeader>
      <SidebarContent>
        <div className="flex flex-col gap-2 p-2">
          {data?.d?.map((item) => (
            <Link key={item.id} href={`/watch/movie/${item.id}`}>
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
