import { FormProps } from "@/types";

interface ValidateProps {
  old_password?: string;
  new_password?: string;
  confirm_password?: string;
}

const validate_old_password = (form: FormProps, errors: ValidateProps, content: any) => {
  const old_password = form.old_password;

  if (old_password?.trim() === "") {
    errors.old_password = content.errors.security.change_password.modal.form.old_password.required;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      old_password ?? ""
    )
  ) {
    errors.old_password =
      content.errors.security.change_password.modal.form.old_password.rule;
  }

  return errors;
};

const validate_new_password = (form: FormProps, errors: ValidateProps, content: any) => {
  const new_password = form.new_password;
  const confirm_password = form.confirm_password;
  const old_password = form.old_password;
  errors.confirm_password = "";

  if (new_password?.trim() === "") {
    errors.new_password = content.errors.security.change_password.modal.form.new_password.required;;
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*.,!]{8,16}$/.test(
      new_password ?? ""
    )
  ) {
    errors.new_password = content.errors.security.change_password.modal.form.new_password.rule;
  } else if (
    new_password?.trim() !== "" &&
    old_password?.trim() !== "" &&
    new_password === old_password
  ) {
    errors.new_password = content.errors.security.change_password.modal.form.new_password.old_match;
  } else if (
    new_password?.trim() !== "" &&
    confirm_password?.trim() !== "" &&
    new_password !== confirm_password
  ) {
    errors.confirm_password = content.errors.security.change_password.modal.form.new_password.match;
  }

  return errors;
};

const validate_confirm_password = (form: FormProps, errors: ValidateProps, content: any) => {
  const confirm_password = form.confirm_password;
  const new_password = form.new_password;

  if (confirm_password?.trim() === "")
    errors.confirm_password = content.errors.security.change_password.modal.form.confirm_password.required;
  else if (new_password?.trim() !== "" && new_password !== confirm_password)
    errors.confirm_password = content.errors.security.change_password.modal.form.confirm_password.match;
  return errors;
};

const fncs = {
  old_password: validate_old_password,
  new_password: validate_new_password,
  confirm_password: validate_confirm_password,
};

export const validate = (form: FormProps, key: keyof typeof fncs, content: any) => {
  const errors: ValidateProps = {};
  return fncs[key](form, errors, content);
};
