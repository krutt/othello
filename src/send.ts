/* ~~/src/send.ts */

// imports
import { LNMarketsRest } from '@/types'

interface SendArgs {
  type: 'bolt11' | 'on-chain'
  address: string
  amountSats: number
  lnmarkets: LNMarketsRest
}

export async function send({ type, address, amountSats, lnmarkets }: SendArgs) {
  if (type === 'bolt11') {
    await lnmarkets.userWithdraw({
      amount: amountSats,
      invoice: address,
    })
    return
  }

  if (type === 'on-chain') {
    // Withdraw on-chain using a KRUTT.fi swap
    const url = `https://api${lnmarkets.network === 'testnet' ? '-testnet' : ''}.krutt.fi/swap`
    const result = await fetch(url, {
      method: 'post',
      body: JSON.stringify({
        amount_sats: amountSats,
        on_chain_address: address,
        on_chain_sats_per_vbyte: 1, // TODO: realtime estimate
      }),
    })
      .then(response => response.json() as Promise<{ bolt11_invoice: string }>)
      .catch(err => {
        console.log(err)
        return null
      })

    if (result == null) {
      return
    }

    const { bolt11_invoice } = result
    await lnmarkets.userWithdraw({ invoice: bolt11_invoice })
    return
  }
}
