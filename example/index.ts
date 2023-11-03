/* ~~/example/index.ts */

// imports
import { Othello } from '@krutt/othello'

async function main() {
  const wallet = new Othello({
    lnmSecret: 'itsasecrettoeverybody',
  })
  await wallet.login()
  await wallet.fetchBalances().then(console.log)
  await wallet.swap({ from: 'btc', to: 'usd', amountUsd: 10 }).then(console.log)
  await wallet.fetchBalances().then(console.log)
}

main()
