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
  ComboboxInput,
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
import { ProductionCompany, Venue } from '@/payload-types'
import { ChevronLeft, ChevronRight, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { freqLanguages, Language, languages } from '@/utils/languages'
import { Card } from '@/components/ui/card'
import { DatePicker } from '@/components/ui/date-picker'

const steps = [
  { id: 1, name: 'Basic Info' },
  { id: 2, name: 'Show Details' },
  { id: 3, name: 'Venues & Tour Dates' },
]

const NavButtons = ({
  onNext,
  onBack,
}: {
  onNext?: () => void
  onBack?: () => void
}) => (
  <div className="flex w-full gap-2">
    {onBack && (
      <Button
        size="lg"
        variant="outline"
        className="flex-1 text-base h-10 flex justify-center hover:cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft /> Back
      </Button>
    )}
    {onNext && (
      <Button
        size="lg"
        className="flex-1 text-base h-10 flex justify-center hover:cursor-pointer"
        onClick={onNext}
      >
        Next <ChevronRight />
      </Button>
    )}
  </div>
)

type TourEntry = {
  id: number
  venue: Venue
  fromDate?: Date
  toDate?: Date
  link?: string
}

export default function NewProductionForm({
  companies,
  venues,
}: {
  companies: ProductionCompany[]
  venues: Venue[]
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
  const [description, setDescription] = useState('')
  const [prodVenues, setProdVenues] = useState<TourEntry[]>([])

  const companyAnchor = useComboboxAnchor()
  const languageAnchor = useComboboxAnchor()
  const venueAnchor = useComboboxAnchor()

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
            <NavButtons onNext={next} />
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
            <Field>
              <FieldLabel htmlFor="description" className="text-base">
                Full Description
              </FieldLabel>
              <Textarea
                id="description"
                className="text-sm! rounded-none h-48 placeholder:text-sm resize-y!"
                placeholder="A coastal Welsh community holds onto its stories as the sea rises closer each day…"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </Field>
            <NavButtons onNext={next} onBack={previous} />
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

      {currentStep === 3 ? (
        <div className="flex gap-10 justify-between">
          <div className="left-form w-125 pt-10 flex">
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const venueName = data.get('venue')
                const selected = venues.find((v) => v.venueName === venueName)
                if (!selected) return
                setProdVenues((prev) => [
                  ...prev,
                  {
                    id: prev.length + 1,
                    venue: selected,
                    fromDate: data.get('venueFromDate')
                      ? new Date(data.get('venueFromDate') as string)
                      : undefined,
                    toDate: data.get('venueToDate')
                      ? new Date(data.get('venueToDate') as string)
                      : undefined,
                    link: data.get('venueLink') as string,
                  },
                ])
              }}
            >
              {/* <pre>{JSON.stringify(venues[0], null, 2)}</pre> */}
              <Card className="p-8 rounded-none shadow-md">
                <Field className="gap-1">
                  <FieldLabel htmlFor="venue" className="text-base">
                    Search Venue
                  </FieldLabel>
                  <Combobox autoHighlight items={venues}>
                    <ComboboxInput
                      id="venue"
                      name="venue"
                      className="h-9 rounded-none placeholder:text-sm"
                      placeholder="Select a venue"
                    />
                    <ComboboxContent
                      anchor={venueAnchor}
                      className="rounded-none"
                    >
                      <ComboboxEmpty>No venues found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item: Venue) => (
                          <ComboboxItem
                            key={item.id}
                            value={item.venueName}
                            className="rounded-none"
                          >
                            {item.venueName}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </Field>
                <Field>
                  <FieldLabel className="text-base">Run Dates</FieldLabel>
                  <div className="flex gap-3">
                    <DatePicker
                      id="venueFromDate"
                      name="venueFromDate"
                      className="h-8 text-xs bg-input/20 flex-1"
                    />
                    <span className="flex items-center">-</span>
                    <DatePicker
                      id="venueToDate"
                      name="venueToDate"
                      className="h-8 text-xs bg-input/20 flex-1"
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel htmlFor="venueLink" className="text-base">
                    Venue Ticket Link
                  </FieldLabel>
                  <Input
                    id="venueLink"
                    name="venueLink"
                    className="h-9 text-sm! rounded-none"
                    placeholder="https://example.co.uk/show-name"
                  />
                </Field>
                <Button
                  type="submit"
                  size="lg"
                  variant="default"
                  className="mt-2 h-9 hover:cursor-pointer"
                >
                  Add to Schedule
                </Button>
              </Card>
              <div className="flex flex-col gap-2">
                {prodVenues &&
                  prodVenues.map((venue) => (
                    <div
                      key={venue.id}
                      className="p-4 border rounded-none flex flex-row shadow-xs"
                    >
                      <div className="flex flex-col flex-1">
                        <h3 className="font-semibold">
                          {venue.venue.venueName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {venue.fromDate?.toLocaleDateString()} -{' '}
                          {venue.toDate?.toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-end items-center pr-2">
                        <button
                          onClick={() =>
                            setProdVenues((prev) =>
                              prev.filter((v) => v.id !== venue.id),
                            )
                          }
                        >
                          <Trash2Icon className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              <NavButtons onNext={next} onBack={previous} />
            </form>
          </div>
          <div className="right-preview"></div>
        </div>
      ) : (
        ''
      )}
    </div>
  )
}

/*

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
