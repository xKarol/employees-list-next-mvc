import React, { forwardRef } from "react";

type Props = { label: string; error?: string } & React.ComponentPropsWithoutRef<"input">;

const Input = forwardRef<HTMLDivElement, Props>(({ label, type = "text", error, ...rest }, ref) => {
  const isError = error?.length;
  return (
    <div ref={ref}>
      <label
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ${
          isError ? "text-red-500" : ""
        } `}>
        {label}
        {isError ? <span className="ml-2">- {error}</span> : null}
      </label>
      <input
        {...rest}
        type={type}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
});
Input.displayName = "Input";

export default Input;
