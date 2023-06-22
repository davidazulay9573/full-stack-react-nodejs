import Form from "../components/Form";
import PageHeader from "../components/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../utils/formikValidation";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCard from "../hooks/useCard/useCard";
import useCardActions from "../hooks/useCard/useCardActions";

function EditCard() {
  const { id } = useParams();
  const card = useCard(id);
  const [, editCard] = useCardActions();
  
  useEffect( () => {
    if (!card) return;
    const { bizName ='', bizDescription='', bizAddress='', bizPhone='', bizImage='' } = card ;
    
    formik.setValues({
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
    });
    
  }, [card]);

  const inputs = [
    { name: "bizName", lable: "Name", type: "text" },
    { name: "bizDescription", lable: "Description", type: "text" },
    { name: "bizAddress", lable: "Address", type: "text" },
    { name: "bizPhone", lable: "Phone", type: "text" },
    { name: "bizImage", lable: "Image", type: "text" },
  ];
  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate(values) {
      return formikValidation(values)(
        Joi.object({
          bizName: Joi.string().min(2).max(255).required().label("Name"),
          bizDescription: Joi.string()
            .min(2)
            .max(1024)
            .required()
            .label("Description"),
          bizAddress: Joi.string().min(2).max(400).required().label("Address"),
          bizPhone: Joi.string()
            .min(9)
            .max(10)
            .required()
            .regex(/^0[2-9]\d{7,8}$/)
            .label("Phone"),
          bizImage: Joi.string().min(11).max(1024).label("Image"),
        })
      );
    },
    onSubmit(values) {
      editCard(values, id);
    },
  });

  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Edit Your Card"
        description="Please fill in the new details! "
      ></PageHeader>
      <Form inputs={inputs} formik={formik} buttonTitle="Edit-Card"></Form>
    </div>
  );
}

export default EditCard;
