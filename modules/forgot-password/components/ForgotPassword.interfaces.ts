export interface IForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}

export interface IOtpModalProps {
  email: string;
  onClose: () => void;
}
export interface IResetPasswordProps {
  email: string;
  otp: string;
  onClose: () => void;
}
