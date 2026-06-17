'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { usePatientStore, type ClinicalRecord, type Patient } from '@/src/patient_store/use_patient_store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'

// Mifflin-St Jeor equation for GEB calculation
const calculateGEB = (weight: number, height: number, age: number, gender: 'male' | 'female'): number => {
  const base = (10 * weight) + (6.25 * height) - (5 * age)
  return gender === 'male' ? base + 5 : base - 161
}

// Calculate GET = GEB * PA + (GEB * 0.1)
const calculateGET = (geb: number, pa: number): number => {
  return (geb * pa) + (geb * 0.1)
}

// Calculate macro grams from calories and percentages
const calculateMacroGrams = (calories: number, proteinPercent: number, carbsPercent: number, fatsPercent: number) => {
  const proteinCals = (calories * proteinPercent) / 100
  const carbsCals = (calories * carbsPercent) / 100
  const fatsCals = (calories * fatsPercent) / 100
  
  return {
    proteins_g: Math.round(proteinCals / 4),
    carbs_g: Math.round(carbsCals / 4),
    lipids_g: Math.round(fatsCals / 9),
    calories: Math.round(calories)
  }
}

// Get macro percentages from a record
const getMacroPercentages = (record: ClinicalRecord): { protein: number, carbs: number, fats: number } => {
  const totalCals = record.macros.calories
  const proteinPercent = (record.macros.proteins_g * 4) / totalCals * 100
  const carbsPercent = (record.macros.carbs_g * 4) / totalCals * 100
  const fatsPercent = (record.macros.lipids_g * 9) / totalCals * 100
  
  return {
    protein: Math.round(proteinPercent),
    carbs: Math.round(carbsPercent),
    fats: Math.round(fatsPercent)
  }
}

interface MacroSuggestion {
  newCalories: number
  proteins_g: number
  carbs_g: number
  lipids_g: number
  percentages: { protein: number, carbs: number, fats: number }
}

