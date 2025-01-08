export interface IForgotPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
}
