import { Form } from "react-bootstrap";

type SearchInputProps = {
  id: string;
  label: string;
  options: string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: string;
  placeholder: string;
  isError?: boolean;
  errorMessage?: string;
};

export function SelectInput({
  id,
  label,
  options,
  placeholder,
  isError,
  errorMessage,
  ...fields
}: SearchInputProps): JSX.Element {
  return (
    <Form.Group controlId={id} className="mb-3">
      <Form.Label className="fw-semibold">{label}</Form.Label>
      <Form.Select
        data-bs-theme="dark"
        className="img-arrow border"
        {...fields}
      >
        <option>{placeholder}</option>
        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </Form.Select>
      {isError && (
        <Form.Text className="fw-bold text-danger">{errorMessage}</Form.Text>
      )}
    </Form.Group>
  );
}
