"use client";

import { ReactNode } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
  UseFormProps,
} from "react-hook-form";

type FormProviderWrapperProps<T extends FieldValues = FieldValues> = {
  onSubmit: SubmitHandler<T>;
  children: ReactNode;
  defaultValues?: UseFormProps<T>["defaultValues"];
};

function FormProviderWrapper<T extends FieldValues = FieldValues>({
  onSubmit,
  children,
  defaultValues,
}: FormProviderWrapperProps<T>) {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}

export default FormProviderWrapper;
