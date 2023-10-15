import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { object, string } from "yup";
import { TextInput } from "./formInput/TextInput";

type ColumnFormProps = {
  onSubmit: (values: { name: string }) => void;
  onHide: () => void;
  columns: string[];
};

export function ColumnForm({
  onSubmit,
  onHide,
  columns,
}: ColumnFormProps): JSX.Element {
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: object({
      name: string()
        .min(2, "Must be 2 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("Column name is required")

        // .notOneOf(columns, "This column already exists"), # case-sensitive

        // case-insensitive checking
        .test("not-equal", "This column already exists", function (value) {
          const lowerCaseValue = value.toLowerCase();
          const lowerCaseReference = columns.map((column) =>
            column.toLowerCase()
          );
          return lowerCaseReference.indexOf(lowerCaseValue) === -1;
        }),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onHide();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <TextInput
        id="name"
        label="New column name"
        name="name"
        type="text"
        placeholder="Enter a column name"
        onChange={formik.handleChange}
        value={formik.values.name}
        isError={formik.touched.name && formik.errors.name ? true : false}
        errorMessage={formik.errors.name}
      />
      <div className="d-flex justify-content-center">
        <Button className="text-white" type="submit" variant="secondary">
          Submit
        </Button>
      </div>
    </Form>
  );
}
