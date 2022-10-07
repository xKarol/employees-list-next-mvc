import Link from "next/link";
import React from "react";

const NavbarContainer = () => {
  return (
    <nav className="px-5 py-2 text-sm mb-5">
      <ul className="flex justify-between">
        <li>
          <Link href="/">
            <a>Employees List</a>
          </Link>
        </li>
        <li>
          <Link href="/add">
            <a>Add Employee</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarContainer;
