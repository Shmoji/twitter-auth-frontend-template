import DefaultLayout from 'components/layouts/DefaultLayout'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <div >
      
      <div className="bg-red-500">Testing</div>

    </div>
  )
}

(Home as any).layoutProps = {
  Layout: DefaultLayout,
}

export default Home
