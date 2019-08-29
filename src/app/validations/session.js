import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export function isValidSchemaLogin(body) {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required(),
  });

  return schema.isValid(body);
}
