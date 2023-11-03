/* ~~/src/types/FuturesNewTradeResult.ts */

// imports
import { PositionSide } from '@/types/PositionSide'
import { PositionType } from '@/types/PositionType'
import { WorkingIndicator } from '@/types/WorkingIndicator'

export interface FuturesNewTradeResult {
  creation_ts: string
  id: string
  leverage: string
  liquidation: string
  margin: string
  margin_wi: WorkingIndicator
  market_filled_ts: string | null
  market_wi: WorkingIndicator
  pid: string
  pl: string
  price: string
  quantity: string
  side: PositionSide
  stoploss: string | null
  stoploss_wi: WorkingIndicator | null
  takeprofit: string | null
  takeprofit_wi: WorkingIndicator | null
  type: PositionType
}

export default FuturesNewTradeResult
