import '../styles/global.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic'

import {
  ThemeProvider,
} from '@0xsequence/design-system'

import '@0xsequence/design-system/styles.css'

const WagmiProvider = dynamic(() => import('./WagmiProvider'), {
  ssr: false
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider>
      <ThemeProvider theme="dark">
        <Component {...pageProps} />
      </ThemeProvider>
    </WagmiProvider>
  );
}

export default MyApp;
