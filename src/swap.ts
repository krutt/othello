/* ~~/src/swap.ts */

// imports
import { Currency, LNMarketsRest } from '@/types'

interface SwapArgs {
  from: Currency
  to: Currency
  amountUsd: number
  lnmarkets: LNMarketsRest
}

export async function swap({ from, to, amountUsd, lnmarkets }: SwapArgs) {
  if (from === 'usd' && to === 'btc') {
    console.log(`Swapping ${amountUsd} usd to btc`)
    await swapUsdToBtc({ amountUsd, lnmarkets })
    return
  }

  if (from === 'btc' && to === 'usd') {
    console.log(`Swapping btc for ${amountUsd} usd`)
    await swapBtcToUsd({ amountUsd, lnmarkets })
    return
  }
}

async function swapBtcToUsd({
  amountUsd,
  lnmarkets,
}: {
  amountUsd: number
  lnmarkets: LNMarketsRest
}) {
  await lnmarkets.futuresNewTrade({
    type: 'm',
    side: 's',
    quantity: amountUsd,
    leverage: 1,
  })
}

async function swapUsdToBtc({
  amountUsd,
  lnmarkets,
}: {
  amountUsd: number
  lnmarkets: LNMarketsRest
}) {
  const positions = await lnmarkets.futuresGetTrades({ type: 'running' })

  // Sort by ascending.
  const liveShorts = positions.filter(p => p.side === 's').sort((a, b) => a.quantity - b.quantity)
  const balanceUsd = liveShorts.reduce((acc, p) => acc + p.quantity, 0)

  if (balanceUsd < amountUsd) {
    throw new Error("You don't have enough usd to swap")
  }

  let usdClosed = 0
  for (const short of liveShorts) {
    if (usdClosed >= amountUsd) {
      break
    }
    await lnmarkets.futuresCloseTrade(short.pid)
    usdClosed += short.quantity
  }

  if (usdClosed == amountUsd) {
    return
  }

  const usdToReopen = usdClosed - amountUsd
  await lnmarkets.futuresNewTrade({
    type: 'm',
    side: 's',
    quantity: usdToReopen,
    leverage: 1,
  })
}
