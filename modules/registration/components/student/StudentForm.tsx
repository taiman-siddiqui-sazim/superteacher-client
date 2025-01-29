import React, { useState, useEffect } from "react";

import { cn } from "@/lib/utils";
import { PasswordInput } from "@/shared/components/Form/PasswordInput";
import {
  Input,
  Button,
  Select,
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
import {
  EGender,
  EEducationLevel,
  EMedium,
  ESchoolClass,
  ECollegeClass,
  EDegreeType,
} from "@/shared/typedefs";

import { studentFormInitialValues } from "./StudentForm.constants";
import { useStudentForm } from "./StudentForm.hooks";

const educationLevelOptions = Object.values(EEducationLevel).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const mediumOptions = Object.values(EMedium).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const schoolClassOptions = Object.values(ESchoolClass).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const collegeClassOptions = Object.values(ECollegeClass).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const degreeTypeOptions = Object.values(EDegreeType).map((value) => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
}));

const StudentForm: React.FC = () => {
  const { form, onSubmit } = useStudentForm();
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    watch,
    formState: { errors, isSubmitted },
  } = form;

  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirm_password", "");
  const educationLevelValue = watch("education_level") as EEducationLevel;
  const [resetPassword, setResetPassword] = useState(false);

  const handleReset = () => {
    reset(studentFormInitialValues);
    setResetPassword(true);
  };

  useEffect(() => {
    if (resetPassword) {
      reset({ password: "" });
      setResetPassword(false);
    }
  }, [resetPassword, reset]);

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
              name="first_name"
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
                        clearErrors("first_name");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-8 md:h-3",
                      !errors.first_name ? "opacity-0" : "",
                    )}
                  >
                    {errors.first_name?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="last_name"
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
                        clearErrors("last_name");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-4 md:h-3",
                      !errors.last_name ? "opacity-0" : "",
                    )}
                  >
                    {errors.last_name?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[40%]">
                  <FormLabel className="text-green-500">Gender</FormLabel>
                  <Select
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
                  </Select>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-8 md:h-4",
                      !errors["gender"] ? "opacity-0" : "",
                    )}
                  >
                    {errors["gender"]?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[60%]">
                  <FormLabel className="text-green-500">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your phone number"
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("phone");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn("text-red-500 mt-1 h-7 md:h-4", !errors.phone ? "opacity-0" : "")}
                  >
                    {errors.phone?.message?.toString() || " "}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="address"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your address"
                    {...field}
                    className="mt-1 block w-full text-black placeholder:text-gray-400"
                    autoComplete="off"
                    onChange={(error) => {
                      field.onChange(error);
                      clearErrors("address");
                    }}
                  />
                </FormControl>
                <FormMessage
                  className={cn("text-red-500 mt-1 h-7 md:h-4", !errors.address ? "opacity-0" : "")}
                >
                  {errors.address?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="education_level"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Education Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("education_level");
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
                      <SelectValue placeholder="Select your education level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white text-black">
                    {educationLevelOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="focus:bg-white focus:text-black hover:bg-gray-200"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage
                  className={cn(
                    "text-red-500 mt-1 h-6 md:h-4",
                    !errors["education_level"] ? "opacity-0" : "",
                  )}
                >
                  {errors["education_level"]?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          {(educationLevelValue === EEducationLevel.School ||
            educationLevelValue === EEducationLevel.College) && (
            <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
              <FormField
                control={control}
                name="medium"
                render={({ field }) => (
                  <FormItem className="w-[80%] md:w-[50%]">
                    <FormLabel className="text-green-500">Medium</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("medium");
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
                          <SelectValue placeholder="Select your medium" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {mediumOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-white focus:text-black hover:bg-gray-200"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-8 md:h-4",
                        isSubmitted && !field.value ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {isSubmitted && !field.value ? "Medium is required" : " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="class"
                render={({ field }) => (
                  <FormItem className="w-[80%] md:w-[50%]">
                    <FormLabel className="text-green-500">Class</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("class");
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
                          <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {(educationLevelValue === EEducationLevel.School
                          ? schoolClassOptions
                          : collegeClassOptions
                        ).map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-white focus:text-black hover:bg-gray-200"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-6 md:h-4",
                        isSubmitted && !field.value ? "opacity-100" : "opacity-0",
                      )}
                    >
                      {isSubmitted && !field.value ? "Class is required" : " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
          )}
          {educationLevelValue === EEducationLevel.University && (
            <>
              <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
                <FormField
                  control={control}
                  name="degree_type"
                  render={({ field }) => (
                    <FormItem className="w-[80%] md:w-[40%]">
                      <FormLabel className="text-green-500">Degree Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          clearErrors("degree_type");
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
                            <SelectValue placeholder="Select your degree type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white text-black">
                          {degreeTypeOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="focus:bg-white focus:text-black hover:bg-gray-200"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage
                        className={cn(
                          "text-red-500 mt-1 h-8 md:h-5",
                          isSubmitted && !field.value ? "opacity-100" : "opacity-0",
                        )}
                      >
                        {isSubmitted && !field.value ? "Degree type is required" : " "}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="degree_name"
                  render={({ field }) => (
                    <FormItem className="w-[80%] md:w-[60%]">
                      <FormLabel className="text-green-500">Degree Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your degree name"
                          {...field}
                          className="mt-1 block w-full text-black placeholder:text-gray-400"
                          autoComplete="off"
                          onChange={(error) => {
                            field.onChange(error);
                            clearErrors("degree_name");
                          }}
                        />
                      </FormControl>
                      <FormMessage
                        className={cn(
                          "text-red-500 mt-1 h-7 md:h-5",
                          !errors.degree_name ? "opacity-0" : "",
                        )}
                      >
                        {errors.degree_name?.message?.toString() || " "}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="semester_year"
                render={({ field }) => (
                  <FormItem className="w-[80%] md:w-[100%]">
                    <FormLabel className="text-green-500">Semester/Year</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your semester/year"
                        {...field}
                        className="mt-1 block w-full text-black placeholder:text-gray-400"
                        autoComplete="off"
                        onChange={(error) => {
                          field.onChange(error);
                          clearErrors("semester_year");
                        }}
                      />
                    </FormControl>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-7 md:h-5",
                        !errors.semester_year ? "opacity-0" : "",
                      )}
                    >
                      {errors.semester_year?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </>
          )}
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
                  className={cn("text-red-500 mt-1 h-7 md:h-4", !errors.email ? "opacity-0" : "")}
                >
                  {errors.email?.message?.toString() || " "}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="w-full flex flex-col md:flex-row md:space-x-4 items-center justify-center">
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-[80%] md:w-[50%]">
                  <FormLabel className="text-green-500">Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Enter your password"
                      validate
                      showValidation
                      {...field}
                      className="mt-1 block w-full text-black placeholder:text-gray-400"
                      autoComplete="off"
                      onChange={(error) => {
                        field.onChange(error);
                        clearErrors("password");
                      }}
                    />
                  </FormControl>
                  <FormMessage className={cn("text-red-500 mt-1 h-6 md:h-4", "opacity-0")}>
                    {" "}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="confirm_password"
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
                        clearErrors("confirm_password");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-12 md:h-28",
                      !errors.confirm_password && (confirmPasswordValue === "" || passwordsMatch)
                        ? "opacity-0"
                        : "",
                    )}
                  >
                    {errors.confirm_password?.message?.toString() ||
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

export default StudentForm;
