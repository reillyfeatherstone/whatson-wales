'use client'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PreviewCard } from '@/features/dashboard/components/preview-card'
import { UploadIcon } from 'lucide-react'
import { useState } from 'react'

export default function NewProductionForm() {
  const [prodTitle, setProdTitle] = useState('')
  const [summary, setSummary] = useState('')

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Production</h1>
      <h2 className="text-base font-base text-muted-foreground">
        Describe your production
      </h2>

      <div className="flex gap-10">
        <div className="left-form pt-10 w-[75%] flex flex-col gap-5">
          <Field>
            <FieldLabel>Production Name</FieldLabel>
            <Input
              name="prod_title"
              onChange={(e) => setProdTitle(e.target.value)}
              className="h-8 max-w-100"
            />
          </Field>
          <Field>
            <FieldLabel>Summary</FieldLabel>
            <Input
              name="prod_title"
              onChange={(e) => setSummary(e.target.value)}
              className="h-8 max-w-100"
            />
          </Field>
          <div>
            <FieldLabel>Production Image</FieldLabel>
            <div className="mt-2 flex flex-col max-w-100 border border-gray-400 border-dotted rounded-md px-5 py-10 text-center items-center gap-4">
              <UploadIcon size={32} />
              <div className="">
                <p className="text-base">
                  Drag & Drop or Choose file to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Max Upload - 5MB
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-preview w-[25%]">
          <PreviewCard
            title={prodTitle}
            summary={
              summary ||
              'A short description of the production that appears in listings and cards to give a quick overview before opening the full page.'
            }
          />
        </div>
      </div>
    </div>
  )
}
