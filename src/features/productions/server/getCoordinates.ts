import * as z from 'zod'

const postcodeAPISchema = z.object({
  status: z.literal(200),
  result: z.object({
    longitude: z.number(),
    latitude: z.number(),
  }),
})

export default async function getCoordinates(postcode: string) {
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${postcode.replace(/\s/g, '')}`,
    )
    const data: unknown = await res.json()
    const parsedData = postcodeAPISchema.safeParse(data)
    if (!parsedData.success) {
      return null
    } else {
      return {
        lat: parsedData.data.result.latitude.toString(),
        long: parsedData.data.result.longitude.toString(),
      }
    }
  } catch {
    return null
  }
}
