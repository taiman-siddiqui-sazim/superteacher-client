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
import { TClassroom } from "@/shared/redux/rtk-apis/classrooms/classroom.types";
import { ESubjects, EDaysOfTheWeek } from "@/shared/typedefs/enums";

import { useEditClassroomForm } from "./EditClassroom.hooks";
import { IEditClassroomModalProps } from "./UpdateClassroom.interfaces";

const daysOfWeekOptions = Object.values(EDaysOfTheWeek).map((day) => ({
  value: day,
  label: day,
}));

const subjectsOptions = Object.values(ESubjects).map((subject) => ({
  value: subject,
  label: subject,
}));

const EditClassroomModal: React.FC<IEditClassroomModalProps> = ({ isOpen, onClose, classroom }) => {
  const { form, onSubmit } = useEditClassroomForm(onClose, classroom);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="bg-white max-w-xs md:max-w-md px-0">
        <DialogHeader>
          <DialogTitle className="text-xl text-center text-green-500 mb-0">
            EDIT CLASSROOM
          </DialogTitle>
        </DialogHeader>
        <Form<TClassroom> {...form}>
          <form
            onSubmit={handleSubmit((values) => onSubmit({ ...values, id: classroom.id }))}
            className="space-y-4 w-full"
          >
            <div className="w-4/5 mx-auto">
              <FormField
                name="title"
                control={control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-green-500 text-lg">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter a title"
                        {...field}
                        className="mt-1 block w-full text-black text-lg placeholder:text-gray-400"
                        autoComplete="off"
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
                name="days_of_week"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-[100%] text-lg">
                    <FormLabel className="text-green-500 text-lg">Days of the Week</FormLabel>
                    <FormControl>
                      <MultiSelect
                        options={daysOfWeekOptions}
                        value={daysOfWeekOptions.filter((option) =>
                          (field.value || []).includes(option.value),
                        )}
                        onChange={(selectedOptions) =>
                          field.onChange(selectedOptions.map((option) => option.value))
                        }
                        placeholder="Pick your preferred days"
                      />
                    </FormControl>
                    <FormMessage
                      className={cn(
                        "text-red-500 mt-1 h-7 md:h-6",
                        !errors["days_of_week"] ? "opacity-0" : "",
                      )}
                    >
                      {errors["days_of_week"]?.message?.toString() || " "}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                name="subject"
                control={control}
                render={({ field }) => (
                  <FormItem className="w-full text-lg">
                    <FormLabel className="text-green-500 text-lg">Subject</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
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
                      <SelectContent className="bg-white text-black text-lg">
                        {subjectsOptions.map((option) => (
                          <SelectItem
                            key={option.value}
                            value={option.value}
                            className="focus:bg-gray focus:text-black text-lg hover:bg-gray-200"
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
                name="class_time"
                control={control}
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel className="text-green-500 text-lg">Class Time</FormLabel>
                    <FormControl className="relative">
                      <Input
                        type="text"
                        placeholder="hh:mm AM/PM"
                        {...field}
                        className="mt-1 block w-full text-black text-lg placeholder:text-gray-400"
                        autoComplete="off"
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
            <div className="flex justify-left w-4/5 mx-auto mt-4">
              <Button
                type="submit"
                className="bg-green-600 text-white hover:bg-green-500"
                disabled={false}
              >
                Update
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditClassroomModal;
