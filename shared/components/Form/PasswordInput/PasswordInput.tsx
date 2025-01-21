import { forwardRef, useState, useEffect, ReactNode } from "react";

import { EyeIcon, EyeOffIcon, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../../shadui/button";
import { Input } from "../../shadui/input";
import { ICustomInputProps } from "../CustomInput/CustomInput.types";

interface IPasswordInputProps extends ICustomInputProps {
  showValidation?: boolean;
  onValidationChange?: (validationItems: ReactNode) => void;
}

const PasswordInput = forwardRef<HTMLInputElement, IPasswordInputProps>(
  ({ className, isError, showValidation, onValidationChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const setValidations = useState({
      hasValidLength: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasNumber: false,
      hasSpecialChar: false,
    })[1];

    const disabled = props.value === "" || props.value === undefined || props.disabled;

    useEffect(() => {
      if (props.value) {
        const password = props.value as string;
        const newValidations = {
          hasValidLength: password.length >= 8 && password.length <= 128,
          hasUpperCase: /[A-Z]/.test(password),
          hasLowerCase: /[a-z]/.test(password),
          hasNumber: /[0-9]/.test(password),
          hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setValidations(newValidations);

        if (onValidationChange) {
          const validationItems = (
            <div className="space-y-1">
              <ValidationItem
                isValid={newValidations.hasValidLength}
                text="Between 8 and 128 characters"
              />
              <ValidationItem
                isValid={newValidations.hasUpperCase && newValidations.hasLowerCase}
                text="At least 1 uppercase & 1 lowercase character"
              />
              <ValidationItem isValid={newValidations.hasNumber} text="At least 1 number" />
              <ValidationItem
                isValid={newValidations.hasSpecialChar}
                text="At least 1 special character"
              />
            </div>
          );
          onValidationChange(validationItems);
        }
      }
    }, [props.value, onValidationChange]);

    const ValidationItem = ({ isValid, text }: { isValid: boolean; text: string }) => (
      <div className="flex items-center space-x-2">
        {isValid ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <X className="h-4 w-4 text-red-500" />
        )}
        <span className={cn("text-sm", isValid ? "text-green-500" : "text-red-500")}>{text}</span>
      </div>
    );

    return (
      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            className={cn(
              isError ? "border-destructive" : "",
              "hide-password-toggle pr-10 bg-white placeholder-gray-500 invalid:border-destructive",
              className,
            )}
            ref={ref}
            {...props}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent hover:text-gray-500 disabled:bg-transparent text-muted"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={disabled}
          >
            {showPassword && !disabled ? (
              <EyeIcon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
            )}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </Button>
        </div>

        <style>{`
          .hide-password-toggle::-ms-reveal,
          .hide-password-toggle::-ms-clear {
            visibility: hidden;
            pointer-events: none;
            display: none;
          }
        `}</style>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
