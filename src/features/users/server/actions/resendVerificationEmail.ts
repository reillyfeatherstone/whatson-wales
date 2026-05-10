'use server'

import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@payload-config'
import {
  generateEmailSubject,
  generateEmailHTML,
} from '@/features/users/email/verificationEmail'

export async function resendVerificationEmail(email: string) {
  if (!email) {
    return { success: false, error: 'Email is required.' }
  }

  const payload = await getPayload({ config })

  const { docs: users } = await payload.find({
    collection: 'accounts',
    where: { email: { equals: email } },
  })

  if (!users.length) {
    return { success: false, error: 'No account found with that email.' }
  }

  const user = users[0]

  if (user._verified) {
    return { success: false, error: 'This account is already verified.' }
  }

  const token = crypto.randomBytes(20).toString('hex')

  await payload.update({
    collection: 'accounts',
    id: user.id,
    data: { _verificationToken: token },
  })

  await payload.sendEmail({
    from: `"What's On Wales | Cymru" <noreply@whatson.wales>`,
    to: email,
    subject: generateEmailSubject({ token, user }),
    html: generateEmailHTML({ token, user }),
  })

  return { success: true }
}
