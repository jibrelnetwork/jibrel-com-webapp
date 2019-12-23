
export interface FormProps {
    backLabel: string;
    backHandler: () => undefined;
    nextLabel: string;
    nextHandler: (fields: []) => undefined;
}
