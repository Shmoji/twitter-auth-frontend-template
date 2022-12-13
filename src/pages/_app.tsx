import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import { Fragment, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { GlobalContextComponent } from 'lib/GlobalContext'
export { GlobalContext } from 'lib/GlobalContext'
import { ClientWrapper } from 'lib/ClientWrapper'

function MyApp({ Component, pageProps }: AppProps) {
  const Layout =
    (
      Component as typeof Component & {
        layoutProps: {
          Layout: (props: { children: ReactNode } & unknown) => JSX.Element
        }
      }
    ).layoutProps?.Layout || Fragment

  return (
    <GlobalContextComponent>
      <ClientWrapper>
        <ThemeProvider attribute="class" defaultTheme="dark">
            <Layout>
              <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
      </ClientWrapper>
    </GlobalContextComponent>
  )
}

export default MyApp
