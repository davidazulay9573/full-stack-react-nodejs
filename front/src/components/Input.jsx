function Input({ lable, name, error, ...rest }) {
  return (
    <>
      <label htmlFor={name}>{}</label>
      {error && <span className="text-danger ms-1">*</span>}
      <input
        {...rest}
        name={name}
        placeholder={lable}
        id={name}
        className={["form-control", error && "is-invalid"].join(" ")}
      />
      <span className="invalid-feedback text-danger ms-1">{error}</span>
    </>
  );
}

export default Input;
