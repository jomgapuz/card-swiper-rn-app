import {yupObject, yupString} from '../tools/yup';

export type LoginRequestData = {
  email: string;
  password: string;
};

export const POSTLoginResponseSchema = yupObject({
  Data: yupObject({
    AccessToken: yupString,
  }),
});

export const GETUserDetailsResponseSchema = yupObject({
  Data: yupObject({
    RID: yupString,
    FirstName: yupString,
    LastName: yupString,
    MiddleName: yupString,
  }),
});

export const GETUserDetailsErrorSchema = yupObject({
  detail: yupString,
});
