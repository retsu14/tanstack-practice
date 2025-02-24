"use client";

import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
  PaginationState,
  getPaginationRowModel,
} from "@tanstack/react-table";
import DATA from "@/lib/userData";
import columns from "@/lib/table";

type User = {
  firstName: string;
  lastName: string;
  age: number;
  status: string;
};

const Table = () => {
  const [user, setUser] = useState<User[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  useEffect(() => {
    setUser(DATA);
  }, []);

  const table = useReactTable({
    data: user,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: "onChange",
  });

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="border p-2 mb-4"
        />
      </div>

      <div style={{ width: table.getTotalSize() }}>
        {table.getHeaderGroups().map((header) => (
          <div key={header.id} className="flex w-full">
            {header.headers.map((head) => (
              <div
                key={head.id}
                className="border-black border-[1px] p-2 relative overflow-hidden overflow-ellipsis"
                style={{ width: head.getSize() }}
              >
                {head.column.columnDef.header}
                {head.column.getCanSort() && (
                  <div
                    onClick={head.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    sort
                  </div>
                )}
                <div
                  onMouseDown={head.getResizeHandler()}
                  onTouchStart={head.getResizeHandler()}
                  className={`absolute top-0 right-0 bg-blue-500 z-10 h-full w-[5px] opacity-0 hover:opacity-100 ${
                    head.column.getIsResizing()
                      ? "bg-green-500 opacity-100"
                      : ""
                  }`}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className="flex min-w-full">
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              className="border-black border-[1px] p-2 overflow-hidden overflow-ellipsis"
              style={{ width: cell.column.getSize() }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border px-4 py-2"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border px-4 py-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
