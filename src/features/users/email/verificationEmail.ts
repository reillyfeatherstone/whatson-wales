import type { Account } from '@/payload-types'

type VerificationEmailArgs = {
  req?: unknown
  token: string
  user: Partial<Account>
}

export function VerificationEmailSubject(_args: VerificationEmailArgs) {
  return `Please verify your email address!`
}

export function VerificationEmailHTML(args: VerificationEmailArgs) {
  return `<div>
    <h2>Hi${args.user.firstName ? ` ${args.user.firstName}` : ''},</h2>
    <h3>Welcome to What's On Wales | Cymru</h3>
    <p>Thanks for registering for an account with us.</p>
    <p>Please verify your email address by click the below button</p>
    <a href=${process.env.DOMAIN_URL}/account/verify?token=${args.token} style="font-weight:700;border:none;outline:none;background-color:#016630;color:#fff;border-radius:18px;font-size:16px;padding:18px 32px 18px">Verify your email</a>
    <p>Alternatively, if you're having any issues with the button. Please use the below link:</p>
    <p>${process.env.DOMAIN_URL}/account/verify?token=${args.token}</p>
  </div>`
}
