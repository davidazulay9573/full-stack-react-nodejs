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

function SignUpEditor() {
  const [user, isLoading, , , signUp] = useAuth();

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
            .email({ tlds: { allow: false } })
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
          name: Joi.string().min(2).max(250).required().label("Name").messages({
            "string.pattern.base": `The "Password" must contain at least 8 Characters, and include 1 Upper-Case letter, 1 Lower-Case letter, 1 Special Symbol(!@%$#^&*-_) and 4 digits(0-9).`,
          }),
        })
      );
    },
    onSubmit(values) {
      signUp({ ...values, isContentEditor: true }, "/posts");
    },
  });
  if (user) return <Navigate to="/" />;
  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Sign Up For Content Editor"
        description="Please enter your details!"
      ></PageHeader>
      {isLoading && <h5>Loading...</h5>}
      <Form inputs={inputs} formik={formik} buttonTitle="Sign-Up"></Form>
      <p>
        You already have an account? <Link to="/auth/sign-in">Sign-in</Link>
      </p>
    </div>
  );
}

export default SignUpEditor;
