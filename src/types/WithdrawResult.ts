/* ~~/src/types/WithdrawResult.ts */

export interface WithdrawResult {
  amount: number
  fees: number
  id: string
  payment_hash: string
  payment_secret: string
}

export default WithdrawResult
