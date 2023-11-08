/* ~~/tests/incognito.spec.ts */

// imports
import { Network } from '@/types'
import { Othello } from '@/index'
import { beforeAll, describe, expect, it } from 'vitest'
import { Decoded, bech32 } from 'bech32'
import { randomBytes } from 'node:crypto'

// On first usage, generate a secret for the backend LnMarkets account.
let lnmSecret: string
let network: Network
let othello: Othello

beforeAll(() => {
  lnmSecret = randomBytes(16).toString('hex')
  network = 'mainnet' // test on production
})

describe('Register an incognito account via lnURL', () => {
  it('Creates a testnet account on LNMarkets.com', async () => {
    expect(typeof othello).toBe('undefined')
    othello = new Othello({ lnmSecret, network })
    expect(typeof othello).toBe('object')
  })
})

describe('Login to newly created account', () => {
  it('Logs in to testnet account created on LNMarkets.com', async () => {
    await othello.login()
  })
})

describe('Fetches balance for newly created incognito account', () => {
  it('Retrieves and displays user balance for newly generated account', async () => {
    let { balanceBtc, balanceUsd, btcEquivalent, usdEquivalent } = await othello.fetchBalances()
    expect(balanceBtc).toBeTypeOf('number')
    expect(balanceBtc).toBeGreaterThanOrEqual(0.0)
    expect(balanceUsd).toBeTypeOf('number')
    expect(balanceUsd).toBeGreaterThanOrEqual(0.0)
    expect(btcEquivalent).toBeTypeOf('string')
    expect(btcEquivalent.length).toBeGreaterThan(0)
    expect(btcEquivalent).toMatch(/^\d+.\d{8}/i)
    expect(usdEquivalent).toBeTypeOf('string')
    expect(usdEquivalent.length).toBeGreaterThan(0)
    expect(usdEquivalent).toMatch(/^\d+.\d{2}/i)
  })
})

describe('Fetches on-chain deposit address from LNMarkets.com', () => {
  it('Retrieves testnet on-chain deposit address', async () => {
    let address: string = await othello.fetchDepositAddress({type: 'on-chain', amountSats: null})
    expect(address).toBeTruthy()
    expect(address).toBeTypeOf('string')
    expect(address.length).toBe(42)  // standard on-chain address length
    expect(address.slice(0, 3)).toBe('bc1')
    let decoded: Decoded = bech32.decode(address)
    expect(decoded.prefix).toBeTruthy()
    expect(decoded.prefix).toBeTypeOf('string')
    expect(decoded.prefix.length).toBe(2)
    expect(decoded.prefix).toBe('bc')
    expect(decoded.words).toBeTruthy()
    expect(decoded.words).toBeInstanceOf(Array<number>)
    expect(decoded.words.length).toBe(33)
  })
})

describe('Fetches lightning invoice from LNMarkets.com', () => {
  it('Retrieves testnet bolt11 deposit invoice', async () => {
    let bolt11: string = await othello.fetchDepositAddress({type: 'bolt11', amountSats: 1})
    expect(bolt11).toBeTruthy()
    expect(bolt11).toBeTypeOf('string')
    expect(bolt11.length).toBe(343)
    expect(bolt11.slice(0, 4)).toBe('lnbc')  // mainnet
  })
})

describe('Fetches invalid lightning invoices from LNMarket.com', () => {

  it('Attempts to retrieve testnet bolt11 deposit address with zero-amount', async () => {
    await othello.fetchDepositAddress({type: 'bolt11', amountSats: 0})
      .catch(err => {
        expect(err.message).toBeTruthy()
        expect(err.message).toBeTypeOf('string')
        expect(err.message.length).toBeGreaterThan(0)
        expect(err.message).toBe('amountSats is required and cannot be 0')
      })
  })

  it('Attempts to retrieve testnet bolt11 deposit address with negative amount', async () => {
    await othello.fetchDepositAddress({type: 'bolt11', amountSats: -1})
      .catch(err => {
        expect(err.message).toBeTruthy()
        expect(err.message).toBeTypeOf('string')
        expect(err.message.length).toBeGreaterThan(0)
        expect(err.message).toBe('{"message":"Internal error","code":"INTERNAL_SERVER_ERROR"}')
      })
  })
})
