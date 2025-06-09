import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface PaginationNumber {
  pageIndex: number;
  perPageIndex: number;
  totalCount: number;
  perPage: number;
  totalPages: number;
  hasPerPage: boolean;
  onPageChange: (pageIndex: number) => Promise<void> | void;
  onPerPageChange: (perPageIndex: number) => Promise<void> | void;
}

export function Pagination({
  pageIndex,
  perPageIndex,
  totalCount,
  onPageChange,
  onPerPageChange,
  totalPages,
  hasPerPage,
}: PaginationNumber) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">
        Total de {totalCount} item(s)
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Página {pageIndex} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onPageChange(0)}
            variant="outline"
            className="h-8 w-8 "
            disabled={pageIndex === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">Primeira página</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex - 2)}
            variant="outline"
            className="h-8 w-8"
            disabled={pageIndex === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => onPageChange(pageIndex)}
            variant="outline"
            className="h-8 w-8"
            disabled={pageIndex === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Próxima página</span>
          </Button>
          <Button
            onClick={() => onPageChange(totalPages - 1)}
            variant="outline"
            className="h-8 w-8"
            disabled={pageIndex === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Última página</span>
          </Button>
          {hasPerPage && (
            <Select
              onValueChange={(value) => onPerPageChange(Number(value))}
              defaultValue={perPageIndex.toString()}
            >
              <SelectTrigger>
                <SelectValue
                  placeholder={perPageIndex}
                  className="flex h-8 w-8"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>
    </div>
  );
}
