/* ~~/tests/utils/lnmarkets.ts */

// imports
import { Position, PositionSide, PositionType, WorkingIndicator } from '@/types'

export const createPosition = ({
  canceled = true,
  closed = true,
  closed_ts = 0,
  creation_ts = 0,
  exit_price = 0,
  id = 0,
  leverage = 0,
  liquidation = 0,
  margin = 0,
  margin_wi = 'filled' as WorkingIndicator,
  market_filled_ts = 0,
  market_wi = 'filled' as WorkingIndicator,
  pid = '0',
  pl = 0,
  price = 0,
  quantity = 0,
  side = 'b' as PositionSide,
  sign = 0,
  stoploss = 0,
  stoploss_wi = 'filled' as WorkingIndicator,
  sum_carry_fees = 0,
  takeprofit = 0,
  takeprofit_wi = 'filled' as WorkingIndicator,
  type = 'l' as PositionType,
}): Position => {
  return {
    canceled,
    closed,
    closed_ts,
    creation_ts,
    exit_price,
    id,
    leverage,
    liquidation,
    margin,
    margin_wi,
    market_filled_ts,
    market_wi,
    pid,
    pl,
    price,
    quantity,
    side,
    sign,
    stoploss,
    stoploss_wi,
    sum_carry_fees,
    takeprofit,
    takeprofit_wi,
    type,
  }
}
