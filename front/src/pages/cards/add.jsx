import Form from "../../components/Form";
import PageHeader from "../../components/PageHeader";
import { useFormik } from "formik";
import Joi from "joi";
import formikValidation from "../../utils/formikValidation";
import useCardActions from "../../hooks/useCard/useCardActions";

function AddCard() {
  const [addCard] = useCardActions();

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
          bizImage: Joi.string().min(11).max(1024).allow("").label("Image"),
        })
      );
    },
    onSubmit(values) {
      addCard(values);
    },
  });

  return (
    <div className="container-md w-50 text-center">
      <PageHeader
        title="Add A New Card"
        description="To create a new card, please fill in the following details! "
      ></PageHeader>
      <Form inputs={inputs} formik={formik} buttonTitle="Add-Card"></Form>
    </div>
  );
}

export default AddCard;
