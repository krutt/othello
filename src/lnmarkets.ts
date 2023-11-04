/* ~~/src/lnmarkets.ts */

// imports
import { LNMarketsRest, Network, SupportedVersion } from '@/types'
import { URL, URLSearchParams } from 'node:url'
import { Decoded, bech32 } from 'bech32'
import { createHash } from 'crypto'
import { createRestClient } from '@ln-markets/api'
import { ecdsaSign, publicKeyCreate, publicKeyVerify, signatureExport } from 'secp256k1'

export async function init({
  secret,
  network = 'testnet',
}: {
  secret: string
  network: Network
}): Promise<LNMarketsRest> {
  if (secret == null || secret === '') {
    throw new Error('secret is required')
  }
  let cookie = await fetchNewCookie(secret, network)
  return createRestClient({ headers: { Cookie: cookie }, network })
}

async function fetchNewCookie(secret: string, network: Network, version: SupportedVersion = 'v2') {
  // fetch and parse
  let host: string = `${network !== 'testnet' ? 'api' : 'api.testnet'}.lnmarkets.com/${version}`
  let endpoint: string = `https://${host}/lnurl/auth`
  let response: Response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  })
  let cookie: string = response.headers.get('set-cookie')
  if (cookie == null || cookie === '') throw new Error('No cookie returned')
  let { lnurl, k1 } = (await response.json()) as { lnurl: string; k1: string }
  let limit: number = 1023
  let decoded: Decoded = bech32.decode(lnurl, limit)
  let authURL: URL = new URL(Buffer.from(bech32.fromWords(decoded.words)).toString())
  let secretKey: Buffer = createHash('sha256').update(`${authURL.host}:${secret}`).digest()
  let publicKey: Uint8Array = publicKeyCreate(secretKey)
  publicKeyVerify(publicKey)
  let message: Buffer = Buffer.from(authURL.searchParams.get('k1') ?? '', 'hex')
  let { signature }: { signature: Uint8Array } = ecdsaSign(message, secretKey)

  // define authentication parameters
  let key: string = Buffer.from(publicKey).toString('hex')
  let jwt: string = 'false'
  let hmac: string = authURL.searchParams.get('hmac') ?? ''
  let sig: string = Buffer.from(signatureExport(signature)).toString('hex')
  let tag: string = 'login'
  let referral: string = 'othello'
  let params: URLSearchParams = new URLSearchParams({ hmac, jwt, k1, key, sig, referral, tag })
  endpoint = `https://${host}/lnurl/auth?${params.toString()}`
  response = await fetch(endpoint, { headers: { Cookie: cookie }, method: 'POST' })
  if (!response.ok) throw new Error('Login failed')
  return cookie
}

export default init
