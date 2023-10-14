import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import { date, object, string } from "yup";
import { TextInput } from "./form/TextInput";
import { SelectInput } from "./form/SelectInput";
import { Button, Modal } from "react-bootstrap";

type TaskFormProps = {
  onSubmit: (values: {
    title: string;
    category: string;
    dueDate: string;
    column: string;
  }) => void;
  show: boolean;
  handleClose: () => void;
};

export function TaskForm({
  onSubmit,
  show,
  handleClose,
}: TaskFormProps): JSX.Element {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      dueDate: new Date().toISOString().slice(0, 10),
      column: "",
    },
    validationSchema: object({
      title: string()
        .max(30, "Must be 30 characters or less")
        .required("Title is required"),
      category: string()
        .max(20, "Must be 20 characters or less")
        .required("Category is required"),
      dueDate: date().required(
        "The format should be yyyy-MM-dd and due date is required"
      ),
      column: string().required("Status is required"),
    }),
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <Modal
      className="input-form"
      show={show}
      onHide={handleClose}
      centered
      size="sm"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <TextInput
            id="title"
            label="Title"
            name="title"
            type="text"
            placeholder="Enter a title"
            onChange={formik.handleChange}
            value={formik.values.title}
            isError={formik.touched.title && formik.errors.title ? true : false}
            errorMessage={formik.errors.title}
          />
          <SelectInput
            id="category"
            label="Category"
            options={["Work", "Personal", "School"]}
            onChange={formik.handleChange}
            value={formik.values.category}
            placeholder="Enter a category"
            isError={
              formik.touched.category && formik.errors.category ? true : false
            }
            errorMessage={formik.errors.category}
          />
          <TextInput
            id="dueDate"
            label="Due Date"
            name="dueDate"
            type="date"
            placeholder="Enter a due date"
            onChange={formik.handleChange}
            value={formik.values.dueDate}
            isError={
              formik.touched.dueDate && formik.errors.dueDate ? true : false
            }
            errorMessage={formik.errors.dueDate as string}
            min={new Date().toISOString().split("T")[0]}
          />
          <SelectInput
            id="column"
            label="Status"
            options={["To-Do", "In Progress", "Done"]}
            onChange={formik.handleChange}
            value={formik.values.column}
            placeholder="Enter a status"
            isError={
              formik.touched.column && formik.errors.column ? true : false
            }
            errorMessage={formik.errors.column}
          />
          <div className="d-flex justify-content-center">
            <Button className="text-white" type="submit" variant="secondary">
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
