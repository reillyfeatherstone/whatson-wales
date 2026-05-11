import { z } from 'zod'

export const passwordSchema = z
  .string()
  .min(8, { message: 'Minimum 8 characters long' })
  .max(64, { message: 'Maximum 64 characters' })
  .regex(/[a-z]/, { message: 'Include atleast one lowercase letter' })
  .regex(/[A-Z]/, { message: 'Include atleast one uppercase letter' })
  .regex(/[0-9]/, { message: 'Include atleast one number' })

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
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      })
    }
  })

export const resetPasswordSchema = z
  .object({
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
  email: z.email('please enter a valid email address.'),
  password: z.string('please enter a valid password'),
})
