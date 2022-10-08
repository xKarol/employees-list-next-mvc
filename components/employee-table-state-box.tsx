import React, { forwardRef } from "react";
import { BeatLoader } from "react-spinners";

type Props = {
  loading: boolean;
  error: string;
};

const EmployeeTableStateBox = forwardRef<HTMLDivElement, Props>(({ loading, error }, ref) => {
  const isError = error?.length;

  return loading || isError ? (
    <div ref={ref} className="flex flex-col py-10 items-center">
      <BeatLoader loading={loading} />
      {isError ? <span className="text-sm text-red-500">{error}</span> : null}
    </div>
  ) : null;
});
EmployeeTableStateBox.displayName = "EmployeeTableStateBox";

export default EmployeeTableStateBox;
