import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email('Not a valid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

export const registerSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Not a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const updateProfileSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Not a valid email').required('Email is required')
})

export const updatePasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  passwordconfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
})

export const verifyPasswordSchema = yup.object().shape({
  password: yup.string().required('Password is required')
})

export const shippingSchema = yup.object().shape({
  address: yup.string().required('Shipping address is required'),
  city: yup.string().required('City is required'),
  postalcode: yup
    .number()
    .typeError('Not a valid postal code')
    .required('Postal code is required'),
  country: yup.string().required('Country is required')
})

export const paymentSchema = yup.object().shape({
  method: yup.string().required('Method is required')
})
