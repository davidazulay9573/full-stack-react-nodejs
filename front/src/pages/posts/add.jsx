import Form from "../../components/common/Form";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../../lib/utils/formikValidation";
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
    <div className="container text-center">
      <p className=" m-4">Add A New Post</p>
      <Form inputs={inputs} formik={formik} buttonTitle="add"></Form>
    </div>
  );
}
