import { useFormik } from "formik";
import Form from "react-bootstrap/Form";
import { date, object, string } from "yup";
import { TextInput } from "./formInput/TextInput";
import { SelectInput } from "./formInput/SelectInput";
import { Button, Modal } from "react-bootstrap";
import categories from "../constants/categories";
import { useState } from "react";
import { ColumnForm } from "./ColumnForm";

type TaskFormProps = {
  onSubmit: (values: {
    title: string;
    category: string;
    dueDate: string;
    column: string;
  }) => void;
  onColumnFormSubmit: (values: { name: string }) => void;
  show: boolean;
  handleClose: () => void;
  columns: string[];
};

export function TaskForm({
  onSubmit,
  onColumnFormSubmit,
  show,
  handleClose,
  columns,
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
        .min(3, "Must be 3 characters or more")
        .max(30, "Must be 30 characters or less")
        .required("Title is required"),
      category: string().required("Category is required"),
      dueDate: date().required(
        "The format should be yyyy-MM-dd and due date is required"
      ),
      column: string().required("Status is required"),
    }),
    onSubmit: (values) => onSubmit(values),
  });

  const [activePage, setActivePage] = useState("task");

  return (
    <Modal className="input-form" show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="gap-3 d-flex">
          <Button
            active={activePage === "task"}
            variant="outline-dark"
            onClick={() => {
              setActivePage("task");
            }}
          >
            Create task
          </Button>
          <Button
            active={activePage === "column"}
            variant="outline-dark"
            onClick={() => {
              setActivePage("column");
            }}
          >
            Create column
          </Button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {activePage === "task" && (
          <Form onSubmit={formik.handleSubmit}>
            <TextInput
              id="title"
              label="Title"
              name="title"
              type="text"
              placeholder="Enter a title"
              onChange={formik.handleChange}
              value={formik.values.title}
              isError={
                formik.touched.title && formik.errors.title ? true : false
              }
              errorMessage={formik.errors.title}
            />
            <SelectInput
              id="category"
              label="Category"
              options={categories}
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
              options={columns}
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
        )}
        {activePage === "column" && (
          <ColumnForm
            onSubmit={onColumnFormSubmit}
            onHide={handleClose}
            columns={columns}
          />
        )}
      </Modal.Body>
    </Modal>
  );
}
