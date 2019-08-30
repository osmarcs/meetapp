import * as Yup from 'yup';

export function isValidSchemaCreateUser(body) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
  });

  return schema.isValid(body);
}

export function isValidSchemaUpdateUser(body) {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string().email(),
    oldPassword: Yup.string().min(6),
    password: Yup.string()
      .min(6)
      .when('oldPassword', (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirm_password: Yup.string()
      .min(6)
      .when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
  });

  return schema.isValid(body);
}
