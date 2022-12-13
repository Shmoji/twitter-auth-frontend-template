import { completeTwitterLogin } from 'actions/users/apiUserActions'
import DefaultLayout from 'components/layouts/DefaultLayout'
import useAuth from 'modules/users/hooks/useAuth'
import type { GetServerSideProps, NextPage } from 'next'
import { useContext, useEffect } from 'react'
import { GlobalContext } from './_app'

type Props = {
  oauth_token: string
  oauth_verifier: string
  denied: string
}

const Home: NextPage = ({
  oauth_token,
  oauth_verifier,
  denied,
}: Props) => {
  const { setUser } = useContext(GlobalContext)

  const { setJwtFromApi } = useAuth()

  useEffect(() => {
    const completeTwitterLoginAndJwtSet = async () => {
      const response = await completeTwitterLogin(
        oauth_token,
        oauth_verifier,
      )

      setJwtFromApi(response?.twitterJwt, response?.validUntil)
      setUser(response?.twitterUserToken)
      window.history.pushState('test', 'test', '/') // Remove all URL params so this method isn't called anymore
    }

    if (
      (oauth_token && oauth_verifier)
    ) {
      completeTwitterLoginAndJwtSet()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    oauth_token,
    oauth_verifier,
    denied,
  ])

  return (
    <div >
      
      <div className="bg-red-500">Login with Twitter to track your mystery illness and get help from others.</div>

      {/* TODO: list of users */}


    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    oauth_token = null,
    oauth_verifier = null,
    denied = null,
  } = context.query

  return {
    props: {
      oauth_token: oauth_token,
      oauth_verifier: oauth_verifier,
      denied: denied,
    },
  }
}

(Home as any).layoutProps = {
  Layout: DefaultLayout,
}

export default Home
