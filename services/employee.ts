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

export const getEmployees = async () => {
  const { data } = await axios("http://localhost:3000/api/employees");
  return data;
};
