/* ~~/src/types/FuturesGetTradesParams.ts */

export interface FuturesGetTradesParams {
  type: 'open' | 'running' | 'closed'
  from?: number
  to?: number
  limit?: number
}

export default FuturesGetTradesParams
