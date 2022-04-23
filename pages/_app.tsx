import { AuthProvider } from '@Components/common/AuthProvider'
import { persistor, store } from '@Configs'
import { CacheProvider } from '@emotion/react'
import { EmptyLayout } from '@Layouts'
import { AppPropsWithLayout } from '@Model'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache, theme } from '@Utils'
import Head from 'next/head'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import '../styles/globals.css'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const Layout = Component.Layout ?? EmptyLayout

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CacheProvider value={emotionCache}>
          <AuthProvider>
            <Head>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </AuthProvider>
        </CacheProvider>
      </PersistGate>
    </Provider>
  )
}

export default MyApp
