import { FormProps } from "@/types";

interface ValidateProps {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  confirm_password?: string;
}

const validate_first_name = (form: FormProps, errors: ValidateProps, content: any) => {
  const first_name = form.first_name;
  errors.first_name =
    first_name?.trim() === "" ? content.errors.form.first_name.required : "";
  return errors;
};

const validate_last_name = (form: FormProps, errors: ValidateProps, content: any) => {
  const last_name = form.last_name;
  errors.last_name = last_name?.trim() === "" ? content.errors.form.last_name.required : "";
  return errors;
};

const validate_email = (form: FormProps, errors: ValidateProps, content: any) => {
  const email = form.email;
  if (email?.trim() === "") errors.email = content.errors.form.email.required;
  else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email ?? "")
  )
    errors.email = content.errors.form.email.invalid;
  return errors;
};

const validate_password = (form: FormProps, errors: ValidateProps, content: any) => {
  const password = form.password;
  const confirm_password = form.confirm_password;
  errors.confirm_password = "";

  if (password?.trim() === "") {
    errors.password = content.errors.form.password.required;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(password ?? "")
  ) {
    errors.password =
      content.errors.form.password.rule
  } else if (
    password?.trim() !== "" &&
    confirm_password?.trim() !== "" &&
    password !== confirm_password
  ) {
    errors.confirm_password = content.errors.form.password.match;
  }

  return errors;
};
const validate_confirm_password = (form: FormProps, errors: ValidateProps, content: any) => {
  const confirm_password = form.confirm_password;
  const password = form.password;

  if (confirm_password?.trim() === "")
    errors.confirm_password = content.errors.form.confirm_password.required;
  else if (password?.trim() !== "" && password !== confirm_password) {
    errors.confirm_password = content.errors.form.confirm_password.match;
  }
  return errors;
};

const fncs = {
  first_name: validate_first_name,
  last_name: validate_last_name,
  email: validate_email,
  password: validate_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs, content: any) => {
  const errors: ValidateProps = {};
  return fncs[key](form, errors, content);
};
