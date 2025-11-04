import { FormProps } from "@/types";

interface ValidateProps {
  email?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  confirm_password?: string;
}

const validate_first_name = (form: FormProps, errors: ValidateProps) => {
  const first_name = form.first_name;
  errors.first_name =
    first_name?.trim() === "" ? "This field is required." : "";
  return errors;
};

const validate_last_name = (form: FormProps, errors: ValidateProps) => {
  const last_name = form.last_name;
  errors.last_name = last_name?.trim() === "" ? "This field is required." : "";
  return errors;
};
const validate_email = (form: FormProps, errors: ValidateProps) => {
  const email = form.email;
  if (email?.trim() === "") errors.email = "This field is required.";
  else if (
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email ?? "")
  )
    errors.email = "Invalid email format.";
  return errors;
};

const validate_password = (form: FormProps, errors: ValidateProps) => {
  const password = form.password;
  const confirm_password = form.confirm_password;
  errors.confirm_password = "";

  if (password?.trim() === "") {
    errors.password = "This field is required.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(password ?? "")
  ) {
    errors.password =
      "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!";
  } else if (
    password?.trim() !== "" &&
    confirm_password?.trim() !== "" &&
    password !== confirm_password
  ) {
    errors.confirm_password = "Passwords did not match.";
  }

  return errors;
};
const validate_confirm_password = (form: FormProps, errors: ValidateProps) => {
  const confirm_password = form.confirm_password;
  const password = form.password;

  if (confirm_password?.trim() === "")
    errors.confirm_password = "This field is required.";
  else if (password?.trim() !== "" && password !== confirm_password)
    errors.confirm_password = "Passwords did not match.";
  return errors;
};

const fncs = {
  first_name: validate_first_name,
  last_name: validate_last_name,
  email: validate_email,
  password: validate_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs) => {
  const errors: ValidateProps = {};
  return fncs[key](form, errors);
};
