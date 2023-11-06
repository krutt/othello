/* ~~/src/types/LNMarketsRest.ts */

// imports
import { DepositParams } from '@/types/DepositParams'
import { DepositResult } from '@/types/DepositResult'
import { FuturesCloseTradeResult } from '@/types/FuturesCloseTradeResult'
import { FuturesGetTradesParams } from '@/types/FuturesGetTradesParams'
import { FuturesGetTradesResult } from '@/types/FuturesGetTradesResult'
import { FuturesNewTradeParams } from '@/types/FuturesNewTradeParams'
import { FuturesNewTradeResult } from '@/types/FuturesNewTradeResult'
import { Network } from '@/types/Network'
import { Ticker } from '@/types/Ticker'
import { UserInfo } from '@/types/UserInfo'
import { WithdrawParams } from '@/types/WithdrawParams'
import { WithdrawResult } from '@/types/WithdrawResult'

export interface LNMarketsRest {
  key?: string
  secret?: string
  network?: Network
  version?: string
  customHeaders?: Record<string, string>
  fullResponse?: boolean
  passphrase?: string
  skipApiKey?: boolean
  debug?: boolean

  // constructor(options: LNMarketsOptions)
  futuresCloseTrade(id: string): Promise<FuturesCloseTradeResult>
  futuresGetTicker(): Promise<Ticker>
  futuresGetTrades(params?: FuturesGetTradesParams): Promise<FuturesGetTradesResult>
  futuresNewTrade(params?: FuturesNewTradeParams): Promise<FuturesNewTradeResult>
  userDeposit(params: DepositParams): Promise<DepositResult>
  userGet(): Promise<UserInfo>
  userWithdraw(params: WithdrawParams): Promise<WithdrawResult>
}

export default LNMarketsRest
