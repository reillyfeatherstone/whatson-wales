import type { Account } from '@/payload-types'

type ResetPasswordEmailArgs = {
  req?: unknown
  token?: string
  user?: Partial<Account>
}

export function ResetPasswordEmailSubject(_args?: ResetPasswordEmailArgs) {
  return `Reset your password`
}

export function ResetPasswordEmailHTML(args?: ResetPasswordEmailArgs) {
  if (!args) {
    throw new Error('Unable to generate reset token')
  }
  return `<div>
  <h3>Hi${args?.user?.firstName ? ` ${args.user.firstName}` : ''},</h3>
  <p>To reset your password, please press the below link:</p>
    <a href=${process.env.DOMAIN_URL}/account/forgot?token=${args?.token} style="">Reset Password</a>
  </div>`
}
