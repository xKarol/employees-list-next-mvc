import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method, query } = req;
    const id = query.employeeId as string;
    if (method === "POST") {
      const { body } = req;
      const employees = await prisma.employee.create({
        data: body,
      });
      return res.status(200).json(employees);
    }
    if (method === "GET") {
      if (!id) throw new Error("No employee id provided.");
      const employees = await prisma.employee.findUnique({
        where: {
          id: id,
        },
      });
      return res.status(200).json(employees);
    }
    if (method === "DELETE") {
      if (!id) throw new Error("No employee id provided.");
      const employees = await prisma.employee.delete({
        where: {
          id: id,
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
