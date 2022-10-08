import axios from "axios";

import type { EmployeeType } from "../@types";

const BACKEND_URL = process.env.BACKEND_URL;

export const createEmployee = async (data: EmployeeType) => {
  return await axios(`${BACKEND_URL}/api/employees`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  });
};

export const getEmployees = async ({ page = 0, limit = 25 }: { page?: number; limit?: number }) => {
  console.log({ page });
  const { data } = await axios(`${BACKEND_URL}/api/employees?page=${page}&limit=${limit}`);
  return data;
};
