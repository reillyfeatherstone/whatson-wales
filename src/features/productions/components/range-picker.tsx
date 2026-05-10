'use client'

import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon, X } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePickerWithRange({
  value,
  onChange,
}: {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
}) {
  useEffect(() => {
    setDate(value)
  }, [value])

  const [date, setDate] = useState<DateRange | undefined>(value)

  return (
    <Field className="">
      <Popover>
        <PopoverTrigger className="date" asChild>
          <div className="flex justify-between h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none hover:bg-input/50 pr-1">
            <Button
              type="button"
              variant="outline"
              id="date-picker-range"
              className="justify-start h-8 border-0 bg-transparent rounded-none hover:bg-transparent"
            >
              <CalendarIcon />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                  </>
                ) : (
                  format(date.from, 'LLL dd, y')
                )
              ) : (
                <span className="px-2 text-sm md:text-xs">Pick a date range</span>
              )}
            </Button>
            {date?.from && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setDate(undefined)
                  onChange?.(undefined)
                }}
                className="ml-1 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={date}
            numberOfMonths={1}
            onSelect={(range, selectedDay) => {
              const hasStart = !!date?.from
              const hasEnd = !!date?.to

              let next: DateRange | undefined

              if (hasStart && hasEnd) {
                next = { from: selectedDay, to: undefined }
              } else if (!hasStart) {
                next = { from: selectedDay, to: undefined }
              } else {
                next = { from: date.from, to: selectedDay }
              }

              setDate(next)
              onChange?.(next)
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
