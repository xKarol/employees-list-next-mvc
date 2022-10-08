import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import type { EmployeeType } from "../@types";
import { EmployeeForm, Input, LoadingButton } from "../components";
import { employeeSchema } from "../schemas";
import { createEmployee } from "../services";

const EmployeeFormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeType>({
    resolver: yupResolver(employeeSchema),
  });
  const { mutate, isLoading, isError, error, isSuccess } = useMutation(createEmployee, {
    onSuccess: () => reset(),
  });
  const onSubmit: SubmitHandler<EmployeeType> = (data) => mutate(data);

  return (
    <EmployeeForm onSubmit={handleSubmit(onSubmit)} error={isError ? (error as Error).message : ""}>
      {isSuccess ? <span className="text-green-500 text-sm">Success!</span> : null}

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
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        isLoading={isLoading}>
        Submit
      </LoadingButton>
    </EmployeeForm>
  );
};

export default EmployeeFormContainer;
