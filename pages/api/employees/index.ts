import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req;
    if (method === "GET") {
      const employees = await prisma.employee.findMany();
      return res.status(200).json(employees);
    }
    if (method === "POST") {
      const { body } = req;
      const employees = await prisma.employee.create({
        data: body,
      });
      return res.status(200).json(employees);
    }
    throw new Error();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error" });
  }
}
