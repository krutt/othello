/* ~~/src/types/UserInfo.ts */

export interface UserInfo {
  address: string
  uid: string
  balance: number
  account_type: 'lnurl' | 'credentials' | 'joule'
  username: string
  linkingpublickey: string
}

// {
//   uid: 'fb5202eb-47c8-4d4a-bdfc-0b9431f5a78b',
//   role: 'user',
//   balance: 0,
//   username: 'a8z8jm6ipm',
//   synthetic_usd_balance: 0,
//   linkingpublickey: '022be44145faae0b2b3556fa6f8569e4c71b074e3c7229f0cd3cf9d640775fc314',
//   show_leaderboard: true,
//   email_confirmed: false,
//   use_taproot_addresses: false,
//   account_type: 'lnurl',
//   auto_withdraw_enabled: false,
//   fee_tier: 0,
//   totp_enabled: false,
//   webauthn_enabled: false,
//   address: 'bc1qn4p489lqg9dy4nzjvvt9hpmr0c65qcp6fz7pzu',
//   metrics: {
//     futures: {
//       buy: [Object],
//       sell: [Object],
//       canceled_positions: 0,
//       carry_fees: 0,
//       closed_leverage: 0,
//       closed_margin: 0,
//       closed_pl: 0,
//       closed_positions: 0,
//       closed_quantity: 0,
//       open_margin: 0,
//       open_positions: 0,
//       open_quantity: 0,
//       positive_closed_positions: 0,
//       running_margin: 0,
//       running_positions: 0,
//       running_quantity: 0
//     },
//     options: {
//       call: [Object],
//       put: [Object],
//       closed_margin: 0,
//       closed_pl: 0,
//       closed_quantity: 0,
//       closed_trades: 0,
//       positive_closed_trades: 0,
//       running_margin: 0,
//       running_quantity: 0,
//       running_trades: 0
//     },
//     wallet: {
//       deposit_amount: 0,
//       deposit_count: 0,
//       deposit_success_count: 0,
//       withdrawal_amount: 0,
//       withdrawal_count: 0,
//       withdrawal_fees: 0,
//       withdrawal_success_count: 0
//     }
//   }
// }

// export default UserInfo
