/* ~~/src/types/WithdrawParams.ts */

export interface WithdrawParams {
  amount?: number
  invoice: string
  unit?: 'sat'
}

export default WithdrawParams
