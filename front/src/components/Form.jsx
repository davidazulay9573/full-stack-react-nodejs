import Input from "./Input";

function Form({ inputs = [], formik, buttonTitle }) {
  return (
    <form
      className="form-group my-1 bg-light shadow-sm p-4"
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
          className="btn btn-dark"
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
