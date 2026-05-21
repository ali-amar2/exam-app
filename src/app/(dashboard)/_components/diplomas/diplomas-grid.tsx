"use client";

import Loading from "@/app/loading";
import { useDiplomas } from "@/hooks/use-diplomas";
import Image from "next/image";
import Link from "next/link";
import InfiniteScroll from "react-infinite-scroll-component";
import DiplomaSkeleton from "./diplomas-skeleton";
import { normalizeImageUrl } from "@/lib/utils/image-url";

export default function DiplomasGrid() {
  //  Hooks
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useDiplomas(6);

  // variables
  const diplomas: Diploma[] =
    data?.pages.flatMap((page) => page.data).reverse() ?? [];

  if (isLoading) {
    return (
      <div className="w-full py-4">
        <DiplomaSkeleton count={6} />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        className="flex items-center justify-center"
        role="alert"
        aria-live="assertive"
      >
        <p className="text-center py-4 mt-5 text-red-500">
          Error loading diplomas
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={diplomas.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="py-4 flex justify-center" aria-live="polite">
          <Loading />
        </div>
      }
      endMessage={
        <p
          role="status"
          aria-live="polite"
          className="text-center py-4 my-2 text-slate-600 bg-slate-100"
        >
          No more diplomas to load
        </p>
      }
    >
      <ul
        className="grid lg:grid-cols-2 xl:grid-cols-3 gap-2 py-2"
        aria-label="Diplomas list"
      >
        {diplomas.map((diploma) => (
          <li key={diploma.id}>
            <Link
              href={`/${diploma.id}`}
              aria-label={`View ${diploma.title} diploma`}
              className="group relative flex justify-center h-96 "
            >
              <Image
                src={normalizeImageUrl(diploma.image)}
                width={400}
                height={400}
                alt={diploma.title}
                sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="w-full h-full object-fill"
              />

              <div className="flex absolute flex-col text-white p-5 w-11/12 bottom-3 bg-[rgba(21,93,252,0.75)] shadow text-xl font-medium justify-center transition-all duration-300 max-h-24 overflow-hidden hover:max-h-96 group-focus-within:max-h-96">
                {/* Title */}
                <div>{diploma.title}</div>

                {/* Description */}
                <p className="line-clamp-2 text-base mt-2 text-zinc-300">
                  {diploma.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </InfiniteScroll>
  );
}
