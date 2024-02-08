import dynamic from 'next/dynamic'

import '../styles/global.css';
import type { AppProps } from 'next/app';


import '@0xsequence/design-system/styles.css'
// import WagmiProvider from 'components/WagmiProvider';
// import ThemeProvider from 'components/ThemeProvider';

import HomePage from 'components/HomePage'

const WagmiProvider = dynamic(() => import('components/WagmiProvider'), {
  ssr: false
})

const ThemeProvider = dynamic(() => import('components/ThemeProvider'), {
  ssr: false
})

function MyApp() {
  return (
    <WagmiProvider>
      <ThemeProvider>
        <HomePage />
      </ThemeProvider>
    </WagmiProvider>
  );
}

export default MyApp;
