import React, { useState, ReactNode } from "react";

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
  const [passwordValidationItems, setPasswordValidationItems] = useState<ReactNode>(null);
  const passwordValue = watch("password", "");
  const confirmPasswordValue = watch("confirmPassword", "");
  const educationLevelValue = watch("educationLevel") as EEducationLevel;

  const handleReset = () => {
    reset(studentFormInitialValues);
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
                      "text-red-500 mt-1 h-8 md:h-3",
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
                      "text-red-500 mt-1 h-4 md:h-3",
                      !errors.lastName ? "opacity-0" : "",
                    )}
                  >
                    {errors.lastName?.message?.toString() || " "}
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
              name="phoneNumber"
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
                        clearErrors("phoneNumber");
                      }}
                    />
                  </FormControl>
                  <FormMessage
                    className={cn(
                      "text-red-500 mt-1 h-7 md:h-4",
                      !errors.phoneNumber ? "opacity-0" : "",
                    )}
                  >
                    {errors.phoneNumber?.message?.toString() || " "}
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
            name="educationLevel"
            render={({ field }) => (
              <FormItem className="w-[80%] md:w-[100%]">
                <FormLabel className="text-green-500">Education Level</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    clearErrors("educationLevel");
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
                    !errors["educationLevel"] ? "opacity-0" : "",
                  )}
                >
                  {errors["educationLevel"]?.message?.toString() || " "}
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
                  name="degreeType"
                  render={({ field }) => (
                    <FormItem className="w-[80%] md:w-[40%]">
                      <FormLabel className="text-green-500">Degree Type</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          clearErrors("degreeType");
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
                  name="degreeName"
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
                            clearErrors("degreeName");
                          }}
                        />
                      </FormControl>
                      <FormMessage
                        className={cn(
                          "text-red-500 mt-1 h-7 md:h-5",
                          !errors.degreeName ? "opacity-0" : "",
                        )}
                      >
                        {errors.degreeName?.message?.toString() || " "}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={control}
                name="semesterYear"
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
                          clearErrors("semesterYear");
                        }}
                      />
                    </FormControl>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-7 md:h-5",
                        !errors.semesterYear ? "opacity-0" : "",
                      )}
                    >
                      {errors.semesterYear?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </>
          )}
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

export default StudentForm;
