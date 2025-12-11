"use client";

import Loading from "@/app/loading";
import { useSubjects } from "@/hooks/use-subjects";
import { Subject } from "@/lib/types/subject";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";

export default function FetchSubject() {

    const { data, isLoading, isError, fetchNextPage, hasNextPage, } = useSubjects();

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

    const allSubjects: Subject[] =
        data?.pages.flatMap((page) => page.subjects) ?? [];

    return (
        <InfiniteScroll
            dataLength={allSubjects.length}
            next={fetchNextPage}
            hasMore={!!hasNextPage}
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
                {allSubjects.map((subject: Subject) => (
                    <Link
                        key={subject._id}
                        href={`/${subject._id}`}
                        className="relative flex justify-center"
                    >
                        <Image
                            className="w-full"
                            src={subject.icon}
                            width={400}
                            height={0}
                            alt={`${subject.name} Logo`}
                            priority
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
