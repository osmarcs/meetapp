import * as Yup from 'yup';

// eslint-disable-next-line import/prefer-default-export
export function isValidSchemaCreatUser(body) {
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
