/* ~~/src/types/LNMarketsOptions.ts */

// imports
import { Network } from '@/types/Network'

export interface LNMarketsOptions {
  key?: string
  secret?: string
  network?: Network
  version?: string
  customHeaders?: Record<string, string>
  fullResponse?: boolean
  passphrase?: string
  skipApiKey?: boolean
  debug?: boolean
}

export default LNMarketsOptions
