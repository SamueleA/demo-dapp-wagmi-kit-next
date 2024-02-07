"use client"
// NOTE: "use client" is only necessary above for using the design system in this component

import { Box, Button, Text } from '@0xsequence/design-system'
import { sequence } from '0xsequence'
import ethers from 'ethers'
import type { NextPage } from 'next';
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useWalletClient,
  usePublicClient
} from 'wagmi'

const Home: NextPage = () => {
  const { isConnected, address, chainId } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()

  const onConnect = () => {
    const sequenceConnector = connectors.find(connector => connector.id === 'sequence')
    if (sequenceConnector) {
      connect({
        connector: sequenceConnector
      })
    }
  }

  const onDisconnect = () => {
    disconnect()
  }

  const onSignMessage = async () => {
    if (!publicClient || !walletClient) {
      return
    }
    try {
      const message = `Two roads diverged in a yellow wood,
  Robert Frost poet
  
  And sorry I could not travel both
  And be one traveler, long I stood
  And looked down one as far as I could
  To where it bent in the undergrowth;
  
  Then took the other, as just as fair,
  And having perhaps the better claim,
  Because it was grassy and wanted wear;
  Though as for that the passing there
  Had worn them really about the same,
  
  And both that morning equally lay
  In leaves no step had trodden black.
  Oh, I kept the first for another day!
  Yet knowing how way leads on to way,
  I doubted if I should ever come back.
  
  I shall be telling this with a sigh
  Somewhere ages and ages hence:
  Two roads diverged in a wood, and I—
  I took the one less traveled by,
  And that has made all the difference.`
      
  
      const [account] = await walletClient.getAddresses()
  
      // sign
      const sig = await walletClient.signMessage({
        message,
        account
      })
      console.log('signature:', sig)
  

      const isValid = await publicClient.verifyMessage({
        address: account,
        message,
        signature: sig
      })

      console.log('isValid?', isValid)
  
    } catch(e) {
      console.error(e)
    }
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      paddingY="12"
      flexDirection="column"
    >
      <Text variant="xlarge">
        Sequence + Wagmi + NextJs = ❤️
      </Text>
      <Box
        justifyContent="center"
        alignItems="center"
        paddingY="10"
        flexDirection="column"
        gap="4"
      >
        {isConnected ? (
          <>
            <Button
              label="Disconnect"
              onClick={onDisconnect}
            />
            <Button
              label="Sign Message"
              onClick={onSignMessage}
            />
            <Text variant="medium">
              Address: {address}
            </Text>
            <Text variant="medium">
              Connected to network: {chainId}
            </Text>
          </>
        ) : (
          <Button
            disabled={isPending}
            label={isPending ? 'Connecting...' : 'Connect'}
            onClick={onConnect}
          />
        )}
      </Box>
    </Box>
  );
};

export default Home;
