/* ~~/src/types/UserInfo.ts */

export interface UserInfo {
  address: string
  uid: string
  balance: number
  account_type: 'lnurl' | 'credentials' | 'joule'
  username: string
  linkingpublickey: string
}

export default UserInfo
