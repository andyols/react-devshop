import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Not a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const updateSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Not a valid email').required('Email is required')
})

export const updatePasswordSchema = yup.object().shape({
  passwordold: yup.string().required('Current password is required'),
  password: yup
    .string()
    .notOneOf(
      [yup.ref('passwordold'), null],
      'New password cannot be the same as old password'
    )
    .required('Password is required'),
  passwordconfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const loginSchema = yup.object().shape({
  email: yup.string().email('Not a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
})
