import {useRef, useMemo  } from "react";
import { IOptions, IPost } from "../types";

export function useFilters(posts: IPost[], { sort = "ASC", filter }: IOptions): { result: IPost[] } {
  const postsRef = useRef<IPost[]>(posts);


  useMemo(() => {
    if (!postsRef.current.length) return;

    if (filter.name && !filter.value.length) return;
    

    postsRef.current = postsRef.current.filter((post) => {
      const description = post.description;

      return description.includes(filter.value);
    });
  }, [filter.name, filter.value, postsRef]);

  useMemo(() => {
    if (sort === "DESC")  postsRef.current =  [...postsRef.current].sort((a, b) => b.id - a.id);

    if (sort === "ASC") postsRef.current =  [...postsRef.current].sort((a, b) => a.id - b.id);
  
  }, [sort, postsRef]);

  return { result: postsRef.current };
}