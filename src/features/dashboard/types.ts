import * as yup from 'yup';

const markupPercentageRegex = /^((([0-4]\.([0-9]([0-9])?)?))||([5]\.([0]([0])?)?)||([0-5]))$/;
const urlRegex = /^[a-z][a-z0-9.+-]*:\/\/[0-9a-zA-Z.-]+[%/\w .-]*$/;

const base_schema = {
  name: yup
    .string()
    .required('Enter your app name.')
    .max(48, 'Your app name cannot exceed 48 characters.'),
  read: yup.boolean(),
  trade: yup.boolean(),
  payments: yup.boolean(),
  trading_information: yup.boolean(),
  admin: yup.boolean(),
  redirect_uri: yup
    .string()
    .max(255, 'Your website URL cannot exceed 255 characters.')
    .notRequired()
    .matches(urlRegex, {
      message: 'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
      excludeEmptyString: true,
    }),
  verification_uri: yup
    .string()
    .max(255, 'Your website URL cannot exceed 255 characters.')
    .notRequired()
    .matches(urlRegex, {
      message: 'Enter a valid URL. (Example: https://www.[YourDomainName].com)',
      excludeEmptyString: true,
    }),
  app_markup_percentage: yup
    .string()
    .max(4, 'Your markup value cannot be more than 4 characters.')
    .matches(
      markupPercentageRegex,
      'Your markup value must be equal to or above 0.00 and no more than 5.00.',
    ),
  app_id: yup.number(),
};

export const appEditSchema = yup.object(base_schema);

export const appRegisterSchema = yup.object({
  ...base_schema,
  currency_account: yup.string(),
  api_token: yup.string(),
});

export type IRegisterAppForm = yup.InferType<typeof appRegisterSchema>;
