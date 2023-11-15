/* eslint-disable react-hooks/exhaustive-deps */
import Form from "../../components/Form";
import PageHeader from "../../components/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../../lib/utils/formikValidation";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import usePost from "../../lib/hooks/posts/usePost";
import usePostActions from "../../lib/hooks/posts/usePostActions";

function EditPost() {
  const { id } = useParams();
  const post = usePost(id);
  const [, editPost] = usePostActions();

  useEffect(() => {
    if (!post) return;
    const {
      title = "",
      description = "",
    } = post;

    formik.setValues({
      title,
      description
    });
  }, [post]);

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
          title: Joi.string().min(2).max(255).required().label("Name"),
          description: Joi.string().min(2).max(1024).required().label("Description"),
        })
      );
    },
    onSubmit(values) {
      editPost(values, id);
    },
  });

  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Edit Your post"
        description="Please fill in the new details! "
      ></PageHeader>
      <Form inputs={inputs} formik={formik} buttonTitle="Edit-post"></Form>
    </div>
  );
}

export default EditPost;
