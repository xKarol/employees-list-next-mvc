import clsx from "clsx";
import { useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { BeatLoader } from "react-spinners";
import { useTable } from "react-table";

import { useEmployeeTableData } from "../hooks";

const EmployeeTableContainer = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useEmployeeTableData();
  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  console.log(isError);

  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "firstName" },
      { Header: "Last Name", accessor: "lastName" },
      { Header: "Email", accessor: "email" },
      { Header: "Pesel", accessor: "pesel" },
      { Header: "Zip Code", accessor: "zipCode" },
      { Header: "City", accessor: "city" },
      { Header: "Phone Number", accessor: "phone" },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: columns as any, //TODO fix ts error
    data: data?.pages.map(({ data }) => data).flat(1) || [],
  });

  return (
    <div className="relative">
      <BeatLoader loading={isLoading} className="absolute top-20 left-1/2 -translate-x-1/2" />
      <div className={clsx(isLoading && "opacity-25")}>
        <table {...getTableProps()} className="border-collapse table-fixed w-full text-sm">
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
        <div ref={ref}>{hasNextPage ? "Load more..." : null}</div>
      </div>
    </div>
  );
};

export default EmployeeTableContainer;
