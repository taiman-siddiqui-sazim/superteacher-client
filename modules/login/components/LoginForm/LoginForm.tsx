import React, { useEffect, useRef } from "react";

import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import { Input, Button } from "@/shared/components/shadui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui";

import { useLoginForm } from "./LoginForm.hooks";

const LoginForm = ({ clearErrors = false }: { clearErrors?: boolean }) => {
  const { form, onSubmit } = useLoginForm();
  const { watch, clearErrors: clearFormErrors } = form;

  const email = watch("email");
  const password = watch("password");
  const prevPasswordRef = useRef(password);

  useEffect(() => {
    if (clearErrors) {
      clearFormErrors();
    }
  }, [clearErrors, clearFormErrors]);

  useEffect(() => {
    if (email) {
      clearFormErrors("email");
    }
  }, [email, clearFormErrors]);

  useEffect(() => {
    if (prevPasswordRef.current === "" && password !== "") {
      clearFormErrors("password");
    }
    prevPasswordRef.current = password;
  }, [password, prevPasswordRef, clearFormErrors]);

  return (
    <div className="w-full mx-auto p-2">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-10" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-green-500">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...field}
                    className="input-styles"
                    autoComplete="off"
                  />
                </FormControl>
                <FormMessage className="error-message-styles" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-green-500">Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="Password" {...field} className="input-styles" />
                </FormControl>
                <FormMessage className="error-message-styles" />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-1/3 bg-green-700 text-white hover:bg-green-600 mt-4">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
