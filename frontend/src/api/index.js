import axios from 'axios'

export const getProducts = async () => {
  const { data } = await axios({
    url: '/api/products',
    method: 'GET'
  })
  return data
}

export const getProductById = async (id) => {
  const { data } = await axios({
    url: `/api/products/${id}`,
    method: 'GET'
  })
  return data
}

export const loginUser = async (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const { data } = await axios(
    {
      url: '/api/users/login',
      method: 'POST'
    },
    { email, password },
    config
  )

  return data
}
