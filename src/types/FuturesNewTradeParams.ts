/* ~~/src/types/FuturesNewTradeParams */

// imports
import { PositionSide } from '@/types/PositionSide'
import { PositionType } from '@/types/PositionType'

export interface FuturesNewTradeParams {
  type: PositionType
  side: PositionSide
  margin?: number
  leverage: number
  quantity?: number
  takeprofit?: number
  stoploss?: number
  price?: number
}

export default FuturesNewTradeParams
