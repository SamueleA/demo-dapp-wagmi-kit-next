"use client"

import React, { useEffect, useState } from 'react'
import { ThemeProvider } from '@0xsequence/design-system'

import { sequenceWallet } from '@0xsequence/wagmi-connector'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 


import {
  createConfig,
  WagmiProvider as WagmiProviderWrapper,
  http
} from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai, sepolia, Chain } from '@wagmi/chains'
import { sequence } from '0xsequence'

import '@0xsequence/design-system/styles.css'

const queryClient = new QueryClient() 

interface WagmiProviderProps {
  children: React.ReactNode
}

function WagmiProvider({ children }: WagmiProviderProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true);
  }, [])

  if (!mounted) {
    return <> </>
  }
  
  let walletAppURL = 'https://sequence.app'


  const chains = [mainnet, polygon, optimism, arbitrum, polygonMumbai, sepolia] as [Chain, ...Chain[]]


  const connectors = [
    sequenceWallet({
      defaultNetwork: 137,
      projectAccessKey: 'iK0DPkHRt0IFo8o4M3fZIIOAAAAAAAAAA',
      connect: {
        app: 'Demo-app',

        // This is optional, and only used to point to a custom
        // environment for the wallet app. By default, it will
        // point to https://sequence.app/
        walletAppURL,
      }
    })
  ]

  const transports: { [index:number]: any } = {}

  chains.forEach(chain => {
    const network = sequence.network.findNetworkConfig(sequence.network.allNetworks, chain.id)
    if (!network) return
    transports[chain.id] = http(network.rpcUrl)
  })

  const wagmiConfig = createConfig({
    chains,
    connectors,
    transports,
  })

  return (
    <ThemeProvider>
      <WagmiProviderWrapper config={wagmiConfig}>
        <QueryClientProvider client={queryClient}> 
          {children}
        </QueryClientProvider> 
      </WagmiProviderWrapper>
    </ThemeProvider>
  )
}

export default WagmiProvider;
