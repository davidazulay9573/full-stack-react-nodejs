import Form from "../../components/common/Form";
import PageHeader from "../../components/common/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import {
  formikValidation,
  passwordRegex,
} from "../../lib/utils/formikValidation";
import useAuth from "../../lib/hooks/global-states/useAuth";
import { Navigate, Link } from "react-router-dom";

function SignIn() {
  const [user, isLoading, signIn] = useAuth();

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
            .pattern(passwordRegex)
            .label("Password")
            .messages({
              "string.pattern.base": `The "Password" must contain at least 8 Characters, including 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*_-) and 4 digits(0-9).`,
            }),
        })
      );
    },
    onSubmit(values) {
      signIn(values);
    },
  });
  if (user) return <Navigate to="/" />;
  return (
    <div className="col-12 col-lg-6 mx-auto text-center">
      <PageHeader
        title="Sign In"
        description="Please enter your details!"
      ></PageHeader>

      {isLoading && <h5>Loading...</h5>}
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-In"></Form>
      <p>
        Don't have an account yet? <Link to="/auth/sign-up">Sign-up</Link>
      </p>
    </div>
  );
}

export default SignIn;
