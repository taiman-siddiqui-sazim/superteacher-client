import React, { useState, ReactNode } from "react";

import { cn } from "@/lib/utils";
import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import MultiSelect from "@/shared/components/MultiSelect";
import {
  Input,
  Button,
  Select as ShadSelect,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/shared/components/shadui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/shadui/form";
import { EGender, EHighestEducationLevel, ESubjects } from "@/shared/typedefs";

import { teacherFormInitialValues } from "./TeacherForm.constants";
import { useTeacherForm } from "./TeacherForm.hooks";

const highestEducationOptions = Object.values(EHighestEducationLevel).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const subjectsOptions = Object.values(ESubjects).map((subject) => ({
  value: subject,
  label: subject,
}));

const TeacherForm: React.FC = () => {
  const { form, onSubmit } = useTeacherForm();
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    formState: { errors },
  } = form;
  const [passwordValidationItems, setPasswordValidationItems] = useState<ReactNode>(null);
  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");

  const handleReset = () => {
    reset(teacherFormInitialValues);
    setPasswordValidationItems(null);
  };

  const passwordsMatch = passwordValue === confirmPasswordValue || confirmPasswordValue === "";

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 w-full flex flex-col items-center"
        >
          <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
            <FormField
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">First Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your first name"
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("firstName");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-8 md:h-5",
                      !errors.firstName ? "opacity-0" : "",
                    )}
                  >
                    {errors.firstName?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">Last Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your last name"
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("lastName");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-8 md:h-5",
                      !errors.lastName ? "opacity-0" : "",
                    )}
                  >
                    {errors.lastName?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[40%]">
                  <FormLabel className="text-green-500">Gender</FormLabel>
                  <ShadSelect
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("gender");
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "bg-white",
                          field.value ? "text-black" : "text-gray-400",
                          "hover:text-gray-700",
                        )}
                      >
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {Object.values(EGender).map((gender) => (
                        <SelectItem
                          key={gender}
                          value={gender}
                          className="focus:bg-white focus:text-black hover:bg-gray-200"
                        >
                          {gender}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </ShadSelect>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-7 md:h-5",
                      !errors["gender"] ? "opacity-0" : "",
                    )}
                  >
                    {errors["gender"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="uniqueCode"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Enter registration code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter unique code, e.g. ce47Wp"
                    {...field}
                    className="mt-1 block w-full text-black placeholder:text-gray-400"
                    autoComplete="off"
                    onChange={(error) => {
                      field.onChange(error);
                      clearErrors("uniqueCode");
                    }}
                  />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-red-500 mt-1 h-7 md:h-5",
                    !errors.uniqueCode ? "opacity-0" : "",
                  )}
                >
                  {errors.uniqueCode?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
            <FormField
              control={control}
              name="majorSubject"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[60%]">
                  <FormLabel className="text-green-500">Major Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your major subject"
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("majorSubject");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-9 md:h-5",
                      !errors.majorSubject ? "opacity-0" : "",
                    )}
                  >
                    {errors.majorSubject?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="highestEducation"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">Highest Education</FormLabel>
                  <ShadSelect
                    onValueChange={(value) => {
                      field.onChange(value);
                      clearErrors("highestEducation");
                    }}
                    value={field.value || ""}
                  >
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "bg-white",
                          field.value ? "text-black" : "text-gray-400",
                          "hover:text-gray-700",
                        )}
                      >
                        <SelectValue placeholder="Select your highest education" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-black">
                      {highestEducationOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="focus:bg-white focus:text-black hover:bg-gray-200"
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </ShadSelect>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-7 md:h-5",
                      !errors["highestEducation"] ? "opacity-0" : "",
                    )}
                  >
                    {errors["highestEducation"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="subjects"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Subjects to Teach</FormLabel>
                <FormControl>
                  <MultiSelect
                    options={subjectsOptions}
                    value={subjectsOptions.filter((option) =>
                      (field.value || []).includes(option.value),
                    )}
                    onChange={(selectedOptions) => {
                      field.onChange(selectedOptions.map((option) => option.value));
                      clearErrors("subjects");
                    }}
                    placeholder="Select subjects to teach"
                  />
                </FormControl>
                <FormMessage
                  className={cn(
                    "text-red-500 mt-1 h-7 md:h-5",
                    !errors.subjects ? "opacity-0" : "",
                  )}
                >
                  {errors.subjects?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="mt-1 block w-full text-black placeholder:text-gray-400"
                    autoComplete="off"
                    onChange={(error) => {
                      field.onChange(error);
                      clearErrors("email");
                    }}
                  />
                </FormControl>
                <FormMessage
                  className={cn("text-red-500 mt-1 h-7 md:h-5", !errors.email ? "opacity-0" : "")}
                >
                  {errors.email?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justifycenter">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      showValidation
                      onValidationChange={setPasswordValidationItems}
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("password");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-32 md:h-24",
                      !errors.password && (!passwordValidationItems || field.value === "")
                        ? "opacity-0"
                        : "",
                    )}
                  >
                    {errors.password?.message?.toString() ||
                      (field.value !== "" && passwordValidationItems) ||
                      " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirm your password"
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("confirmPassword");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-16 md:h-24",
                      !errors.confirmPassword && (confirmPasswordValue === "" || passwordsMatch)
                        ? "opacity-0"
                        : "",
                    )}
                  >
                    {errors.confirmPassword?.message?.toString() ||
                      (confirmPasswordValue !== "" &&
                        !passwordsMatch &&
                        "Passwords do not match") ||
                      " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center space-x-16 md:space-x-36 mt-8">
            <Button
              type="button"
              onClick={handleReset}
              className="bg-purple-600 text-white hover:bg-purple-400"
            >
              Reset
            </Button>
            <Button type="submit" className="bg-green-600 text-white hover:bg-green-400">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default TeacherForm;
