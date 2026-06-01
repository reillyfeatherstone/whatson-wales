'use client'

import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/utils/cn'
import { useState } from 'react'

export function DatePicker({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Button>) {
  const [date, setDate] = useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className={cn(
            'w-53 justify-between text-left font-normal data-[empty=true]:text-muted-foreground',
            className,
          )}
          {...props}
        >
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={date}
        />
      </PopoverContent>
      <input
        type="hidden"
        name={props.name}
        value={date?.toISOString() ?? ''}
      />
    </Popover>
  )
}
