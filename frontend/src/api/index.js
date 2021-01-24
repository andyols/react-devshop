import axios from 'axios'

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
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

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
