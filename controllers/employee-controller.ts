import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import catchAsyncErrors from "../middlewares/catchAsyncError";

const prisma = new PrismaClient();

export const createEmployee = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { body } = req;
    const employees = await prisma.employee.create({
      data: body,
    });
    return res.status(200).json(employees);
  },
);

export const deleteEmployee = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { query } = req;
    const id = query.employeeId as string;
    if (!id) throw new Error("No employee id provided.");
    const employees = await prisma.employee.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json(employees);
  },
);

export const getEmployee = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  const id = query.employeeId as string;
  if (!id) throw new Error("No employee id provided.");
  const employees = await prisma.employee.findUnique({
    where: {
      id: id,
    },
  });
  return res.status(200).json(employees);
});

export const getEmployees = catchAsyncErrors(async (req: NextApiRequest, res: NextApiResponse) => {
  const employees = await prisma.employee.findMany();
  return res.status(200).json(employees);
});
