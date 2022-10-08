import Link from "next/link";
import React from "react";

import { ROUTE_ADD_EMPLOYEE, ROUTE_HOME } from "../constants";

const NavbarContainer = () => {
  return (
    <nav className="px-5 py-2 text-sm mb-5">
      <ul className="flex justify-between">
        <li>
          <Link href={ROUTE_HOME}>
            <a>Employees List</a>
          </Link>
        </li>
        <li>
          <Link href={ROUTE_ADD_EMPLOYEE}>
            <a>Add Employee</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarContainer;
