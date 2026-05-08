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
    <Suspense fallback="loading...">
      <Verify searchParams={searchParams} />
    </Suspense>
  )
}

export async function Verify({ searchParams }: { searchParams: SearchParams }) {
  const { token } = await searchParams
  const payload = await getPayload({ config })

  if (!token) {
    redirect(
      `/account/login?message=${encodeURIComponent('No verification token found')}`,
    )
  } else {
    const result = await payload.verifyEmail({
      collection: 'accounts',
      token,
    })

    if (result) {
      redirect(
        `/account/login?message=${encodeURIComponent('Successfully verified. Please Login.')}`,
      )
    } else {
      return (
        <div>
          <h1>There was a problem</h1>
          <p>Please contant an admin.</p>
        </div>
      )
    }
  }
}
