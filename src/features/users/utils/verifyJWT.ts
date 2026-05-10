import { jwtVerify } from 'jose'
import crypto from 'node:crypto'

function getPayloadJWTSecret() {
  const raw = process.env.PAYLOAD_SECRET!

  const derived = crypto
    .createHash('sha256')
    .update(raw)
    .digest('hex')
    .slice(0, 32)

  return new TextEncoder().encode(derived)
}

export async function verifyPayloadJWT(cookie: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(cookie, getPayloadJWTSecret())
    return payload
  } catch {
    return null
  }
}
