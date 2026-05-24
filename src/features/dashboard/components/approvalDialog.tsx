'use client'

import { Button } from '@/components/ui/button'
import { ProductionCompany } from '@/payload-types'
import { AlertTriangle } from 'lucide-react'

export function ApprovalDialog({
  company,
  onConfirm,
  onCancel,
}: {
  company: ProductionCompany
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-background border border-border w-full max-w-sm p-6 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-amber-500 mt-0.5 shrink-0" size={20} />
          <div>
            <h3 className="font-semibold text-base">Approval required</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {`You're not a member of `}
              <span className="font-medium text-foreground">
                {company.productionCompany}
              </span>
              . Adding it will send a request to the company owner for approval
              before it appears publicly.
            </p>
          </div>
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline" size="sm" onClick={onCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={onConfirm}>
            Request approval
          </Button>
        </div>
      </div>
    </div>
  )
}
