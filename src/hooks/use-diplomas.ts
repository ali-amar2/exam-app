"use client";

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getDiplomaById, getDiplomas } from "@/lib/services/diplomas.service";

export function useDiplomas(limit = 6) {
  return useInfiniteQuery({
    queryKey: ["diplomas", limit],

    queryFn: ({ pageParam = 1 }) => getDiplomas(pageParam as number, limit),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.metadata;
      return page < totalPages ? page + 1 : undefined;
    },

    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 5,
    retry: 1,
  });
}

export function useDiploma(id: string) {
  return useQuery({
    queryKey: ["diploma", id],
    queryFn: () => getDiplomaById(id),
    enabled: !!id,
  });
}
