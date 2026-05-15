'use client'
/*
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Patient } from '@/src/patient_store/use_patient_store'

interface EditPatientDialogProps {
  patient: Patient
  onClose: () => void
  onSave: (patient: Patient) => void
}

export function EditPatientDialog({ patient, onClose, onSave }: EditPatientDialogProps) {
  const [formData, setFormData] = useState(patient)
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: keyof Patient, value: string) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSave = () => {
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields')
      return
    }

    setIsSaving(true)
    try {
      onSave(formData)
      setIsSaving(false)
    } catch (error) {
      console.error('[v0] Error saving patient:', error)
      setIsSaving(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-md">
        <DialogHeader>
          <DialogTitle className="text-foreground">Edit Patient</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update patient information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
/*          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Patient name"
              className="bg-secondary/20 border-border"
            />
          </div>

          {/* Email */}
  /*        <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="patient@example.com"
              className="bg-secondary/20 border-border"
            />
          </div>

          {/* Phone */}
    /*      <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Phone</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="(123) 456-7890"
              className="bg-secondary/20 border-border"
            />
          </div>

          {/* Notes */}
      /*    <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              placeholder="Additional notes about the patient"
              className="w-full px-3 py-2 rounded-lg bg-secondary/20 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary min-h-24 resize-none"
            />
          </div>

          {/* Gender (Read-only) */}
        /*  <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Gender</label>
            <div className="px-3 py-2 rounded-lg bg-secondary/20 border border-border text-foreground capitalize">
              {formData.gender}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-border"
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!formData.name || !formData.email || isSaving}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
*/