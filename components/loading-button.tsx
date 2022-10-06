import React from "react";
import { ClipLoader } from "react-spinners";

type Props = { isLoading?: boolean } & React.ComponentPropsWithoutRef<"button">;

const LoadingButton = ({ isLoading = false, className, children, ...rest }: Props) => {
  return (
    <button className={`relative ${className ?? ""}`} type="button" {...rest}>
      <div className="absolute translate-x-1/2 ">
        <ClipLoader loading={isLoading} size={20} color="#fff" />
      </div>
      <span className={`${isLoading ? "invisible" : ""}`}>{children}</span>
    </button>
  );
};

export default LoadingButton;
