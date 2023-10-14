import Form from "react-bootstrap/Form";

type TextInputProps = {
  id: string;
  label: string;
  name?: string;
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value: string;
  isError?: boolean;
  errorMessage?: string;
  min?: string;
};

export function TextInput({
  id,
  label,
  isError,
  errorMessage,
  ...fields
}: TextInputProps): JSX.Element {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <Form.Control {...fields} />
      {isError && (
        <Form.Text className="fw-bold text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
}
