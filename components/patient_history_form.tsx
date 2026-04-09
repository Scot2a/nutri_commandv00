"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { PatientHistory } from "@/src/patient_store/use_patient_store";

interface PatientHistoryFormProps{
    onHistoryChange: (history: PatientHistory) => void
    initialHistory?: PatientHistory
}

export function  PatientHistoryForm({ onHistoryChange, initialHistory }: 
    PatientHistoryFormProps) {
        const [history, setHistory] = useState<PatientHistory>(
            initialHistory || {
                medicalConditions: [],
                surgeries: [],
                dietaryRestrictions: [],
                allergies: [],
                preferences: [],
                otherNotes: "",
            }
        )
        
          const [inputValues, setInputValues] = useState({
    medicalConditions: "",
    surgeries: "",
    dietaryRestrictions: "",
    allergies: "",
    preferences: "",
  })

  const addItem = (field: keyof Omit<PatientHistory, 'otherNotes'>) => {
    const value = inputValues[field].trim()
    if (value) {
      const updatedHistory = {
        ...history,
        [field]: [...history[field], value],
      }
      setHistory(updatedHistory)
      setInputValues({ ...inputValues, [field]: "" })
      onHistoryChange(updatedHistory)
    }
  }

  const removeItem = (field: keyof Omit<PatientHistory, 'otherNotes'>, index: number) => {
    const updatedHistory = {
      ...history,
      [field]: history[field].filter((_, i) => i !== index),
    }
    setHistory(updatedHistory)
    onHistoryChange(updatedHistory)
  }

  const handleNotesChange = (value: string) => {
    const updatedHistory = { ...history, otherNotes: value }
    setHistory(updatedHistory)
    onHistoryChange(updatedHistory)
  }

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: keyof Omit<PatientHistory, 'otherNotes'>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addItem(field)
    }
  }

  return (
    <Card className="border-border bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-foreground">
          Historia del paciente
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">
          Agrega información médica y estilo de vida del paciente.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Medical Conditions */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Condiciones médicas
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Diabetes, Hipertensión..."
              value={inputValues.medicalConditions}
              onChange={(e) =>
                setInputValues({ ...inputValues, medicalConditions: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, 'medicalConditions')}
              className="bg-secondary/20 border-border"
            />
            <Button
              onClick={() => addItem('medicalConditions')}
              variant="outline"
              className="border-border"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.medicalConditions.map((condition, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm text-foreground">{condition}</span>
                <button
                  onClick={() => removeItem('medicalConditions', index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Surgeries */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Cirugías previas
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Apendectomía, Bypass gástrico..."
              value={inputValues.surgeries}
              onChange={(e) =>
                setInputValues({ ...inputValues, surgeries: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, 'surgeries')}
              className="bg-secondary/20 border-border"
            />
            <Button
              onClick={() => addItem('surgeries')}
              variant="outline"
              className="border-border"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.surgeries.map((surgery, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm text-foreground">{surgery}</span>
                <button
                  onClick={() => removeItem('surgeries', index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Dietary Restrictions */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Restricciones dietéticas
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Vegetariano, Celíaco, Vegano..."
              value={inputValues.dietaryRestrictions}
              onChange={(e) =>
                setInputValues({ ...inputValues, dietaryRestrictions: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, 'dietaryRestrictions')}
              className="bg-secondary/20 border-border"
            />
            <Button
              onClick={() => addItem('dietaryRestrictions')}
              variant="outline"
              className="border-border"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.dietaryRestrictions.map((restriction, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm text-foreground">{restriction}</span>
                <button
                  onClick={() => removeItem('dietaryRestrictions', index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Alergias
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Mariscos, Leche..."
              value={inputValues.allergies}
              onChange={(e) =>
                setInputValues({ ...inputValues, allergies: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, 'allergies')}
              className="bg-secondary/20 border-border"
            />
            <Button
              onClick={() => addItem('allergies')}
              variant="outline"
              className="border-border"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.allergies.map((allergy, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 border border-destructive/20"
              >
                <span className="text-sm text-foreground">{allergy}</span>
                <button
                  onClick={() => removeItem('allergies', index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Preferencias y aversiones alimenticias
          </label>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="e.g., Preferencias por carnes gordas, no le gusta le brócoli..."
              value={inputValues.preferences}
              onChange={(e) =>
                setInputValues({ ...inputValues, preferences: e.target.value })
              }
              onKeyPress={(e) => handleKeyPress(e, 'preferences')}
              className="bg-secondary/20 border-border"
            />
            <Button
              onClick={() => addItem('preferences')}
              variant="outline"
              className="border-border"
            >
              Add
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {history.preferences.map((preference, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
              >
                <span className="text-sm text-foreground">{preference}</span>
                <button
                  onClick={() => removeItem('preferences', index)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Other Notes */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Notas adicionales
          </label>
          <textarea
            placeholder="Otra información relevante al estilo de vida o la salud..."
            value={history.otherNotes}
            onChange={(e) => handleNotesChange(e.target.value)}
            className="w-full p-3 rounded-lg bg-secondary/20 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
            rows={3}
          />
        </div>
      </CardContent>
    </Card>
  )
}

