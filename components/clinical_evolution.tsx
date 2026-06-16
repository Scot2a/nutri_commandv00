'use client'

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePatientStore, Patient, ClinicalRecord } from "@/src/patient_store/use_patient_store";
import { Plus, X, Calendar, TrendingDown, TrendingUp, Minus, Edit2 } from "lucide-react";

const activityLevels = [
  { value: "1.2", label: "Muy ligera" },
  { value: "1.375", label: "Ligera" },
  { value: "1.55", label: "Moderada" },
  { value: "1.725", label: "Intensa" },
  { value: "1.9", label: "Muy intensa" },
];

interface FollowupFormState {
  weight: number;
  height: number;
  age: number;
  pa: number;
  proteins_g: number;
  carbs_g: number;
  lipids_g: number;
  calories: number;
}

interface ClinicalEvolutionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
}

export function ClinicalEvolutionDialog({ isOpen, onClose, patientId }: ClinicalEvolutionDialogProps) {
  const patients = usePatientStore((state) => state.patients);
  const addNewRecord = usePatientStore((state) => state.addNewRecord);

  const patient = patients.find((p) => p.id === patientId);
  const latestRecord = patient?.records && patient.records.length > 0 
    ? patient.records[patient.records.length - 1] 
    : null;

  // STATE: Form data
  const [formData, setFormData] = useState<FollowupFormState>({
    weight: 0,
    height: 0,
    age: 0,
    pa: 1.2,
    proteins_g: 0,
    carbs_g: 0,
    lipids_g: 0,
    calories: 0,
  });

  // STATE: Notes timeline
  const [newNote, setNewNote] = useState("");
  const [notesHistory, setNotesHistory] = useState<Array<{ date: string; text: string }>>([]);

  // STATE: Active tab
  const [activeTab, setActiveTab] = useState<'follow-up' | 'notes'>('follow-up');

  // Initialize form with cloned latest record data
  React.useEffect(() => {
    if (isOpen && patient && latestRecord) {
      setFormData({
        weight: latestRecord.weight || 0,
        height: latestRecord.height || 0,
        age: latestRecord.age || 0,
        pa: latestRecord.pa || 1.2,
        proteins_g: 0,
        carbs_g: 0,
        lipids_g: 0,
        calories: 0,
      });

      // Parse notes history from latestRecord.notes if it exists
      if (latestRecord.notes) {
        // Assuming notes are stored with date prefixes like "[2024-01-15] Note content"
        const noteMatches = latestRecord.notes.match(/\[\d{4}-\d{2}-\d{2}\]\s+.+/g) || [];
        const parsed = noteMatches.map((note) => {
          const dateMatch = note.match(/\[(\d{4}-\d{2}-\d{2})\]/);
          const text = note.replace(/\[\d{4}-\d{2}-\d{2}\]\s+/, '');
          return { date: dateMatch?.[1] || '', text };
        });
        setNotesHistory(parsed);
      }
    }
  }, [isOpen, patient, latestRecord]);

  // HANDLERS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'notes' ? value : Number(value) 
    }));
  };

  const handleActivityLevelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, pa: Number(value) }));
  };

  const handleAddNote = () => {
    if (newNote.trim()) {
      const today = new Date().toISOString().split('T')[0];
      setNotesHistory([...notesHistory, { date: today, text: newNote }]);
      setNewNote("");
    }
  };

  const handleRemoveNote = (index: number) => {
    setNotesHistory(notesHistory.filter((_, i) => i !== index));
  };

  // CALCULATIONS
  const calculateDynamicGEB = () => {
    if (!formData.weight || !formData.height || !formData.age) return latestRecord?.gebAverage || 0;
    const base = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age);
    return patient?.gender === "male" ? base + 5 : base - 161;
  };

  const currentGEB = Math.round(calculateDynamicGEB());
  const currentGET = Math.round(currentGEB * formData.pa + currentGEB * 0.1);

  // COMPARISON LOGIC (Previous vs New)
  const comparison = {
    weight: {
      previous: latestRecord?.weight || 0,
      change: formData.weight - (latestRecord?.weight || 0),
    },
    gebAverage: {
      previous: latestRecord?.gebAverage || 0,
      change: currentGEB - (latestRecord?.gebAverage || 0),
    },
    get: {
      previous: latestRecord?.get || 0,
      change: currentGET - (latestRecord?.get || 0),
    },
  };

  if (!patient) return null;

  const handleSubmit = () => {
    // Merge all notes into a single notes string
    const combinedNotes = notesHistory
      .map((n) => `[${n.date}] ${n.text}`)
      .join("\n");

    const finalProtein = formData.proteins_g > 0 ? formData.proteins_g : Math.round((currentGET * 0.20) / 4);
    const finalCarbs = formData.carbs_g > 0 ? formData.carbs_g : Math.round((currentGET * 0.50) / 4);
    const finalLipids = formData.lipids_g > 0 ? formData.lipids_g : Math.round((currentGET * 0.30) / 9);
    const finalCalories = formData.calories > 0 ? formData.calories : currentGET;

    const safeId = typeof crypto !== 'undefined' && crypto.randomUUID 
      ? crypto.randomUUID() 
      : `record-${Date.now()}`;

    const newFollowupRecord: ClinicalRecord = {
      id: safeId,
      date: new Date().toISOString(),
      weight: formData.weight,
      height: formData.height,
      age: formData.age,
      gebAverage: currentGEB,
      get: currentGET,
      pa: formData.pa,
      notes: combinedNotes,
      macros: {
        proteins_g: finalProtein,
        carbs_g: finalCarbs,
        lipids_g: finalLipids,
        calories: finalCalories,
        amount_g: finalProtein + finalCarbs + finalLipids,
      },
    };

    addNewRecord(patientId, newFollowupRecord);
    onClose();
  };

  // Helper component: Trend indicator
  function TrendBadge({ value }: { value: number }) {
    if (value === 0) return <Minus className="w-4 h-4 text-muted-foreground" />;
    if (value > 0) return <TrendingUp className="w-4 h-4 text-destructive" />;
    return <TrendingDown className="w-4 h-4 text-primary" />;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-card border-border overflow-hidden p-0 flex flex-col h-[90vh]">
        
        {/* HEADER */}
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Plus className="w-5 h-5 text-primary" />
            Nueva Consulta de Seguimiento - {patient.name}
          </DialogTitle>
        </DialogHeader>

        {/* TABS */}
        <div className="flex gap-4 px-6 pt-4 border-b border-border shrink-0">
          <button
            onClick={() => setActiveTab('follow-up')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'follow-up'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Datos Clínicos
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'notes'
                ? 'text-primary border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Notas & Observaciones
          </button>
        </div>

        {/* CONTENT */}
        <div className="grow overflow-y-auto p-6 space-y-6 pr-3">
          
          {activeTab === 'follow-up' && (
            <div className="space-y-8">
              
              {/* COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase">Peso (kg)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{formData.weight || '—'}</span>
                      <span className="text-xs text-muted-foreground">Anterior: {comparison.weight.previous}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendBadge value={comparison.weight.change} />
                      <span className={`text-xs font-medium ${
                        comparison.weight.change < 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {comparison.weight.change > 0 ? '+' : ''}{comparison.weight.change.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase">GEB Promedio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-foreground">{currentGEB}</span>
                      <span className="text-xs text-muted-foreground">Anterior: {comparison.gebAverage.previous}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendBadge value={comparison.gebAverage.change} />
                      <span className={`text-xs font-medium ${
                        comparison.gebAverage.change < 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {comparison.gebAverage.change > 0 ? '+' : ''}{comparison.gebAverage.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs text-muted-foreground uppercase">GET (kcal)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">{currentGET}</span>
                      <span className="text-xs text-muted-foreground">Anterior: {comparison.get.previous}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendBadge value={comparison.get.change} />
                      <span className={`text-xs font-medium ${
                        comparison.get.change < 0 ? 'text-primary' : 'text-destructive'
                      }`}>
                        {comparison.get.change > 0 ? '+' : ''}{comparison.get.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* FORM DATA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* ANTROPOMETRÍA */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground border-b pb-2">Antropometría</h4>
                  
                  <div className="space-y-2">
                    <Label htmlFor="weight">Peso (kg)</Label>
                    <Input 
                      type="number" 
                      id="weight" 
                      name="weight" 
                      value={formData.weight || ""} 
                      onChange={handleInputChange} 
                      className="border border-border text-foreground h-10 bg-white rounded-md" 
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="height">Estatura (cm)</Label>
                    <Input 
                      type="number" 
                      id="height" 
                      name="height" 
                      value={formData.height || ""} 
                      onChange={handleInputChange} 
                      className="border border-border text-foreground h-10 bg-white rounded-md" 
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="age">Edad</Label>
                    <Input 
                      type="number" 
                      id="age" 
                      name="age" 
                      value={formData.age || ""} 
                      onChange={handleInputChange} 
                      className="border border-border text-foreground h-10 bg-white rounded-md" 
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* METABOLISMO */}
                <div className="md:col-span-2 space-y-4 bg-muted/20 p-4 rounded-lg">
                  <h4 className="text-sm font-semibold text-foreground border-b pb-2">Metabolismo</h4>
                  
                  <div className="space-y-2">
                    <Label>FA (Factor de Actividad)</Label>
                    <Select value={formData.pa.toString()} onValueChange={handleActivityLevelChange}>
                      <SelectTrigger className="w-full bg-white border border-border">
                        <SelectValue placeholder="Selecciona nivel" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-border">
                        {activityLevels.map((level) => (
                          <SelectItem key={level.value} value={level.value} className="text-sm">
                            {level.label} ({level.value})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label>GEB Promedio</Label>
                      <Input type="number" value={currentGEB} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
                    </div>
                    <div className="space-y-2">
                      <Label>GET Total (Kcal)</Label>
                      <Input type="number" value={currentGET} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
                    </div>
                  </div>
                </div>
              </div>

              {/* MACROS GRID */}
              <div className="space-y-4 pt-6 border-t border-dashed">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="text-sm font-semibold text-foreground">Objetivos de Macronutrientes</h4>
                  <Badge variant="outline" className="text-[10px]">
                    Comparativa vs. Consulta Anterior
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg items-center">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Métrica</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">Anterior</div>
                  <div className="text-[10px] font-bold text-primary uppercase">Sugerido</div>
                  <div className="text-[10px] font-bold text-secondary uppercase">Nuevo Ajuste</div>

                  {/* CALORIES */}
                  <div className="text-sm font-medium">Calorías (kcal)</div>
                  <div className="text-sm text-muted-foreground">{(latestRecord?.get || 0).toFixed(0)}</div>
                  <div className="text-sm font-bold text-primary">{currentGET}</div>
                  <Input 
                    type="number" 
                    name="calories" 
                    value={formData.calories === 0 ? "" : formData.calories} 
                    onChange={handleInputChange} 
                    className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
                    placeholder="0"
                  />

                  {/* PROTEIN */}
                  <div className="text-sm font-medium">Proteína (g)</div>
                  <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.proteins_g || 0).toFixed(1)}</div>
                  <div className="text-sm font-bold text-primary">{Math.round((currentGET * 0.20) / 4)}</div>
                  <Input 
                    type="number" 
                    name="proteins_g" 
                    value={formData.proteins_g === 0 ? "" : formData.proteins_g} 
                    onChange={handleInputChange} 
                    className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
                    placeholder="0"
                  />

                  {/* CARBS */}
                  <div className="text-sm font-medium">Carbos (g)</div>
                  <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.carbs_g || 0).toFixed(1)}</div>
                  <div className="text-sm font-bold text-primary">{Math.round((currentGET * 0.50) / 4)}</div>
                  <Input 
                    type="number" 
                    name="carbs_g" 
                    value={formData.carbs_g === 0 ? "" : formData.carbs_g} 
                    onChange={handleInputChange} 
                    className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
                    placeholder="0"
                  />

                  {/* LIPIDS */}
                  <div className="text-sm font-medium">Grasas (g)</div>
                  <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.lipids_g || 0).toFixed(1)}</div>
                  <div className="text-sm font-bold text-primary">{Math.round((currentGET * 0.30) / 9)}</div>
                  <Input 
                    type="number" 
                    name="lipids_g" 
                    value={formData.lipids_g === 0 ? "" : formData.lipids_g} 
                    onChange={handleInputChange} 
                    className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="space-y-6">
              
              {/* NOTES HISTORY */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">Historial de Anotaciones</h4>
                  <Badge variant="secondary" className="text-xs">
                    {notesHistory.length} nota{notesHistory.length !== 1 ? 's' : ''}
                  </Badge>
                </div>

                {notesHistory.length > 0 ? (
                  <ScrollArea className="h-64 border border-border rounded-lg p-4 bg-muted/20">
                    <div className="space-y-4 pr-4">
                      {notesHistory.map((entry, idx) => (
                        <div key={idx} className="space-y-2 pb-4 border-b border-border last:border-b-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span className="text-xs font-medium text-foreground">{entry.date}</span>
                            </div>
                            <button
                              onClick={() => handleRemoveNote(idx)}
                              className="p-1 hover:bg-destructive/10 rounded transition-colors"
                              aria-label="Eliminar nota"
                            >
                              <X className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                          <p className="text-sm text-foreground">{entry.text}</p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="p-8 border border-dashed border-border rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Sin anotaciones aún</p>
                  </div>
                )}
              </div>

              {/* NEW NOTE INPUT */}
              <div className="space-y-3 pt-6 border-t border-border">
                <h4 className="text-sm font-semibold text-foreground">Nueva Anotación</h4>
                <Textarea 
                  value={newNote} 
                  onChange={(e) => setNewNote(e.target.value)} 
                  placeholder="Escribe las observaciones clínicas de esta consulta..." 
                  className="h-32 border border-border bg-white rounded-md p-3 text-foreground" 
                />
                <Button 
                  onClick={handleAddNote}
                  variant="outline"
                  className="gap-2 border-primary/50 text-primary hover:bg-primary/5"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Anotación
                </Button>
              </div>
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 p-6 border-t border-border mt-auto shrink-0">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" />
            Guardar Nueva Consulta
          </Button>
        </div>

      </DialogContent>
    </Dialog>
  );
}
