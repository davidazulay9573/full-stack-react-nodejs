import Input from "./Input";
import useTheme from "../hooks/useTheme";

function Form({ inputs = [], formik, buttonTitle }) {
  const [theme] = useTheme();
  return (
    <form
      className={`form-group my-1  shadow-sm p-4 bg-${theme} border border-${
        theme === "dark" ? "light" : "dark"
      } rounded `}
      noValidate
      onSubmit={formik.handleSubmit}
    >
      {inputs.map((input) => {
        return (
          <Input
            key={input.name}
            {...formik.getFieldProps(input.name)}
            error={formik.touched[input.name] && formik.errors[input.name]}
            lable={input.lable}
            type={input.type}
          ></Input>
        );
      })}

      <div className="p-3">
        <button
          className={`btn btn-${theme === "dark" ? "light" : "dark"}`}
          type="submit"
          disabled={!formik.isValid}
        >
          {buttonTitle}
        </button>
      </div>
    </form>
  );
}

export default Form;
