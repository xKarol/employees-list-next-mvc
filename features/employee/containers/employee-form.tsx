import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import type { EmployeeType } from "../../../@types";
import Input from "../../../components/input";
import LoadingButton from "../../../components/loading-button";
import { createEmployee } from "../../../services";
import { EmployeeForm } from "../components";
import { employeeSchema } from "../schemas";

const EmployeeFormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeType>({
    resolver: yupResolver(employeeSchema),
  });
  const { mutate, isLoading, isError, error } = useMutation(createEmployee);

  const onSubmit: SubmitHandler<EmployeeType> = (data) => {
    try {
      mutate(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <EmployeeForm onSubmit={handleSubmit(onSubmit)} error={isError ? (error as Error).message : ""}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        <Input label="First name" error={errors?.firstName?.message} {...register("firstName")} />
        <Input label="Last name" error={errors?.lastName?.message} {...register("lastName")} />
        <Input label="Email" error={errors?.email?.message} {...register("email")} />
        <Input label="Phone Number" error={errors?.phone?.message} {...register("phone")} />
        <Input label="Pesel Number" error={errors?.pesel?.message} {...register("pesel")} />
        <Input label="ZIP Code" error={errors?.zipCode?.message} {...register("zipCode")} />
        <Input label="City" error={errors?.city?.message} {...register("city")} />
      </div>

      <LoadingButton
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        isLoading={isLoading}>
        Submit
      </LoadingButton>
    </EmployeeForm>
  );
};

export default EmployeeFormContainer;
