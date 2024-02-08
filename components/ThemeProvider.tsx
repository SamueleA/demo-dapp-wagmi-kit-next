"use client"

import { useEffect, useState } from 'react'

import { ThemeProvider } from '@0xsequence/design-system'

interface WagmiProviderProps {
  children: React.ReactNode
}

function Theme({ children }: WagmiProviderProps) {
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true);
  // }, [])

  // if (!mounted) {
  //   return <> </>
  // }

  return (
    <ThemeProvider theme="dark">
      {children}
    </ThemeProvider>
  );
}

export default Theme;
