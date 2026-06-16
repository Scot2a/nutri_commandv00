'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card" // Added CardFooter
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Trash2, Pencil, Plus, Mail, Phone, Calendar } from "lucide-react" 
import type { Patient } from "@/src/patient_store/use_patient_store"
import { PatientActionDialog } from "@/components/patient_action_dialog"
import { ClinicalEvolutionDialog } from "@/components/clinical_evolution" 

interface PatientsListProps {
  patients: Patient[]
  onDelete: (patientId: string) => void
  onUpdate: (patient: Patient) => void
}

export function PatientsList({ patients, onDelete, onUpdate }: PatientsListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isActionDialogOpen, setIsActionDialogOpen] = useState(false)
  const [isClinicalEvolutionOpen, setIsClinicalEvolutionOpen] = useState(false)
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)
  const [actionMode, setActionMode] = useState<"edit" | "followup">("edit")

  const openActionDialog = (patientId: string, mode: 'edit' | "followup") => {
    setSelectedPatientId(patientId)
    setActionMode(mode)
    setIsActionDialogOpen(true)
  }

  const openClinicalEvolution = (patientId: string) => {
    setSelectedPatientId(patientId)
    setIsClinicalEvolutionOpen(true)
  }

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (patientId: string) => {
    if (confirm('Are you sure you want to delete this patient?')) {
      onDelete(patientId)
    }
  }

  if (patients.length === 0) {
    return (
      <Card className="border-border bg-card">
        <CardContent className="pt-12 pb-12 text-center">
          <p className="text-muted-foreground mb-4">Sin pacientes registrados</p>
          <p className="text-sm text-muted-foreground">
            Haga click en "Nuevo paciente" para agregar un registro nuevo
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Buscar pacientes</label>
          <Input
            placeholder="Búsqueda por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-secondary/20 border-border"
          />
        </div>

        {filteredPatients.length === 0 ? (
          <Card className="border-border bg-card">
            <CardContent className="pt-8 pb-8 text-center">
              <p className="text-muted-foreground">No patients match your search</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPatients.map((patient) => {
              const createdDate = new Date(patient.createdAt).toLocaleDateString()
              return (
                <Card key={patient.id} className="relative border-border bg-card hover:border-primary/50 transition-colors flex flex-col">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(patient.id)}
                    className="absolute top-2 right-2 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 z-10"
                    aria-label={`Eliminar a ${patient.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-foreground truncate">{patient.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className="mt-2 capitalize"
                          style={{
                            backgroundColor: patient.gender === 'male' ? '#38bdf820' : '#fb718520',
                            color: patient.gender === 'male' ? '#38bdf8' : '#fb7185',
                            borderColor: patient.gender === 'male' ? '#38bdf8' : '#fb7185',
                          }}
                        >
                          {patient.gender}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 grow">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-foreground truncate">{patient.email}</span>
                    </div>

                    {patient.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground">{patient.phone}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">Última consulta: {createdDate}</span>
                    </div>

                    {patient.notes && (
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground line-clamp-2">{patient.notes}</p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="grid grid-cols-3 gap-2 border-t pt-4 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-2 border-primary/50 text-primary hover:bg-primary/5 text-xs"
                      onClick={() => openClinicalEvolution(patient.id)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Nueva Consulta
                    </Button>

                    <Button 
                      variant="outline" 
                      size="sm"
                      className="gap-2 border-primary/50 text-primary hover:bg-primary/5 text-xs"
                      onClick={() => openActionDialog(patient.id, 'followup')}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Seguimiento
                    </Button>

                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="gap-2 bg-secondary/20 hover:bg-secondary/30 text-xs"
                      onClick={() => openActionDialog(patient.id, 'edit')}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Editar
                    </Button>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {isActionDialogOpen && selectedPatientId && (
        <PatientActionDialog
          isOpen={isActionDialogOpen}
          patientId={selectedPatientId}
          mode={actionMode}
          onClose={() => setIsActionDialogOpen(false)}
        />
      )}

      {isClinicalEvolutionOpen && selectedPatientId && (
        <ClinicalEvolutionDialog
          isOpen={isClinicalEvolutionOpen}
          patientId={selectedPatientId}
          onClose={() => setIsClinicalEvolutionOpen(false)}
        />
      )}
    </>
  )
}
