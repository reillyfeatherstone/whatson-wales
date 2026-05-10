import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, { message: 'Minimum 8 characters long' })
  .max(64, { message: 'Maximum 64 characters' })
  .regex(/[a-zA-Z]/, { message: 'Must contain atleast one letter' })
  .regex(/[0-9]/, { message: 'Must contain atleast one number' })

export const registerFormSchema = z
  .object({
    firstName: z.string().min(1, { message: 'Please enter first name' }),
    lastName: z.string().min(1, { message: 'Please enter last name' }),
    email: z.email({ message: 'Please enter a valid email' }),
    password: passwordSchema,
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
  password: passwordSchema,
})
