/* ~~/src/lnmarkets.ts */

// imports
import { LNMarketsRest, Network } from '@/types'
import { URL, URLSearchParams } from 'node:url'
import { bech32 } from 'bech32'
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
  let cookie = await fetchNewCookie({ secret, network })
  return createRestClient({ headers: { Cookie: cookie }, network })
}

async function fetchNewCookie({ secret, network }: { secret: string; network: Network }) {
  let host = `api${network === 'testnet' ? '.testnet' : ''}.lnmarkets.com/v1`
  let response = await fetch(`https://${host}/lnurl/auth`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
  })
  // console.log(response)

  let cookie = response.headers.get('set-cookie')
  if (cookie == null || cookie === '') {
    throw new Error('No cookie returned')
  }

  let { lnurl, k1 } = (await response.json()) as { lnurl: string; k1: string }
  let limit = 1023
  let decoded = bech32.decode(lnurl, limit)
  let httpString = Buffer.from(bech32.fromWords(decoded.words)).toString()
  let url = new URL(httpString)
  let secretKey = createHash('sha256').update(`${url.host}:${secret}`).digest()

  let publicKey = publicKeyCreate(secretKey)
  publicKeyVerify(publicKey)
  let message = Buffer.from(url.searchParams.get('k1') ?? '', 'hex')
  let { signature } = ecdsaSign(message, secretKey)

  let hmac = url.searchParams.get('hmac') ?? ''
  let key = Buffer.from(publicKey).toString('hex')
  let sig = Buffer.from(signatureExport(signature)).toString('hex')

  let params = new URLSearchParams({
    key,
    sig,
    hmac,
    k1,
    tag: 'login',
    jwt: 'false',
    referral: 'othello',
  })
  let loginResponse = await fetch(`https://${host}/lnurl/auth?${params.toString()}`, {
    headers: { Cookie: cookie },
  })
  if (!loginResponse.ok) {
    throw new Error('Login failed')
  }
  return cookie
}

// function isCookieExpired(cookie: string) {
// 	let expiry = Date.parse(
// 		cookie
// 			.split('; ')
// 			.find(property => property.startsWith('Expires='))
// 			.substring(8) // Length of Expires=, to only get the date.
// 	)
// 	let now = Date.now()
// 	return now > expiry
// }

export default init
