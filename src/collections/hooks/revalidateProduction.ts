import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload'
import { revalidateTag, revalidatePath } from 'next/cache'
import type { Production } from '@/payload-types'

export const revalidateProductionPageOnChange: CollectionAfterChangeHook<
  Production
> = async ({ doc, req: { payload } }) => {
  const productionPath = `/productions/${doc.slug}`
  payload.logger.info(`Revalidating ${productionPath} after production change`)
  // revalidatePath(productionPath)
  try {
    revalidateTag('production_' + doc.slug)
  } catch (error) {
    payload.logger.error(
      `Error updating cache tag for production ${doc.slug}: ${error}`,
    )
  }

  return doc
}

export const revalidateProductionPageOnDelete: CollectionAfterDeleteHook<
  Production
> = async ({ doc, req: { payload } }) => {
  const productionPath = `/productions/${doc.slug}`
  payload.logger.info(`Revalidating ${productionPath} after production delete`)
  // revalidatePath(productionPath)
  try {
    revalidateTag('production_' + doc.slug)
  } catch (error) {
    payload.logger.error(
      `Error updating cache tag for production ${doc.slug}: ${error}`,
    )
  }

  return doc
}

// export const revalidateHomePageOnChange: CollectionAfterChangeHook<
//   Production
// > = async ({ doc, req: { payload } }) => {
//   const productionPath = `/`
//   payload.logger.info(`Revalidating Home Page after production change`)
//   revalidatePath(productionPath)

//   return doc
// }

// export const revalidateHomePageOnDelete: CollectionAfterDeleteHook<
//   Production
// > = async ({ doc, req: { payload } }) => {
//   const productionPath = `/`
//   payload.logger.info(`Revalidating Home Page after production delete`)
//   revalidatePath(productionPath)

//   return doc
// }

export const revalidateHomePageOnChange: CollectionAfterChangeHook<
  Production
> = async ({ doc, req: { payload } }) => {
  try {
    revalidatePath('/')
  } catch (error) {
    payload.logger.error(
      `Error updating cache tag for home page after production change: ${error}`,
    )
  }

  return doc
}

export const revalidateHomePageOnDelete: CollectionAfterDeleteHook<
  Production
> = async ({ doc, req: { payload } }) => {
  try {
    revalidatePath('/')
  } catch (error) {
    payload.logger.error(
      `Error updating cache tag for home page after production delete: ${error}`,
    )
  }

  return doc
}
