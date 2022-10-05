import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    if (method === "POST") {
      const { body } = req;
      const employees = await prisma.employee.create({
        data: body,
      });
      return res.status(200).json(employees);
    }
    if (method === "GET") {
      const { query } = req;
      if (!query.employeeId) throw new Error("No employee id provided.");
      const employees = await prisma.employee.findUnique({
        where: {
          id: query.employeeId as string,
        },
      });
      return res.status(200).json(employees);
    }
    if (method === "DELETE") {
      const { query } = req;
      if (!query.employeeId) throw new Error("No employee id provided.");
      const employees = await prisma.employee.delete({
        where: {
          id: query.employeeId as string,
        },
      });
      return res.status(200).json(employees);
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error" });
  }
}
