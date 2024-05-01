import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import InputField from "../components/form-ui/inputfield";
import DatePicker from "../components/form-ui/datepicker";
import Dropdown from "../components/form-ui/dropdown";
import { Button } from "@mui/material";

// FORMIK
const INITIAL_FORM_STATE = {
  taskName: "",
};
// YUP
const FORM_VALIDATION = Yup.object().shape({
  taskName: Yup.string().required("Required!"),
});

const FormExample = () => {
  return (
    <>
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values) => {
          console.log(values);
        }}
      >
        <Form>
          <InputField name="taskName" label="Your lable" />
          <div className="m-3"></div>
          <DatePicker name="deadline" />
          <div className="m-3"></div>
          <Dropdown
            name="stage"
            label="Status"
            options={{
              NotStarted: "Not Started",
              Started: "Started",
              InProgress: "In Progress",
              Completed: "Completed",
            }}
          />
          <div className="m-3"></div>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default FormExample;
