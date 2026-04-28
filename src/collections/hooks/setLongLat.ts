import type { CollectionBeforeChangeHook } from 'payload'

export const setLongLat: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const postcode = data?.address?.postcode
  const previousPostcode = originalDoc?.address?.postcode

  // Only fetch if postcode exists and has changed
  if (!postcode || postcode === previousPostcode) return data

  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, '')}`)
    const json = await res.json()

    if (json.status === 200) {
      data.address.venueLat = json.result.latitude
      data.address.venueLong = json.result.longitude
    }
  } catch (err) {
    console.error('Postcode geocoding failed:', err)
  }

  return data
}
