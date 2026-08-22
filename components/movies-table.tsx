"use client";

import { useEffect, useMemo } from "react";
import { Film } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Anchor } from "@/components/ui/anchor";
import { Badge } from "@/components/ui/badge";
import { useGetMoviesInfo } from "@/lib/api-hooks";
import { sortArrayByKeys } from "@/lib/array";
import { FetchStatus, MovieService } from "@/lib/enums";

interface MoviesTableProps {
  service: MovieService;
}

export function MoviesTable({ service }: MoviesTableProps) {
  const [fetchState, moviesInfo, getMoviesInfo] = useGetMoviesInfo(service);
  const { items: movies, updatedAt } = moviesInfo;

  useEffect(() => {
    getMoviesInfo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  const sortedMovies = useMemo(() => {
    const seenTitles = new Set<string>();
    const uniqueMovies = movies.filter((movie) => {
      const normalizedTitle = movie.title.trim().toLowerCase();
      if (seenTitles.has(normalizedTitle)) {
        return false;
      }
      seenTitles.add(normalizedTitle);
      return true;
    });

    return sortArrayByKeys(uniqueMovies, { title: 1 });
  }, [movies]);

  if (fetchState === FetchStatus.Failure) {
    return null;
  }

  if (fetchState !== FetchStatus.Success) {
    return (
      <Table className="my-6">
        <TableCaption>
          <Skeleton className="h-5 w-1/2" />
        </TableCaption>
        <TableHeader>
          <TableRow className="h-[48px]">
            <TableHead className="w-[70px] sm:w-[90px]">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="min-w-[150px]">
              <Skeleton className="h-5 w-3/4" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="hidden sm:table-cell">
              <Skeleton className="h-5 w-full" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-5 w-20" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, index) => (
            <TableRow key={index} className="h-[177px] sm:h-[139.2px]">
              <TableCell className="align-top">
                <Skeleton className="h-[75px] w-[50px] sm:h-[105px] sm:w-[70px]" />
              </TableCell>
              <TableCell className="align-top">
                <Skeleton className="h-5 w-full sm:w-4/5" />
                <div className="mt-2 space-y-2 sm:hidden">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </TableCell>
              <TableCell className="hidden align-top sm:table-cell">
                <Skeleton className="h-5 w-16" />
              </TableCell>
              <TableCell className="hidden align-top sm:table-cell">
                <Skeleton className="mb-2 h-4 w-12" />
                <Skeleton className="h-5 w-24" />
              </TableCell>
              <TableCell className="text-right align-top">
                <Skeleton className="ml-auto h-5 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (sortedMovies.length === 0) {
    return (
      <Alert className="my-6" data-clarity-unmask="true">
        <Film className="mt-1 h-4 w-4" />
        <AlertTitle className="leading-normal">
          No movies currently showing.
        </AlertTitle>
      </Alert>
    );
  }

  return (
    <Table className="my-6" data-clarity-unmask="true">
      <TableCaption>Last updated on {updatedAt}.</TableCaption>
      <TableHeader>
        <TableRow className="h-[48px]">
          <TableHead className="w-[70px] sm:w-[90px]">Poster</TableHead>
          <TableHead className="min-w-[150px]">
            Title
            <div className="sm:hidden">/ Details</div>
          </TableHead>
          <TableHead className="hidden sm:table-cell">Language</TableHead>
          <TableHead className="hidden sm:table-cell">
            Rating / Genres
          </TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedMovies.map((movie, index) => {
          const key = `${movie.title}-${movie.link}-${index}`;

          return (
            <TableRow key={key}>
              <TableCell className="align-top">
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  width={movie.imageWidth || 79}
                  height={movie.imageHeight || 120}
                  className="h-auto max-w-[50px] rounded object-cover sm:max-w-[70px]"
                  loading="lazy"
                />
              </TableCell>
              <TableCell className="align-top">
                <div className="font-medium text-foreground">
                  {movie.title} ({movie.year})
                </div>
                <div className="mt-1 space-y-1 sm:hidden">
                  <div className="text-xs text-muted-foreground">
                    Language: {movie.language}
                  </div>
                  {movie.rating && movie.rating !== "-" && (
                    <div className="text-xs text-muted-foreground">
                      Rating: ⭐ {movie.rating}
                    </div>
                  )}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {movie.genres.map((genre) => (
                        <Badge
                          key={genre}
                          variant="secondary"
                          className="text-[10px]"
                        >
                          {genre}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden align-top sm:table-cell">
                <Badge variant="outline">{movie.language}</Badge>
              </TableCell>
              <TableCell className="hidden align-top sm:table-cell">
                {movie.rating && movie.rating !== "-" && (
                  <div className="mb-1 text-xs text-muted-foreground">
                    ⭐ {movie.rating}
                  </div>
                )}
                {movie.genres && movie.genres.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {movie.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="text-xs"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right align-top">
                <Anchor href={movie.link} isExternal>
                  View Details
                </Anchor>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
