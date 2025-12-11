"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getSubjects } from "@/lib/services/subjects.service";

export function useSubjects(limit = 6) {
    return useInfiniteQuery({
        queryKey: ["subjects", limit],
        queryFn: ({ pageParam = 1 }) => getSubjects(pageParam, limit),
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const { currentPage, numberOfPages } = lastPage.metadata;

            if (currentPage >= numberOfPages) {
                return undefined;
            }
            return currentPage + 1;
        },
    });
}