export default function SeguimientoPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string
  const { patients, addNewRecord } = usePatientStore()
  
  const patient = patients.find(p => p.id === patientId)
  const lastRecord = patient?.records?.[patient.records.length - 1]

  const [weight, setWeight] = useState<number | ''>(lastRecord?.weight || '')
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState<Array<{ date: string, text: string }>>(
    lastRecord?.notes ? [{ date: new Date(lastRecord.date).toLocaleDateString(), text: lastRecord.notes }] : []
  )

  const previousMacroPercentages = useMemo(() => {
    return lastRecord ? getMacroPercentages(lastRecord) : { protein: 0, carbs: 0, fats: 0 }
  }, [lastRecord])

  // Calculate suggested macros based on weight change
  const macroSuggestion = useMemo<MacroSuggestion | null>(() => {
    if (!lastRecord || weight === '' || !patient) return null

    const newWeight = Number(weight)
    const newGEB = calculateGEB(newWeight, lastRecord.height, lastRecord.age, patient.gender)
    const newGET = calculateGET(newGEB, lastRecord.pa)
    
    const previousPercentages = getMacroPercentages(lastRecord)
    const newMacros = calculateMacroGrams(newGET, previousPercentages.protein, previousPercentages.carbs, previousPercentages.fats)

    return {
      newCalories: newGET,
      proteins_g: newMacros.proteins_g,
      carbs_g: newMacros.carbs_g,
      lipids_g: newMacros.lipids_g,
      percentages: previousPercentages
    }
  }, [weight, lastRecord, patient])

  const hasWeightChange = weight !== '' && lastRecord && Number(weight) !== lastRecord.weight

  const handleAddNote = () => {
    if (notes.trim()) {
      const today = new Date().toLocaleDateString()
      setSavedNotes([...savedNotes, { date: today, text: notes }])
      setNotes('')
    }
  }

  const handleRemoveNote = (index: number) => {
    setSavedNotes(savedNotes.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (!patient || weight === '' || !macroSuggestion) return

    const newRecord: ClinicalRecord = {
      id: `record-${Date.now()}`,
      date: new Date().toISOString(),
      weight: Number(weight),
      height: lastRecord?.height || 0,
      age: lastRecord?.age || 0,
      gebAverage: calculateGEB(Number(weight), lastRecord?.height || 0, lastRecord?.age || 0, patient.gender),
      get: macroSuggestion.newCalories,
      pa: lastRecord?.pa || 1.2,
      macros: {
        proteins_g: macroSuggestion.proteins_g,
        carbs_g: macroSuggestion.carbs_g,
        lipids_g: macroSuggestion.lipids_g,
        calories: macroSuggestion.newCalories,
        amount_g: macroSuggestion.proteins_g + macroSuggestion.carbs_g + macroSuggestion.lipids_g
      },
      notes: savedNotes.map(n => `[${n.date}] ${n.text}`).join('\n')
    }

    addNewRecord(patientId, newRecord)
    router.push('/dashboard/patients')
  }

  if (!patient || !lastRecord) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Card className="border-border bg-card w-96">
          <CardContent className="pt-8 pb-8 text-center">
            <p className="text-muted-foreground mb-4">Paciente no encontrado o sin registros previos</p>
            <Button onClick={() => router.back()} className="w-full">
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
          <p className="text-sm text-muted-foreground">Seguimiento Clínico</p>
        </div>
      </div>

      {/* Main Layout: Left (History) | Right (Input Form) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL - Clinical History */}
        <div className="space-y-4">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Última Consulta</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {new Date(lastRecord.date).toLocaleDateString('es-ES', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Antropometría */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Antropometría</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Peso (kg)</p>
                    <p className="text-lg font-bold text-foreground">{lastRecord.weight}</p>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Altura (cm)</p>
                    <p className="text-lg font-bold text-foreground">{lastRecord.height}</p>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">Edad (años)</p>
                    <p className="text-lg font-bold text-foreground">{lastRecord.age}</p>
                  </div>
                </div>
              </div>

              {/* GEB & GET */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Metabolismo</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">GEB (kcal/día)</p>
                    <p className="text-lg font-bold text-foreground">{Math.round(lastRecord.gebAverage)}</p>
                  </div>
                  <div className="p-3 bg-secondary/20 rounded-lg">
                    <p className="text-xs text-muted-foreground">GET (kcal/día)</p>
                    <p className="text-lg font-bold text-foreground">{Math.round(lastRecord.get)}</p>
                    <p className="text-xs text-muted-foreground mt-1">PA: {lastRecord.pa}</p>
                  </div>
                </div>
              </div>

              {/* Macros */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Plan Nutricional</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <p className="text-xs text-muted-foreground">Proteína</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-bold text-foreground">{lastRecord.macros.proteins_g}g</p>
                      <p className="text-xs text-primary">{previousMacroPercentages.protein}%</p>
                    </div>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg border border-orange-500/20">
                    <p className="text-xs text-muted-foreground">Carbohidratos</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-bold text-foreground">{lastRecord.macros.carbs_g}g</p>
                      <p className="text-xs text-orange-600">{previousMacroPercentages.carbs}%</p>
                    </div>
                  </div>
                  <div className="p-3 bg-green-600/10 rounded-lg border border-green-600/20">
                    <p className="text-xs text-muted-foreground">Grasas</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-lg font-bold text-foreground">{lastRecord.macros.lipids_g}g</p>
                      <p className="text-xs text-green-700">{previousMacroPercentages.fats}%</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes History */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Historial de Notas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {savedNotes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Sin notas registradas</p>
                ) : (
                  savedNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-secondary/10 rounded-lg border border-border">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{note.date}</p>
                      <p className="text-sm text-foreground">{note.text}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT PANEL - Input Form */}
        <div className="space-y-4">
          {/* Antropometría Input */}
          <Card className="border-primary/30 bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Nueva Medición</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Peso (kg)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value ? Number(e.target.value) : '')}
                  placeholder={lastRecord.weight.toString()}
                  className="bg-secondary/20 border-primary/30 focus:border-primary"
                />
              </div>
            </CardContent>
          </Card>

          {/* Macro Suggestion */}
          {hasWeightChange && macroSuggestion && (
            <Card className="border-amber-500/50 bg-amber-50/5">
              <CardHeader>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <CardTitle className="text-lg">Sugerencia de Macros</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      Basado en el cambio de peso
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Comparison */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-secondary/20 rounded">
                    <span className="text-sm text-muted-foreground">GET Anterior</span>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{Math.round(lastRecord.get)}</span>
                      <span className="text-xs text-muted-foreground">kcal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-primary/10 rounded border border-primary/30">
                    <span className="text-sm text-primary font-medium">GET Sugerido</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">{macroSuggestion.newCalories}</span>
                      <span className="text-xs text-primary">kcal</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center pt-2">
                    {macroSuggestion.newCalories > lastRecord.get ? (
                      <div className="flex items-center gap-1 text-green-600 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        {macroSuggestion.newCalories - Math.round(lastRecord.get)} kcal más
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <TrendingDown className="w-4 h-4" />
                        {Math.round(lastRecord.get) - macroSuggestion.newCalories} kcal menos
                      </div>
                    )}
                  </div>
                </div>

                {/* Macro Table */}
                <div className="space-y-2 pt-4 border-t border-border">
                  <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-muted-foreground">
                    <div>Macro</div>
                    <div className="text-right">Anterior</div>
                    <div className="text-right">Sugerido</div>
                    <div className="text-right">%</div>
                  </div>
                  
                  {/* Protein */}
                  <div className="grid grid-cols-4 gap-2 p-2 bg-primary/5 rounded border border-primary/20">
                    <div className="text-sm font-medium text-foreground">Proteína</div>
                    <div className="text-right text-sm text-foreground">{lastRecord.macros.proteins_g}g</div>
                    <div className="text-right text-sm font-semibold text-foreground">{macroSuggestion.proteins_g}g</div>
                    <div className="text-right text-xs font-medium text-primary">{macroSuggestion.percentages.protein}%</div>
                  </div>

                  {/* Carbs */}
                  <div className="grid grid-cols-4 gap-2 p-2 bg-orange-500/5 rounded border border-orange-500/20">
                    <div className="text-sm font-medium text-foreground">Carbohidratos</div>
                    <div className="text-right text-sm text-foreground">{lastRecord.macros.carbs_g}g</div>
                    <div className="text-right text-sm font-semibold text-foreground">{macroSuggestion.carbs_g}g</div>
                    <div className="text-right text-xs font-medium text-orange-600">{macroSuggestion.percentages.carbs}%</div>
                  </div>

                  {/* Fats */}
                  <div className="grid grid-cols-4 gap-2 p-2 bg-green-600/5 rounded border border-green-600/20">
                    <div className="text-sm font-medium text-foreground">Grasas</div>
                    <div className="text-right text-sm text-foreground">{lastRecord.macros.lipids_g}g</div>
                    <div className="text-right text-sm font-semibold text-foreground">{macroSuggestion.lipids_g}g</div>
                    <div className="text-right text-xs font-medium text-green-700">{macroSuggestion.percentages.fats}%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notes Input */}
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Notas Clínicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Agregar observaciones clínicas..."
                className="bg-secondary/20 border-border focus:border-primary resize-none"
                rows={4}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddNote}
                className="w-full border-primary/50 text-primary hover:bg-primary/5"
                disabled={!notes.trim()}
              >
                Agregar Nota
              </Button>

              {/* Added Notes Preview */}
              {savedNotes.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground">Notas de esta consulta:</p>
                  {savedNotes.map((note, idx) => (
                    <div key={idx} className="flex items-start gap-2 p-2 bg-secondary/10 rounded text-sm">
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground font-medium">{note.date}</p>
                        <p className="text-foreground">{note.text}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveNote(idx)}
                        className="text-destructive hover:bg-destructive/10 h-6 w-6 p-0 flex-shrink-0"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={weight === '' || !macroSuggestion}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold h-11"
          >
            Guardar Nueva Consulta
          </Button>

          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full border-border"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  )
}
