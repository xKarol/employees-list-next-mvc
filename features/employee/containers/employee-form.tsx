import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ClipLoader } from "react-spinners";

import type { EmployeeType } from "../../../@types";
import { createEmployee } from "../../../services";
import { employeeSchema } from "../schemas";

const EmployeeFormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeType>({
    resolver: yupResolver(employeeSchema),
  });
  const { mutate, isLoading, isError } = useMutation(createEmployee);

  console.log("err", errors);

  const onSubmit: SubmitHandler<EmployeeType> = (data) => {
    try {
      mutate(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" {...register("firstName")} placeholder="first name" />
      <input type="text" {...register("lastName")} placeholder="last name" />
      <input type="email" {...register("email")} placeholder="email" />
      <input type="text" {...register("pesel")} placeholder="pesel number" />
      <input type="text" {...register("zipCode")} placeholder="ZIP code" />
      <input type="text" {...register("city")} placeholder="city" />
      <input type="text" {...register("phone")} placeholder="phone number" />
      <button type="submit">Add</button>

      <ClipLoader loading={isLoading} />
      {isError ? <span>Error</span> : null}
    </form>
  );
};

export default EmployeeFormContainer;
