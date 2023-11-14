import Form from "../../components/Form";
import PageHeader from "../../components/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../../utils/formikValidation";
import usePostActions from "../../lib/hooks/posts/usePostActions";

export default function AddPost() {
  const [addPost] = usePostActions();

  const inputs = [
    { name: "title", lable: "Title", type: "text" },
    { name: "description", lable: "Description", type: "text" },
  ];

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      title: "",
      description: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          title: Joi.string().min(2).max(255).required().label("Title"),
          description: Joi.string()
            .min(2)
            .max(1024)
            .required()
            .label("Description"),
        })
      );
    },
    onSubmit(values) {
      addPost(values);
    },
  });

  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Add A New Card"
        description="To create a new card, please fill in the following details! "
      ></PageHeader>
      <Form inputs={inputs} formik={formik} buttonTitle="add"></Form>
    </div>
  );
}

