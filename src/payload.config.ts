import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
// import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Header } from '@/app/(frontend)/globals/header/config'
import { Productions } from '@/collections/Productions'
import { s3Storage } from '@payloadcms/storage-s3'
import { Footer } from '@/app/(frontend)/globals/footer/config'
import { Venues } from '@/collections/Venues'
import { Accounts } from '@/collections/Accounts'
import { ProductionCompanies } from '@/collections/ProductionCompanies'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  globals: [Header, Footer],
  collections: [Accounts, ProductionCompanies, Productions, Venues, Pages, Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [
    s3Storage({
      enabled: Boolean(process.env.S3_BUCKET),
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: 'auto',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
  bin: [
    {
      scriptPath: path.resolve(dirname, 'seed.ts'),
      key: 'seed',
    },
  ],
})
