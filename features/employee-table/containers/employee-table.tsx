import { useMemo } from "react";
import { useQuery } from "react-query";
import { BeatLoader } from "react-spinners";
import { useTable } from "react-table";

import type { EmployeeType } from "../../../@types";
import { getEmployees } from "../../../services";

const EmployeeTableContainer = () => {
  const { data, isLoading, isError } = useQuery<EmployeeType[]>("get-employees", getEmployees);
  console.log(data, isLoading, isError);

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
    data: data || [],
  });

  return (
    <>
      <BeatLoader loading={isLoading} />

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={index}>
              {headerGroup.headers.map((column, index) => (
                <th {...column.getHeaderProps()} key={index}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={index}>
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} key={index}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EmployeeTableContainer;
