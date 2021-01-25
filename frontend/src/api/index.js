import axios from 'axios'

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
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
  const { data } = await axios(
    {
      url: '/api/users/login',
      method: 'POST',
      data: { email, password }
    },
    config
  )

  return data
}

export const requestUserRegister = async ({ name, email, password }) => {
  const { data } = await axios(
    {
      url: '/api/users',
      method: 'POST',
      data: { name, email, password }
    },
    config
  )

  return data
}

export const requestUserProfile = async (id, token) => {
  const { data } = await axios(
    {
      url: `/api/users/${id}`,
      method: 'GET'
    },
    { ...config, headers: `Bearer ${token}` }
  )

  return data
}
