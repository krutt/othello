/* ~~/example/credentials.ts */

// imports
import { Othello } from '@krutt/othello'
import { config } from 'dotenv'

async function main() {
  let othello: Othello = new Othello({ lnmSecret: process.env.LNM_API_SECRET })
  await othello.login()
  await othello.fetchBalances().then(console.log)
  // await othello.swap({ from: 'btc', to: 'usd', amountUsd: 10 }).then(console.log)
  // await othello.fetchBalances().then(console.log)
}

config({ path: '.env.example' })
main()
