import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const employeeSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  pesel: yup
    .number()
    .test(
      "len",
      "Pesel number must be exactly 11 characters",
      (val) => val?.toString()?.length === 11,
    ),
  zipCode: yup.string().required(),
  city: yup.string().required(),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required(),
});
