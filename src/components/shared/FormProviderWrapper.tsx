"use client";

import React from "react";
import {
  FormProvider,
  useForm,
  UseFormProps,
  FieldValues,
  SubmitHandler,
} from "react-hook-form";

type FormWrapperProps<T extends FieldValues> = {
  onSubmit: SubmitHandler<T>;
  defaultValues?: UseFormProps<T>["defaultValues"];
  children:
    | React.ReactNode
    | ((reset: ReturnType<typeof useForm<T>>["reset"]) => React.ReactNode);
};

export function FormProviderWrapper<T extends FieldValues>({
  onSubmit,
  defaultValues,
  children,
}: FormWrapperProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {typeof children === "function" ? children(methods.reset) : children}
      </form>
    </FormProvider>
  );
}
