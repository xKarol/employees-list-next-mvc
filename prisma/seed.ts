import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const seed = async () => {
  console.log("Seeding...");
  prisma.employee.create({
    data: {
      firstName: "firstName",
      lastName: "lastName",
      email: "email",
      pesel: "pesel",
      zipCode: "zipcode",
      city: "city",
      phone: "phone",
    },
  });
};

seed();
