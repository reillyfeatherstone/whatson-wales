'use client'

import { Button } from '@/components/ui/button'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxCollection,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PreviewCard } from '@/features/dashboard/components/preview-card'
import ImageUploader, {
  ImageState,
} from '@/features/productions/components/ImageUploader'
import { ProductionCompany } from '@/payload-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import { freqLanguages, Language, languages } from '@/utils/languages'

/*

2. Details
  Languages
  Full Description
3. Venues
  Venue Name
  Venue Date Range
  Venue-specific ticket link
4. Cast
  Name
  Role
5. Creatives
  Name
  Job title
6. Review & Publish

*/

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Show Details' },
]

export default function NewProductionForm({
  companies,
}: {
  companies: ProductionCompany[]
}) {
  const [currentStep, setCurrentStep] = useState(1)
  const [prodTitle, setProdTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState<ImageState | null>(null)
  const [mainCTA, setMainCTA] = useState('')
  const [prodCompanies, setProdCompanies] = useState<ProductionCompany[]>()
  const [runTime, setRunTime] = useState('')
  const [writer, setWriter] = useState('')
  const [prodLanguages, setProdLanguages] = useState<Language[]>()
  const companyAnchor = useComboboxAnchor()
  const languageAnchor = useComboboxAnchor()

  const next = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const previous = () => {
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold pb-3">Add New Production</h1>
      <div className="flex items-center">
        <div className="bg-primary w-8 h-8 text-white flex justify-center items-center rounded-4xl">
          {steps[currentStep - 1].id}
        </div>
        <div className="ml-3">
          <p className="text-xs">
            Step {steps[currentStep - 1].id} of {steps.length}
          </p>
          <h2 className="font-semibold">{steps[currentStep - 1].name}</h2>
        </div>
      </div>
      <h2 className="text-base font-base text-muted-foreground"></h2>

      {currentStep === 1 ? (
        <div className="flex gap-10 justify-between">
          <div className="left-form w-125 pt-10 flex flex-col gap-5">
            <Field>
              <FieldLabel htmlFor="prod_title" className="text-base">
                Production Name
                <span className="text-red-500 -ml-1 -mt-1">*</span>
              </FieldLabel>
              <Input
                name="prod_title"
                id="prod_title"
                onChange={(e) => setProdTitle(e.target.value)}
                className="h-9 text-sm! rounded-none"
                placeholder="The title of your show"
                value={prodTitle}
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
                value={summary}
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
                value={mainCTA}
              />
            </Field>
            <div>
              <FieldLabel className="text-base mb-1">
                Production Image
              </FieldLabel>
              <FieldDescription className="text-sm">
                This image is also used for the production page
              </FieldDescription>
              <ImageUploader image={image} setImage={setImage} />
            </div>
            <Button
              size="lg"
              className="text-base h-10 flex justify-center hover:cursor-pointer"
              onClick={() => next()}
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
      ) : (
        ''
      )}

      {currentStep === 2 ? (
        <div className="flex gap-10 justify-between">
          <div className="left-form w-125 pt-10 flex flex-col gap-5">
            <Field className="gap-1">
              <FieldLabel htmlFor="company" className="text-base">
                Production Company
              </FieldLabel>
              <FieldDescription className="text-sm">
                Leave empty to publish independently
              </FieldDescription>
              <Combobox
                multiple
                autoHighlight
                items={companies}
                onValueChange={(ids: string[]) => {
                  const selected = companies.filter((c) => ids.includes(c.id))
                  setProdCompanies(selected)
                }}
                value={prodCompanies?.map((c) => c.id) || []}
              >
                <ComboboxChips
                  ref={companyAnchor}
                  className="rounded-none min-h-9 py-1"
                >
                  <ComboboxValue>
                    {(values: string[]) => (
                      <>
                        {values.map((id) => {
                          const company = companies.find((c) => c.id === id)
                          return (
                            <ComboboxChip key={id} className="h-6 rounded-none">
                              {company?.productionCompany}
                            </ComboboxChip>
                          )
                        })}
                        <ComboboxChipsInput
                          id="company"
                          className="text-sm text-foreground placeholder:text-muted-foreground"
                          placeholder={
                            values.length === 0 ? 'Select a company' : ''
                          }
                        />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent
                  anchor={companyAnchor}
                  className="rounded-none"
                >
                  <ComboboxEmpty>No companies found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: ProductionCompany) => (
                      <ComboboxItem
                        key={item.id}
                        value={item.id}
                        className="rounded-none"
                      >
                        {item.productionCompany}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <Field>
              <FieldLabel htmlFor="run_time" className="text-base">
                Run Time
              </FieldLabel>
              <Input
                name="run_time"
                id="run_time"
                onChange={(e) => setRunTime(e.target.value)}
                className="h-9 text-sm! rounded-none"
                placeholder="Example: 1hr 30mins (incl. interval)"
                value={runTime}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="writer" className="text-base">
                Writer / Creator
              </FieldLabel>
              <Input
                name="writer"
                id="writer"
                onChange={(e) => setWriter(e.target.value)}
                className="h-9 text-sm! rounded-none"
                placeholder="Dylan Thomas"
                value={writer}
              />
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="languages" className="text-base">
                Language(s)
              </FieldLabel>
              <Combobox
                multiple
                autoHighlight
                items={languages}
                onValueChange={(ids: string[]) => {
                  const selected = ids
                    .map((id) => languages.find((l) => l.id === id))
                    .filter(Boolean) as Language[]
                  setProdLanguages(selected)
                }}
                value={prodLanguages?.map((c) => c.id) || []}
              >
                <ComboboxChips
                  ref={languageAnchor}
                  className="rounded-none min-h-9 py-1"
                >
                  <ComboboxValue>
                    {(values: string[]) => (
                      <>
                        {values.map((id) => {
                          const language = languages.find((l) => l.id === id)

                          return (
                            <ComboboxChip key={id} className="h-6 rounded-none">
                              {language?.value}
                            </ComboboxChip>
                          )
                        })}

                        <ComboboxChipsInput
                          id="languages"
                          className="text-sm text-foreground placeholder:text-muted-foreground"
                          placeholder={
                            values.length === 0 ? 'Select languages' : ''
                          }
                        />
                      </>
                    )}
                  </ComboboxValue>
                </ComboboxChips>
                <ComboboxContent
                  anchor={languageAnchor}
                  className="rounded-none"
                >
                  <ComboboxEmpty>No languages found.</ComboboxEmpty>
                  <ComboboxList>
                    <ComboboxGroup key="freq_lang" items={freqLanguages}>
                      <ComboboxLabel>Frequently Selected</ComboboxLabel>
                      <ComboboxCollection>
                        {(item: Language) => (
                          <ComboboxItem
                            key={item.id}
                            value={item.id}
                            className="rounded-none"
                          >
                            {item.value}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxGroup>

                    <ComboboxGroup key="all" items={languages}>
                      <ComboboxLabel>All Languages</ComboboxLabel>
                      <ComboboxCollection>
                        {(item: Language) => (
                          <ComboboxItem
                            key={item.id}
                            value={item.id}
                            className="rounded-none"
                          >
                            {item.value}
                          </ComboboxItem>
                        )}
                      </ComboboxCollection>
                    </ComboboxGroup>
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>
            <div className="flex w-full gap-2">
              <Button
                size="lg"
                variant="outline"
                className="flex-1 text-base h-10 flex justify-center hover:cursor-pointer"
                onClick={() => previous()}
              >
                <ChevronLeft /> Back
              </Button>
              <Button
                size="lg"
                className="flex-1 text-base h-10 flex justify-center hover:cursor-pointer"
                onClick={() => next()}
              >
                Next <ChevronRight />
              </Button>
            </div>
          </div>
          <div className="right-preview">
            {/* <PreviewCard
              image={image?.objectUrl || ''}
              title={prodTitle}
              summary={
                summary ||
                'A short description of the production that appears in listings and cards to give a quick overview before opening the full page.'
              }
            /> */}
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}
