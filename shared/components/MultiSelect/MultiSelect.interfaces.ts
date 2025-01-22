import { MultiValue } from "react-select";

export interface IMultiSelectProps {
  options: Array<{ value: string; label: string }>;
  value: MultiValue<{ value: string; label: string }>;
  onChange: (value: MultiValue<{ value: string; label: string }>) => void;
  placeholder?: string;
}
