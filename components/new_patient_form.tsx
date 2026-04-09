'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { BMRCalculator } from '@/components/bmr_calculator'
import { GETCalculator } from "@/components/get_calculator";
import { PatientHistoryForm } from "@/components/patient_history_form";
import { MacronutrientCalculator, type MacroData } from "@/components/macronutrient_calculator";
import { ChevronDown } from 'lucide-react'
import { usePatientStore, type PatientHistory, ClinicalRecord } from '@/src/patient_store/use_patient_store'


interface PatientData {
  name: string
  gender: 'male' | 'female' | null
  email: string
  phone: string
  notes: string
  patientHistory?: PatientHistory
  weight?: number
  height?: number
  age?: number
  gebAverage?: number
  get?: number
  pa?: number
  macros?: any
}

interface NewPatientFormProps {
  onPatientCreated?: () => void
}

export function NewPatientForm({ onPatientCreated }: NewPatientFormProps = {}) {
  const router = useRouter()
  const [step, setStep] = useState<"gender" | "form" | "history" | "bmr" | "get" | "macros" >("gender")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [patientData, setPatientData] = useState<PatientData>({
    name: "",
    gender: null,
    email: "",
    phone: "",
    notes: "",
    patientHistory: {
      medicalConditions: [],
      surgeries: [],
      dietaryRestrictions: [],
      allergies: [],
      preferences: [],
      otherNotes: "",
    }, 
    weight: 0,
    height: 0,
    age: 0,
    gebAverage: 0,
    get: 0,
    pa: 0,
    macros: null,
  })

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setPatientData({ ...patientData, gender })
    setStep('form')
  }

  const handleInputChange = (field: keyof PatientData, value: string) => {
    setPatientData({ ...patientData, [field]: value })
  }

  const handleChangeGender = () => {
    setStep('gender')
  }

  const handleHistoryChange = (history: PatientHistory) => {
    setPatientData({ ...patientData, patientHistory: history})
  }

  const handleBMRComplete = (weight: number, height: number, age: number, gebAverage: number) =>{
    setPatientData({ ...patientData, weight, height, age, gebAverage})
    setStep("get")
  }

  const handleGETComplete = (get: number, pa: number) => {
    setPatientData({ ...patientData, get, pa})
    setStep("macros")
  }

  const handleMacrosComplete = (macros: MacroData) => {
    setPatientData({ ...patientData, macros})
    handleSubmit({ ...patientData, macros})
  }

  const addPatient = usePatientStore((state) => state.addPatient)

  const handleSubmit = (data: PatientData = patientData) => {
    const patientId = crypto.randomUUID();
    const timestamp = new Date().toISOString();
    if (!data.name || !data.gender || !data.email) {
      alert("Por favor, ¡rellena todos los datos!")
       return
       }
    setIsSubmitting(true);
  try {
    // 1. Create the first clinical record (the "Initial Consultation")
    const initialRecord: ClinicalRecord = {
      id: crypto.randomUUID(),
      date: timestamp, // This fixes the "Invalid Date" issue
      weight: data.weight || 0,
      height: data.height || 0,
      age: data.age || 0,
      gebAverage: data.gebAverage || 0,
      get: data.get || 0,
      pa: data.pa || 0,
      macros: data.macros || {},
      notes: data.notes || "",
    };

    // 2. Add the patient using the NEW structure
    addPatient({
      id: patientId,
      name: data.name,
      gender: data.gender,
      email: data.email,
      phone: data.phone,
      notes: data.notes,
      createdAt: timestamp,
      records: [initialRecord], // Put the record inside the array!
    });

    console.log("Nuevo paciente creado con éxito.");
    
    // ... rest of your cleanup logic (resetting state, routing, etc.)
    setPatientData({
      name: "",
      gender: null,
      email: "",
      phone: "",
      notes: "",
      patientHistory: {
        medicalConditions: [],
        surgeries: [],
        dietaryRestrictions: [],
        allergies: [],
        preferences: [],
        otherNotes: "",
      }
    });
    
    if (onPatientCreated) {
      onPatientCreated();
    } else {
      router.push("/");
    }
  } catch (error) {
    console.error("Fallo al crear paciente nuevo:", error);
  } finally {
    setIsSubmitting(false);
  }
};

  if (step === 'gender') {
    return (
      <Card className="border-border bg-card max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-foreground">
            Register New Patient
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Select the patient's gender to get started
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => handleGenderSelect('male')}
              className="p-8 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="text-4xl mb-3">👨</div>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                Male
              </p>
            </button>
            <button
              onClick={() => handleGenderSelect('female')}
              className="p-8 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <div className="text-4xl mb-3">👩</div>
              <p className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                Female
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with Gender Badge */}
      <Card className="border-border bg-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Register New Patient
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-2">
              Fill in patient information and view BMR calculations
            </p>
          </div>
          <button
            onClick={handleChangeGender}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/20 transition-colors"
          >
            <Badge className="bg-primary text-primary-foreground">
              {patientData.gender === 'male' ? '👨 Male' : '👩 Female'}
            </Badge>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
        </CardHeader>
      </Card>

      {/* Patient Information Form */}
            {/* Step: Patient Information */}
      {step === 'form' && (
        <>
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium text-foreground">
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    placeholder="John Doe"
                    value={patientData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="bg-secondary/20 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email *
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={patientData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-secondary/20 border-border"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={patientData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-secondary/20 border-border"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Notes
                </label>
                <textarea
                  placeholder="Any additional notes about the patient..."
                  value={patientData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  className="w-full p-3 rounded-lg bg-secondary/20 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-none"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Patient History Section */}
          <PatientHistoryForm 
            onHistoryChange={handleHistoryChange}
            initialHistory={patientData.patientHistory}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button 
              variant="outline" 
              className="border-border"
              onClick={handleChangeGender}
            >
              Back
            </Button>
            <Button
              onClick={() => setStep('bmr')}
              disabled={!patientData.name || !patientData.email}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next: BMR Calculation
            </Button>
          </div>
        </>
      )}

          {/* Step: BMR Calculator */}
      {step === 'bmr' && patientData.gender && (
        <>
          <BMRCalculator gender={patientData.gender} onNext={handleBMRComplete} />
          <div className="flex gap-3 justify-between">
            <Button 
              variant="outline" 
              className="border-border"
              onClick={() => setStep('form')}
            >
              Back
            </Button>
          </div>
        </>
      )}

      {/* Step: GET Calculator */}
      {step === 'get' && patientData.gebAverage && (
        <>
          <GETCalculator gebAverage={patientData.gebAverage} onNext={handleGETComplete} />
          <div className="flex gap-3 justify-between">
            <Button 
              variant="outline" 
              className="border-border"
              onClick={() => setStep('bmr')}
            >
              Back
            </Button>
          </div>
        </>
      )}

      {/* Step: Macronutrient Calculator */}
      {step === 'macros' && patientData.get && patientData.weight && (
        <>
          <MacronutrientCalculator 
            get={patientData.get} 
            bodyWeight={patientData.weight}
            onNext={(calculatedMacros) => {
              const finalPatient ={
                ...patientData, macros: calculatedMacros, weight: patientData.weight!, get: patientData.get! 
              }
              setPatientData(finalPatient)
            handleSubmit(finalPatient)
            }}
          />
          <div className="flex gap-3 justify-between">
            <Button 
              variant="outline" 
              className="border-border"
              onClick={() => setStep('get')}
            >
              Back
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

  
