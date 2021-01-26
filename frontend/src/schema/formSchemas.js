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
  name: yup.string(),
  email: yup.string().email('Not a valid email'),
  password: yup.string(),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})
export const loginSchema = yup.object().shape({
  email: yup.string().email('Not a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
})
