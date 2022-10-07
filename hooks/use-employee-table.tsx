import { useMemo } from "react";
import { useTable } from "react-table";

import { EmployeeType } from "../@types";

const useEmployeeTable = (data: EmployeeType[] | undefined) => {
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

  const tableData = useTable({
    columns: columns as any, //TODO fix ts error
    data: data || [],
  });
  return tableData;
};

export default useEmployeeTable;
