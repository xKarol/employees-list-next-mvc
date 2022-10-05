import { faker } from "@faker-js/faker";
import { Employee, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const EMPLOYEES_CREATE_AMOUNT = 100;

const seed = async () => {
  try {
    console.log("\x1b[32m", "Seeding...", "\x1b[0m");
    await prisma.employee.deleteMany({});
    const employeesArray: Employee[] = new Array(EMPLOYEES_CREATE_AMOUNT).fill({});

    const employeesList = employeesArray.map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      pesel: faker.datatype.number({ min: 10000000000, max: 90000000000 }),
      zipCode: faker.address.zipCode(),
      city: faker.address.cityName(),
      phone: faker.phone.number(),
    }));

    await prisma.employee.createMany({
      data: employeesList,
    });
  } catch (error) {
    console.log("\x1b[31m", error, "\x1b[0m");
  }
};

seed();
