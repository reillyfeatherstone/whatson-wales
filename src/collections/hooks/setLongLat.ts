import type { CollectionBeforeChangeHook } from 'payload'
import getCoordinates from '@/lib/getCoordinates'

export const setLongLat: CollectionBeforeChangeHook = async ({ data, originalDoc }) => {
  const postcode = data?.address?.postcode
  const previousPostcode = originalDoc?.address?.postcode

  if (!postcode || postcode === previousPostcode) return data

  const coordinates = await getCoordinates(postcode)

  if (coordinates) {
    data.address.venueLat = parseFloat(coordinates.lat)
    data.address.venueLong = parseFloat(coordinates.long)
  } else {
    console.error('Postcode geocoding failed:', postcode)
  }

  return data
}
