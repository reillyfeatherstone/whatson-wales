'use client'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PreviewCard } from '@/features/dashboard/components/preview-card'
import ImageUploader, {
  ImageState,
} from '@/features/productions/components/ImageUploader'
import { ChevronRight } from 'lucide-react'
import { useState } from 'react'

export default function NewProductionForm() {
  const [prodTitle, setProdTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState<ImageState | null>(null)
  const [mainCTA, setMainCTA] = useState('')

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Production</h1>
      <h2 className="text-base font-base text-muted-foreground">
        Describe your production
      </h2>

      <div className="flex gap-10 justify-between">
        <div className="left-form w-125 pt-10 flex flex-col gap-5">
          <Field>
            <FieldLabel htmlFor="prod_title" className="text-base">
              Production Name
            </FieldLabel>
            <Input
              name="prod_title"
              id="prod_title"
              onChange={(e) => setProdTitle(e.target.value)}
              className="h-9 text-sm! rounded-none"
              placeholder="The title of your show"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="summary" className="text-base">
              Summary
            </FieldLabel>
            <Textarea
              name="summary"
              id="summary"
              onChange={(e) => setSummary(e.target.value)}
              className="h-18 text-sm! rounded-none"
              maxLength={130}
              placeholder="Describe your show in a few words"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="main_cta" className="text-base">
              Link to Show
            </FieldLabel>
            <FieldDescription className="text-sm">
              People are less likely to attend if not set
            </FieldDescription>
            <Input
              name="main_cta"
              id="main_cta"
              onChange={(e) => setMainCTA(e.target.value)}
              className="h-9 text-sm! rounded-none"
              placeholder="Enter a URL to your website or ticket sales page"
            />
          </Field>
          <div>
            <FieldLabel className="text-base mb-1">Production Image</FieldLabel>
            <FieldDescription className="text-sm">
              This image is also used for the production page
            </FieldDescription>
            <ImageUploader image={image} setImage={setImage} />
          </div>
          <Button
            size="lg"
            className="text-base h-10 flex justify-center hover:cursor-pointer"
            disabled={true}
          >
            Next <ChevronRight />
          </Button>
        </div>
        <div className="right-preview">
          <PreviewCard
            image={image?.objectUrl || ''}
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
