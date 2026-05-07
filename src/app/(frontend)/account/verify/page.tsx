import { getPayload } from 'payload'
import config from '@payload-config'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

type SearchParams = {
  [key: string]: string
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  return (
    <Suspense>
      <VerifyComponent searchParams={searchParams} />
    </Suspense>
  )
}

export async function VerifyComponent({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const { token } = await searchParams
  const payload = await getPayload({ config })

  if (!token) {
    redirect(
      `/account/login?${encodeURIComponent('No verification token found')}`,
    )
  } else {
    try {
      const result = await payload.verifyEmail({
        collection: 'accounts',
        token,
      })

      if (result) {
        redirect(
          `/login?message${encodeURIComponent('Successfully verified. Please login.')}`,
        )
      }
    } catch (error) {
      return (
        <div>
          <h1>There was a problem</h1>
          <p>Please contact an admin</p>
        </div>
      )
    }
  }
}
