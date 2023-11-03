/* ~~/tests/balance.spec.ts */

// imports
import { LNMarketsRest } from '@/types'
import { calculateUsdBalance } from '@/balance'
import { createPosition } from 'τ/utils/lnmarkets'
import { createRestClient } from '@ln-markets/api'
import { describe, expect, it, vi } from 'vitest'

let lnmarkets: LNMarketsRest = createRestClient({ network: 'testnet' })

describe('Balance.calculateUsdBalance', () => {
  it('should return no usd balance for empty positions', async () => {
    lnmarkets.futuresGetTrades = vi.fn(() => {
      return Promise.resolve([])
    })

    expect.assertions(1)
    let balanceUsd = await calculateUsdBalance({ lnmarkets })
    expect(balanceUsd).toBe(0)
  })

  it('should return no usd balance for positions', async () => {
    lnmarkets.futuresGetTrades = vi.fn(() => {
      return Promise.resolve([createPosition({})])
    })

    expect.assertions(1)
    let balanceUsd = await calculateUsdBalance({ lnmarkets })
    expect(balanceUsd).toBe(0)
  })

  it('should return usd balance for position', async () => {
    lnmarkets.futuresGetTrades = vi.fn(() => {
      return Promise.resolve([
        createPosition({
          side: 's',
          market_wi: 'filled',
          margin_wi: 'running',
          quantity: 1,
        }),
      ])
    })

    expect.assertions(1)
    let balanceUsd = await calculateUsdBalance({ lnmarkets })
    expect(balanceUsd).toBe(1)
  })

  it('should return usd balance for multiple positions', async () => {
    lnmarkets.futuresGetTrades = vi.fn(() => {
      return Promise.resolve([
        createPosition({
          side: 's',
          market_wi: 'filled',
          margin_wi: 'running',
          quantity: 1,
        }),
        createPosition({
          side: 's',
          market_wi: 'filled',
          margin_wi: 'running',
          quantity: 5,
        }),
      ])
    })

    expect.assertions(1)
    let balanceUsd = await calculateUsdBalance({ lnmarkets })
    expect(balanceUsd).toBe(6)
  })
})
