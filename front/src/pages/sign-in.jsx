import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import { formikValidation, passwordRegex } from "../utils/formikValidation";
import useAuth from "../hooks/useAuth";
import { Navigate, Link } from "react-router-dom";

function SignIn() {
  const [user,isLoading ,signIn] = useAuth();

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
            .required()
            .label("Email"),
          password: Joi.string()
            .min(6)
            .max(250)
            .required()
            .regex(passwordRegex)
            .label("Password"),
        })
      );
    },
    onSubmit(values) {
      signIn(values);
    },
  });
  if (user) return <Navigate to="/" />;
  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Sign In"
        description="Please enter your details!"
      ></PageHeader>
         
         {isLoading && <h5>Loading...</h5> }
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-In"></Form>
      <p>
        Don't have an account yet? <Link to="/sign-up">Sign-up</Link>
      </p>
    </div>
  );
}

export default SignIn;
