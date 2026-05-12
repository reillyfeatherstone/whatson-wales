import { Field, FieldLabel } from '@/components/ui/field'

export default function NewProductionForm() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Production</h1>
      <h2 className="text-base font-base text-muted-foreground">
        Describe your production
      </h2>
      <Field>
        <FieldLabel className=""></FieldLabel>
      </Field>
    </div>
  )
}
