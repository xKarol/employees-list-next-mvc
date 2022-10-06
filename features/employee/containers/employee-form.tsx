import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import type { EmployeeType } from "../../../@types";
import Input from "../../../components/input";
import LoadingButton from "../../../components/loading-button";
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
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[500px] w-full m-auto">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Input label="First name" {...register("firstName")} />
          <Input label="Last name" {...register("lastName")} />
          <Input label="Email" {...register("email")} />
          <Input label="Phone Number" {...register("phone")} />
          <Input label="Pesel Number" {...register("pesel")} />
          <Input label="ZIP Code" {...register("zipCode")} />
          <Input label="City" {...register("city")} />
        </div>

        <LoadingButton
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          isLoading={isLoading}>
          Submit
        </LoadingButton>
        {isError ? <span>Error</span> : null}
      </form>
    </>
  );
};

export default EmployeeFormContainer;
