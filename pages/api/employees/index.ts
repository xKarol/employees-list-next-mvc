import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") throw new Error();
    const employees = await prisma.employee.findMany();
    return res.status(200).json(employees);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Error" });
  }
}
