import { getUserToken } from 'actions/users/apiUserActions'
import { GlobalContext } from 'lib/GlobalContext'
import { deleteCookie, setCookie } from 'modules/no-category/services/CookieService'
import { useContext } from 'react'

const useAuth = () => {
  const { setJwtToken, setUser } = useContext(GlobalContext)

  /**
   *
   * @param jwt -- the JWT from login API
   * @param validUntil -- the expiration date for the JWT returned
   */
  const setJwtFromApi = (jwt: string, validUntilISODate: string) => {
    setJwtToken(jwt)

    const validUntilUTCDate = new Date(validUntilISODate).toUTCString()

    setCookie('tt', jwt, validUntilUTCDate)
  }

  const setUserFromJwt = async (jwt: string) => {
    if (jwt) {
      const userToken = await getUserToken({ jwt })
      if (userToken) {
        setUser(userToken)
      }
    }
  }

  const twitterLogout = (): void => {
    deleteCookie('tt')
    setUser(null)
    setJwtToken(null)
  }

  return { setUserFromJwt, twitterLogout, setJwtFromApi }
}

export default useAuth
