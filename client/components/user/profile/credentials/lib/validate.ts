import { FormProps } from "@/types";

interface ValidateProps {
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}

const validate_old_password = (form: FormProps, errors: ValidateProps) => {
  const old_password = form.old_password;

  if (old_password?.trim() === "") {
    errors.old_password = "This field is required.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      old_password ?? ""
    )
  ) {
    errors.old_password =
      "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!";
  }

  return errors;
};

const validate_new_password = (form: FormProps, errors: ValidateProps) => {
  const new_password = form.new_password;
  const confirm_password = form.confirm_password;
  const old_password = form.old_password;
  errors.confirm_password = "";

  if (new_password?.trim() === "") {
    errors.new_password = "This field is required.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      new_password ?? ""
    )
  ) {
    errors.new_password =
      "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!";
  } else if (
    new_password?.trim() !== "" &&
    old_password?.trim() !== "" &&
    new_password === old_password
  ) {
    errors.new_password =
      "New password cannot be the same as the old password.";
  } else if (
    new_password?.trim() !== "" &&
    confirm_password?.trim() !== "" &&
    new_password !== confirm_password
  ) {
    errors.confirm_password = "Passwords did not match.";
  }

  return errors;
};

const validate_confirm_password = (form: FormProps, errors: ValidateProps) => {
  const confirm_password = form.confirm_password;
  const new_password = form.new_password;

  if (confirm_password?.trim() === "")
    errors.confirm_password = "This field is required.";
  else if (new_password?.trim() !== "" && new_password !== confirm_password)
    errors.confirm_password = "Passwords did not match.";
  return errors;
};

const fncs = {
  old_password: validate_old_password,
  new_password: validate_new_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs) => {
  const errors: ValidateProps = {};
  return fncs[key](form, errors);
};
