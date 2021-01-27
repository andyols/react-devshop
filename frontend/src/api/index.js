import axios from 'axios'

const headers = {
  'Content-Type': 'application/json'
}

export const requestProducts = async () => {
  const { data } = await axios({
    url: '/api/products',
    method: 'GET'
  })
  return data
}

export const requestProduct = async (id) => {
  const { data } = await axios({
    url: `/api/products/${id}`,
    method: 'GET'
  })
  return data
}

export const requestUserLogin = async ({ email, password }) => {
  const { data } = await axios({
    url: '/api/users/login',
    method: 'POST',
    data: { email, password },
    headers
  })

  return data
}

export const requestUserRegister = async ({ name, email, password }) => {
  const { data } = await axios({
    url: '/api/users',
    method: 'POST',
    data: { name, email, password },
    headers
  })

  return data
}

export const requestUserProfile = async (token, id = 'profile') => {
  const { data } = await axios({
    url: `/api/users/${id}`,
    method: 'GET',
    headers: { ...headers, Authorization: `Bearer ${token}` }
  })

  return data
}

export const requestUpdateUserProfile = async ({
  _id,
  token,
  name,
  email,
  password
}) => {
  const { data } = await axios({
    url: '/api/users/profile',
    method: 'PUT',
    headers: { ...headers, Authorization: `Bearer ${token}` },
    data: { _id, name, email, password }
  })

  return data
}
