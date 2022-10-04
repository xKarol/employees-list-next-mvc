import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  console.log("Seeding...");
  prisma.user.create({ data: { email: "test@gmail.com" } });
};

seed();
