/* ~~/src/balance.ts */

// imports
import { LNMarketsRest, Network } from '@/types'
import { SATS_PER_BITCOIN } from '@/constants'

export async function fetchUserBalances({ lnmarkets }: { lnmarkets: LNMarketsRest }) {
  let userInfo = await lnmarkets.userGet()
  let balanceBtc = userInfo.balance / SATS_PER_BITCOIN
  let balanceUsd = await calculateUsdBalance({ lnmarkets })
  let network: Network = lnmarkets.network || 'mainnet'
  let { btcEquivalent, usdEquivalent } = await calculateEquivalents({
    balanceBtc,
    balanceUsd,
    network,
  })
  return { balanceBtc, balanceUsd, btcEquivalent, usdEquivalent }
}

export async function calculateEquivalents({
  balanceBtc,
  balanceUsd,
  network,
}: {
  balanceBtc: number
  balanceUsd: number
  network: Network
}) {
  // let ticker = await lnmarkets.futuresGetTicker()  // TODO: Find out why Signature invalid for public endpoint
  let host: string = `https://${network !== 'testnet' ? 'api' : 'api.testnet'}.lnmarkets.com`
  let { index } = await (await fetch(`${host}/v2/futures/ticker`)).json()
  const usdEquivalent = (balanceBtc * index + balanceUsd).toFixed(2)
  const btcEquivalent = (balanceBtc + balanceUsd / index).toFixed(8)
  return { btcEquivalent, usdEquivalent }
}

export async function calculateUsdBalance({ lnmarkets }: { lnmarkets: LNMarketsRest }) {
  let positions = await lnmarkets.futuresGetTrades({ type: 'running' })
  let liveShorts = positions.filter(
    p => p.side === 's' && p.market_wi === 'filled' && p.margin_wi === 'running'
  )
  return liveShorts.reduce((acc, p) => acc + p.quantity, 0)
}
