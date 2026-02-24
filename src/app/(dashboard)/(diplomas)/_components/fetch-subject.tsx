"use client";
import { useState, useMemo } from "react";
import Loading from "@/app/loading";
import { useSubjects } from "@/hooks/use-subjects";
import { Subject } from "@/lib/types/subject";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FetchSubject() {
  const { data, isLoading, isError } = useSubjects();

  const [visibleCount, setVisibleCount] = useState(6);

  const allSubjects: Subject[] =
    data?.pages.flatMap((page) => page.subjects) ?? [];

  const visibleSubjects = useMemo(() => {
    return allSubjects.slice(0, visibleCount);
  }, [allSubjects, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[31rem]">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center">
        <p className="text-center py-4 my-2 text-red-500 bg-red-100">
          Error loading subjects
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={visibleSubjects.length}
      next={loadMore}
      hasMore={visibleCount < allSubjects.length}
      loader={
        <div className="py-4 flex justify-center">
          <Loading />
        </div>
      }
      endMessage={
        <p className="text-center py-4 my-2 text-red-500 bg-red-100">
          No more subjects to load
        </p>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-2">
        {visibleSubjects.map((subject: Subject) => (
          <Link
            key={subject._id}
            href={`/${subject._id}`}
            className="relative flex justify-center h-96"
          >
            <Image
              className="w-full"
              src={subject.icon}
              width={400}
              height={0}
              alt={`${subject.name} Logo`}
            />
            <div className="flex absolute text-white p-5 w-11/12 bottom-3 bg-[#155DFC80] shadow text-xl font-medium justify-center">
              {subject.name}
            </div>
          </Link>
        ))}
      </div>
    </InfiniteScroll>
  );
}
