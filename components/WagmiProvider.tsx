"use client"

import { useState, useEffect } from 'react'
import { sequence } from '0xsequence'
import { ThemeProvider } from '@0xsequence/design-system'
import { getKitConnectWallets } from '@0xsequence/kit'
import { sequence as sequenceWallet } from '@0xsequence/kit-connectors'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createConfig, http, WagmiProvider as WagmiProviderWrapper } from 'wagmi'
import { mainnet, polygon, Chain } from 'wagmi/chains'

import '@0xsequence/design-system/styles.css'

const queryClient = new QueryClient() 

interface WagmiProviderProps {
  children: React.ReactNode
}

function WagmiProvider({ children }: WagmiProviderProps) {
  // const [mounted, setMounted] = useState(false)

  // useEffect(() => {
  //   setMounted(true);
  // }, [])

  // if (!mounted) {
  //   return <> </>
  // }

  const chains = [mainnet, polygon] as [Chain, ...Chain[]]
  
  const projectAccessKey = 'iK0DPkHRt0IFo8o4M3fZIIOAAAAAAAAAA'

  const connectors = getKitConnectWallets(projectAccessKey,
    [
      sequenceWallet({
        connect: {
          app: 'next app'
        }
      })
    ]
  )


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
