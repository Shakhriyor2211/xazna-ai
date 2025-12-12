import { FormProps } from "@/types";

const validate_new_password = (form: FormProps, content: any) => {
  const new_password = form["new_password"];
  let message = "";

  if (new_password?.trim() === "") {
    message = content.errors.confirm.form.new_password.required;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      new_password ?? ""
    )
  ) {
    message = content.errors.confirm.form.new_password.rule
  }

  return message;
};

const validate_confirm_password = (form: FormProps, content: any) => {
  const confirm_password = form["confirm_password"];
  const new_password = form["new_password"];
  let message = "";

  if (confirm_password?.trim() === "") message = content.errors.confirm.form.confirm_password.required;
  else if (confirm_password !== new_password)
    message = content.errors.confirm.form.confirm_password.match;
  return message;
};

const fncs = {
  new_password: validate_new_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs, content: any) => {
  return fncs[key](form, content);
};
