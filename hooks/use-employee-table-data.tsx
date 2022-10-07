import { useInfiniteQuery } from "react-query";

import { EmployeeType } from "../@types";
import { getEmployees } from "../services";

const useEmployeeTableData = () => {
  const response = useInfiniteQuery<{
    data: EmployeeType;
    nextPage: number;
  }>("get-employees", ({ pageParam: page }) => getEmployees({ page }), {
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });
  return response;
};

export default useEmployeeTableData;
