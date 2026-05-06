import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ComponentProps } from 'react'

type InputProps = ComponentProps<typeof Input>

type FormFieldProps = InputProps & {
  label: string
  error?: string[]
}

export type FieldErrors = Record<string, string[]>

export function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  error,
  ...props
}: FormFieldProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-lg font-bold">
          {label}
        </Label>
        {error && <p className="text-red-500 text-xs">{error[0]}</p>}
      </div>
      <Input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        className={`h-10 bg-transparent rounded-none ${
          error ? 'border-red-500 placeholder:text-red-400' : 'border-[#AFAFAF]'
        }`}
        style={{ fontSize: '14px' }}
        {...props}
      />
    </div>
  )
}
