"use client";

import { useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
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

  useEffect(() => {
    setUser(DATA);
  }, []);

  const table = useReactTable({
    data: user,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <div className="w-[400px]">
      {table.getHeaderGroups().map((header) => (
        <div key={header.id} className="flex w-full">
          {header.headers.map((head) => (
            <div key={head.id} className="border-black border-[1px] p-2">
              {head.column.columnDef.header}
            </div>
          ))}
        </div>
      ))}
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className="flex w-full">
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id} className="border-black border-[1px] p-2">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
