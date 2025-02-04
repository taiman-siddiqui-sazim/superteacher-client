import React from "react";

import { cn } from "@/lib/utils";
import MultiSelect from "@/shared/components/MultiSelect";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
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
import { ESubjects, EDaysOfTheWeek } from "@/shared/typedefs/enums";

import { useClassroomForm } from "./Classroom.hooks";
import { IClassroomModalProps } from "./Classroom.interfaces";

const daysOfWeekOptions = Object.values(EDaysOfTheWeek).map((day) => ({
  value: day,
  label: day,
}));

const subjectsOptions = Object.values(ESubjects).map((subject) => ({
  value: subject,
  label: subject,
}));

const ClassroomModal: React.FC<IClassroomModalProps> = ({ isOpen, onClose }) => {
  const { form, onSubmit } = useClassroomForm(onClose);
  const {
    handleSubmit,
    control,
    clearErrors,
    reset,
    formState: { errors },
  } = form;

  const handleCancel = () => {
    clearErrors();
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-white max-w-xs md:max-w-md px-0">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-green-500 mb-0">
            CREATE A CLASSROOM
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="w-4/5 mx-auto">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-green-500">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title"
                        {...field}
                        className="mt-1 block w-full text-black placeholder:text-gray-400"
                        autoComplete="off"
                        onChange={(event) => {
                          field.onChange(event);
                          clearErrors("title");
                        }}
                      />
                    </FormControl>
                    <FormMessage
                      className={cn("text-red-500 mt-1 h-6", !errors["title"] ? "opacity-0" : "")}
                    >
                      {errors["title"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="days_of_week"
                render={({ field }) => (
                  <FormItem className="w-[80%] md:w-[100%]">
                    <FormLabel className="text-green-500">Days of the Week</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={daysOfWeekOptions}
                        value={daysOfWeekOptions.filter((option) =>
                          ((field.value as EDaysOfTheWeek[]) || []).includes(option.value),
                        )}
                        onChange={(selectedOptions) => {
                          field.onChange(selectedOptions.map((option) => option.value));
                          clearErrors("days_of_week");
                        }}
                        placeholder="Pick your preferred days"
                      />
                    </FormControl>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-7 md:h-5",
                        !errors["days_of_week"] ? "opacity-0" : "",
                      )}
                    >
                      {errors["days_of_week"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-green-500">Subject</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        clearErrors("subject");
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
                          <SelectValue placeholder="Select your subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white text-black">
                        {subjectsOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-gray focus:text-black hover:bg-gray-200"
                          >
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-7 md:h-6",
                        !errors["subject"] ? "opacity-0" : "",
                      )}
                    >
                      {errors["subject"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="class_time"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-green-500">Class Time</FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="text"
                        placeholder="hh:mm AM/PM"
                        {...field}
                        className="mt-1 block w-full text-black placeholder:text-gray-400"
                        autoComplete="off"
                        onChange={(event) => {
                          field.onChange(event);
                          clearErrors("class_time");
                        }}
                        onFocus={(event) => (event.target.type = "time")}
                        onBlur={(event) => (event.target.type = "time")}
                      />
                    </FormControl>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-6",
                        !errors["class_time"] ? "opacity-0" : "",
                      )}
                    >
                      {errors["class_time"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-between w-4/5 mx-auto mt-4">
              <Button
                type="button"
                onClick={handleCancel}
                className="bg-purple-600 text-white hover:bg-purple-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-500"
                disabled={false}
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ClassroomModal;
