import Form from "../components/Form";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../utils/formikValidation";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";


function SignIn() {
 
 const [user,SignIn] = useAuth()

  const inputs = [
    { name: "email", lable: "Email", type: "email" },
    { name: "password", lable: "Password", type: "password" },
  ];

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          email: Joi.string()
            .min(2)
            .max(250)
            .email({ tlds: { allow: false } })
            .required().label('Email'),
          password: Joi.string()
            .min(6)
            .max(250)
            .required()
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@%$#^&*\-_])(?=(.*\d){4,})[a-zA-Z!@%$#^&*\-_\d]{8,}$/
            ).label('Password'),
        })
      );
    },
    async onSubmit(values) {
       SignIn(values)
     
    },
  });
  if (user) return <Navigate to="/" />;
  return (
    <div className="container-md m-5 w-50">
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-In"></Form>
    </div>
  );
}

export default SignIn;
