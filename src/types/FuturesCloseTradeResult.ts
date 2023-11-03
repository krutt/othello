/* ~~/src/types/FuturesCloseTradeResult.ts */

export interface FuturesCloseTradeResult {
  closed: boolean
  closed_ts: string | null
  exit_price: string
  pid: string
  pl: number
}

export default FuturesCloseTradeResult
