'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { type DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Field, FieldLabel } from '@/components/ui/field'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

export function DatePickerWithRange({
  onChange,
}: {
  onChange?: (range: DateRange | undefined) => void
}) {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined)

  return (
    <Field className="">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date-picker-range"
            className="justify-start h-8 border-0 border-b border-b-[#AFAFAF] bg-transparent rounded-none"
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

              setDate(next) // ✅ keeps UI working
              onChange?.(next) // ✅ informs parent
            }}
          />
        </PopoverContent>
      </Popover>
    </Field>
  )
}
