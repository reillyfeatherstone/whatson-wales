'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

type CreateParams = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type Response = {
  success: boolean
  error?: string
}

export async function create({
  email,
  password,
  firstName,
  lastName,
}: CreateParams): Promise<Response> {
  const payload = await getPayload({ config })
  try {
    const find = await payload.find({
      collection: 'accounts',
      where: {
        email: {
          equals: email,
        },
      },
    })

    if (find.totalDocs === 0) {
      try {
        await payload.create({
          collection: 'accounts',
          data: {
            email,
            password,
            firstName,
            lastName,
          },
        })

        return { success: true }
      } catch (e) {
        console.log(e)
        return { success: false, error: 'There was a problem creating the account' }
      }
    } else {
      return { success: false, error: 'Account already exists' }
    }
  } catch (e) {
    console.log('Signup error:', e)
    return { success: false, error: 'An error occurred' }
  }
}

// export async function create(state: Response | undefined, formData: FormData): Promise<Response> {
//   const validatedFields = registerFormSchema.safeParse({
//     firstName: formData.get('firstName'),
//     lastName: formData.get('lastName'),
//     email: formData.get('email'),
//     password: formData.get('pass'),
//     confirmPassword: formData.get('confirmPass'),
//   })

//   if (!validatedFields.success) {
//     const errors = z.treeifyError(validatedFields.error)
//     console.log(JSON.stringify(errors, null, 2))
//     return {
//       success: false,
//       errors,
//     }
//   } else {
//     return {
//       success: true,
//     }
//   }
// }
