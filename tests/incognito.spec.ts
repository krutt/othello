/* ~~/tests/incognito.spec.ts */

// imports
import { Network } from '@/types'
import { Othello } from '@/index'
import { beforeAll, describe, expect, it } from 'vitest'
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
    console.log(await othello.fetchBalances())
  })
})
