import nc from "next-connect";

import { deleteEmployee, getEmployee } from "../../../controllers/employee-controller";
import onError from "../../../middlewares/errors";

const handler = nc({ onError });

handler.delete(deleteEmployee);
handler.get(getEmployee);

export default handler;
