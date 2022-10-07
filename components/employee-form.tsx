import clsx from "clsx";
import React from "react";

type Props = { error?: string } & React.ComponentPropsWithoutRef<"form">;

const EmployeeForm = ({ children, error = "", className, ...rest }: Props) => {
  return (
    <form {...rest} className={clsx("max-w-[500px] w-full m-auto pt-6 relative", className)}>
      {error.length ? <span className="absolute left-0 top-0 text-red-600">{error}</span> : null}
      {children}
    </form>
  );
};

export default EmployeeForm;
