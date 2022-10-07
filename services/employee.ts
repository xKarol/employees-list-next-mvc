import axios from "axios";

import type { EmployeeType } from "../@types";

export const createEmployee = async (data: EmployeeType) => {
  return await axios("http://localhost:3000/api/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  });
};

export const getEmployees = async ({ page = 0, limit = 25 }: { page?: number; limit?: number }) => {
  console.log({ page });
  const { data } = await axios(`http://localhost:3000/api/employees?page=${page}&limit=${limit}`);
  return data;
};
