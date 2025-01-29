import { ReactNode } from "react";

import { ICustomInputProps } from "../CustomInput/CustomInput.types";

export interface IPasswordInputProps extends ICustomInputProps {
  showValidation?: boolean;
  validate?: boolean;
  onValidationChange?: (validationItems: ReactNode) => void;
}
