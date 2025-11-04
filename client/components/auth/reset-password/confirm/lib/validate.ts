import { FormProps } from "@/types";

const validate_new_password = (form: FormProps) => {
  const new_password = form["new_password"];
  let message = "";

  if (new_password?.trim() === "") {
    message = "This field is required.";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      new_password ?? ""
    )
  ) {
    message =
      "Password must be 8–16 characters, include letters and digits, and can contain @#$%^&*.,!";
  }

  return message;
};

const validate_confirm_password = (form: FormProps) => {
  const confirm_password = form["confirm_password"];
  const new_password = form["new_password"];
  let message = "";

  if (confirm_password?.trim() === "") message = "This field is required.";
  else if (confirm_password !== new_password)
    message = "Confirm password does not match password.";
  return message;
};

const fncs = {
  new_password: validate_new_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs) => {
  return fncs[key](form);
};
