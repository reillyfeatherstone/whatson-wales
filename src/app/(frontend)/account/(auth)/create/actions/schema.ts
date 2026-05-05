import { z } from 'zod'

export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Please enter first name' }),
    lastName: z.string().min(1, { message: 'Please enter last name' }),
    email: z.email({ message: 'Please enter a valid email' }),
    password: z
      .string()
      .min(8, { message: 'Minimum 8 characters long' })
      .max(64, { message: 'Maximum 64 characters' })
      .regex(/[a-zA-Z]/, { message: 'Must contain atleast one letter' })
      .regex(/[0-9]/, { message: 'Must contain atleast one number' }),
    confirmPassword: z.string().min(1, { message: 'Please re-enter password' }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match.',
        path: ['confirmPassword'],
      })
    }
  })

export const loginFormSchema = z.object({
  email: z.email('please ensure a valid email address.'),
  password: z
    .string()
    .min(8, 'Password must be atleast 8 characters.')
    .max(64, 'Password must be maximum 64 characters.'),
})
