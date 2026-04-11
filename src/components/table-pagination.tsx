"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "./ui/button";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TablePaginationProps {
  totalCount: number;
  hasNextPage?: boolean;
}

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

export function TablePagination({
  totalCount,
  hasNextPage,
}: TablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageSize = Number(searchParams.get("pageSize") || 10);
  const pageIndex = Number(searchParams.get("page") || 1);

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([name, value]) => {
        params.set(name, value);
      });
      return params.toString();
    },
    [searchParams]
  );

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const queryString = createQueryString(updates);
      router.push(`?${queryString}`);
    },
    [createQueryString, router]
  );

  const handlePageSize = (value: string) => {
    updateParams({ pageSize: value, page: "1" });
  };

  const handlePageIndex = (value: number) => {
    updateParams({ page: value.toString() });
  };

  // Pagination button handlers
  const handlePreviousPage = () => handlePageIndex(pageIndex - 1);
  const handleNextPage = () => handlePageIndex(pageIndex + 1);

  const lastPage = Math.ceil(totalCount / pageSize);
  const start = (pageIndex - 1) * pageSize + 1;
  const end = Math.min(pageIndex * pageSize, totalCount);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Generate visible page numbers
  const getVisiblePages = () => {
    const delta = 2; // Number of pages to show before and after current page
    const pages: number[] = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || // First page
        i === totalPages || // Last page
        (i >= pageIndex - delta && i <= pageIndex + delta) // Pages around current
      ) {
        pages.push(i);
      }
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-between gap-4">
      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <p className="text-sm text-muted-foreground">Viendo</p>
        <Select
          value={String(pageSize)}
          onValueChange={() => handlePageSize(String(pageSize))}
          items={PAGE_SIZE_OPTIONS.map((size) => ({
            label: String(size),
            value: String(size),
          }))}
        >
          <SelectTrigger
            className="min-w-none w-fit"
            size="sm"
            aria-label="Select result range"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {PAGE_SIZE_OPTIONS.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <p className="text-sm text-muted-foreground">
          de{" "}
          <strong className="font-medium text-foreground">
            {totalCount}
          </strong>{" "}
          resultados
        </p>
      </div>

      <div>
        {/* Pagination */}
        <Pagination>
          <PaginationContent className="w-full justify-between gap-2">
            <PaginationItem>
              <PaginationPrevious
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={pageIndex === 1}
                    onClick={handlePreviousPage}
                  />
                }
              />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                className="sm:*:[svg]:hidden"
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!hasNextPage || pageIndex === totalPages}
                    onClick={handleNextPage}
                  />
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
