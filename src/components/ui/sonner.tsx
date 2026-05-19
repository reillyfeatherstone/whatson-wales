'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from 'lucide-react'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',

          '--success-bg': 'oklch(0.4735 0.0877 163.65)',
          '--success-text': '#ffffff',
          '--success-border': 'oklch(0.42 0.08 163.65)',

          '--error-bg': 'oklch(0.49 0.16 26.0)',
          '--error-text': '#ffffff',
          '--error-border': 'oklch(0.42 0.14 26.0)',

          '--warning-bg': 'oklch(0.56 0.15 74.0)',
          '--warning-text': '#ffffff',
          '--warning-border': 'oklch(0.49 0.14 74.0)',

          '--info-bg': 'oklch(0.49 0.11 243.0)',
          '--info-text': '#ffffff',
          '--info-border': 'oklch(0.42 0.10 243.0)',
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
