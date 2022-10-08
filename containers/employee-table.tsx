import clsx from "clsx";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { EmployeeTableStateBox } from "../components";
import { useEmployeeTable, useEmployeeTableData } from "../hooks";

const EmployeeTableContainer = () => {
  const { data, isLoading, isFetchingNextPage, isError, error, fetchNextPage, hasNextPage } =
    useEmployeeTableData();
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useEmployeeTable(
    data?.pages.map(({ data }) => data).flat(1),
  );
  const { ref, inView } = useInView({ threshold: 0 });
  const showLoader = (hasNextPage || isLoading || isFetchingNextPage) && !isError;

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <div className="relative">
      <div className={clsx(isLoading && "opacity-25")}>
        <table
          {...getTableProps()}
          className="border-collapse table-fixed w-full text-sm overflow-auto min-w-[800px]">
          <thead>
            {headerGroups.map((headerGroup, index) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps()}
                    key={index}
                    className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-blue-400 text-left">
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white dark:bg-slate-800">
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell, index) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        key={index}
                        className="border-b border-slate-100 p-4 pl-8 text-slate-500 ">
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <EmployeeTableStateBox ref={ref} error={(error as Error)?.message} loading={showLoader} />
    </div>
  );
};

export default EmployeeTableContainer;
