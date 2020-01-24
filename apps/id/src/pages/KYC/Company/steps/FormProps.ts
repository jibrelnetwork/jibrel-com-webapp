export interface FormProps {
  backHandler: () => undefined;
  nextHandler: (fields: []) => undefined;
  backLabel: string;
  nextLabel: string;
}
