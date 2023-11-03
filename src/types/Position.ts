/* ~~/src/types/Position.ts */

// imports
import { PositionSide } from '@/types/PositionSide'
import { PositionType } from '@/types/PositionType'
import { WorkingIndicator } from '@/types/WorkingIndicator'

export interface Position {
  canceled: boolean
  closed: boolean
  closed_ts: number | null
  creation_ts: number
  exit_price: number | null
  id: number
  leverage: number
  liquidation: number
  margin: number
  margin_wi: WorkingIndicator
  market_filled_ts: number | null
  market_wi: WorkingIndicator
  pid: string
  pl: number
  price: number
  quantity: number
  side: PositionSide
  sign: number
  stoploss: number | null
  stoploss_wi: WorkingIndicator
  sum_carry_fees: number
  takeprofit: number | null
  takeprofit_wi: WorkingIndicator
  type: PositionType
}

export default Position
