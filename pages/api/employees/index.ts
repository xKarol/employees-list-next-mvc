import nc from "next-connect";

import { createEmployee, getEmployees } from "../../../controllers/employee-controller";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

handler.get(getEmployees);
handler.post(createEmployee);

export default handler;
