'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Command, CommandGroup, CommandItem, CommandList } from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

type Selection = {
  value: string
  label: string
}

type MultiSelectProps = {
  options: Selection[]
  defaultSelected?: Selection[]
}

export function MultiSelect({ options, defaultSelected = [] }: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Selection[]>(defaultSelected)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback((selection: Selection) => {
    setSelected((prev) => prev.filter((s) => s.value !== selection.value))
  }, [])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current
    if (!input) return

    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (input.value === '') {
        setSelected((prev) => prev.slice(0, -1))
      }
    }

    if (e.key === 'Escape') {
      input.blur()
    }
  }, [])

  const selectables = options.filter((option) => !selected.some((s) => s.value === option.value))

  return (
    <Command onKeyDown={handleKeyDown} className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((selection) => (
            <Badge key={selection.value} variant="secondary" className="w-fit text-xs">
              {selection.label}
              <button
                className="ml-1 rounded-full outline-none"
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(selection)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Select..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 && (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover shadow-md">
              <CommandGroup>
                {selectables.map((option) => (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      setInputValue('')
                      setSelected((prev) => [...prev, option])
                    }}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          )}
        </CommandList>
      </div>
    </Command>
  )
}
