/* ~~/src/index.ts */

// imports
import { Currency, LNMarketsRest, Network } from '@/types'
import { fetchDepositAddress } from '@/deposit'
import { fetchUserBalances } from '@/balance'
import { init as lnmarketsInit } from '@/lnmarkets'
import { send } from '@/send'
import { swap } from '@/swap'

export class Othello {
  network: Network
  lnmSecret: string
  lnmarkets: LNMarketsRest | undefined = undefined

  constructor({ lnmSecret, network = 'testnet' }: { lnmSecret: string; network?: Network }) {
    this.lnmSecret = lnmSecret
    this.network = network
  }

  isLoggedIn() {
    return Boolean(this.lnmarkets)
  }

  async login() {
    this.lnmarkets = await lnmarketsInit({
      secret: this.lnmSecret,
      network: this.network,
    })
  }

  async fetchDepositAddress({
    type,
    amountSats,
  }: {
    type: 'bolt11' | 'on-chain'
    amountSats: number
  }) {
    if (!this.lnmarkets) {
      throw new Error('login() needs to be called first')
    }
    return fetchDepositAddress({
      type,
      amountSats,
      lnmarkets: this.lnmarkets,
    })
  }

  async fetchBalances() {
    if (!this.lnmarkets) {
      throw new Error('login() needs to be called first')
    }
    return fetchUserBalances({ lnmarkets: this.lnmarkets })
  }

  async swap({ from, to, amountUsd }: { from: Currency; to: Currency; amountUsd: number }) {
    if (!this.lnmarkets) {
      throw new Error('login() needs to be called first')
    }
    return swap({
      from,
      to,
      amountUsd,
      lnmarkets: this.lnmarkets,
    })
  }

  async send({
    type,
    address,
    amountSats,
  }: {
    type: 'bolt11' | 'on-chain'
    address: string
    amountSats: number
  }) {
    if (!this.lnmarkets) {
      throw new Error('login() needs to be called first')
    }
    return send({
      type,
      address,
      amountSats,
      lnmarkets: this.lnmarkets,
    })
  }
}

export default Othello
