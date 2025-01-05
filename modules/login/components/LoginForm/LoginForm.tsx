import React, { useEffect } from "react";
import { Input, Button } from "@/shared/components/shadui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui";
import { inputStyles, formMessageStyles } from "./LoginForm.styles";
import { useLoginForm } from "./LoginForm.hooks";
import { PasswordInput } from "@/shared/components/Form/PasswordInput";

const LoginForm = ({ clearErrors }: { clearErrors: boolean }) => {
  const { form, onSubmit } = useLoginForm();
  const { watch, clearErrors: clearFormErrors } = form;

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    if (clearErrors || email || password) {
      clearFormErrors();
    }
  }, [clearErrors, email, password]);

  return (
    <div className="w-full mx-auto p-2">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel className="text-green-500">Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" type="email" {...field} className={inputStyles} />
                </FormControl>
                <FormMessage className={formMessageStyles} />
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
                  <PasswordInput placeholder="Password" {...field} className={inputStyles} />
                </FormControl>
                <FormMessage className={formMessageStyles} />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button type="submit" className="w-1/3 bg-green-700 text-white hover:bg-green-600 mt-1">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
