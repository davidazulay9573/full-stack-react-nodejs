import Form from "../components/Form";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../utils/formikValidation";

import {  Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SignUpBiz() {
  const [user,,,signUp] = useAuth();

  const inputs = [
    { name: "name", lable: "Name", type: "text" },
    { name: "email", lable: "Email", type: "email" },
    { name: "password", lable: "Password", type: "password" },
  ];

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          email: Joi.string()
            .min(1)
            .max(250)
            .required()
            .email({ tlds: { allow: false } }).label('Email'),
          password: Joi.string()
            .min(6)
            .max(250)
            .required()
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/
            )
            .label("Password"),
          name: Joi.string().min(2).max(250).required().label('Name'),
        })
      );
    },
    async onSubmit(values) {
     
        await signUp({ ...values, biz: true },'my-cards');
      
  
    },
  });
  if (user) return <Navigate to="/" />;
  return (
    <div className="container-md m-5 w-50">
      <Form
        inputs={inputs}
        formik={formik}
        buttonTitle="Sign-Up Business"
      ></Form>
    </div>
  );
}

export default SignUpBiz;
