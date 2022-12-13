import client from 'lib/axios'

export const uploadAccountPhoto = ({ formData, token }) =>
  client.post(`/user-token/profilePhoto`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'content-Type': 'multipart/form-data',
    },
  })

export const sendVerificationCodeToAccountEmail = ({ token, email }) =>
  client.get(`/user-token/emailVerification`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      email,
    },
  })

export const checkAccountEmailVerificationCode = ({ token, code, email }) =>
  client.post(
    `/user-token/emailVerification`,
    { code, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

/**
 *
 */
export const initiateTwitterLoginAPI = async (jwt: string): Promise<any> => {
  try {
    const response = await client.post(
      `/user-token/initiateTwitterLogin`,
      {},
      {
        headers: {
          Authorization: jwt ? `Bearer ${jwt}` : null,
        },
      }
    )
    return response?.data?.data?.twitterVerification
  } catch (error) {
    console.error(
      `Could not generate access token for twitter authentication`,
      error
    )
  }
}

/**
 *
 */
export const completeTwitterLogin = async (
  requestToken: string,
  oAuthVerifier: string,
) => {
  try {
    const response = await client.post(
      `/user-token/completeTwitterLogin`,
      { requestToken, oAuthVerifier },
    )
    return response?.data?.data?.twitterVerification
  } catch (error) {
    console.error(`Could not complete twitter login`, error)
  }
}

/**
 * Get account for a walletAddress, username, or jwt
 */
export const getUserToken = async ({
  walletAddress = null,
  username = null,
  jwt = null,
}) => {
  if (!username && !walletAddress && !jwt) return null

  try {
    const response = await client.get(`/user-token/single`, {
      params: {
        username,
        walletAddress,
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })

    return response?.data?.data?.userToken
  } catch (error) {
    console.error(`getUserToken failed`)
    return null
  }
}
