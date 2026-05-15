import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePatientStore, Patient, ClinicalRecord } from "@/src/patient_store/use_patient_store";
import { Plus, Pencil } from "lucide-react";

const activityLevels = [
  { value: "1.2", label: "Muy ligera" },
  { value: "1.375", label: "Ligera" },
  { value: "1.55", label: "Moderada" },
  { value: "1.725", label: "Intensa" },
  { value: "1.9", label: "Muy intensa" },
];

interface RecordFormState {
  weight: number;
  height: number;
  age: number;
  pa: number;
  notes: string;
  protein_g: number;
  carbs_g: number;
  lipids_g: number;
  calories: number;
}

interface PatientActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  mode: 'edit' | 'followup';
}

export function PatientActionDialog({ isOpen, onClose, patientId, mode }: PatientActionDialogProps) {
  const patients = usePatientStore((state) => state.patients);
  const updateLatestRecord = usePatientStore((state) => state.updateLastRecord);
  const addNewRecord = usePatientStore((state) => state.addNewRecord);

  const patient = patients.find((p) => p.id === patientId);
  
  // Get latest record, but it's okay if it's null (new patients)
  const latestRecord = patient?.records && patient.records.length > 0 
    ? patient.records[patient.records.length - 1] 
    : null;

  const [formData, setFormData] = useState<RecordFormState>({
    weight: 0,
    height: 0,
    age: 0,
    pa: 1.2,
    notes: "",
    protein_g: 0,
    carbs_g: 0,
    lipids_g: 0,
    calories: 0,
  });

  useEffect(() => {
    if (isOpen && patient) {
      setFormData({
        weight: latestRecord?.weight || 0,
        height: latestRecord?.height || 0,
        age: latestRecord?.age || 0,
        pa: latestRecord?.pa || 1.2,
        notes: mode === 'edit' ? (latestRecord?.notes || "") : "",
        protein_g: latestRecord?.macros?.proteins_g || 0,
        carbs_g: latestRecord?.macros?.carbs_g || 0,
        lipids_g: latestRecord?.macros?.lipids_g || 0,
        calories: latestRecord?.macros?.calories || 0,
      });
    }
  }, [isOpen, patient, latestRecord, mode]);

  // --- HELPER FUNCTIONS (The ones that went missing!) ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'notes' ? value : Number(value) 
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, pa: Number(value) }));
  };

  // --- DYNAMIC CALCULATIONS ---
  const calculateDynamicGEB = () => {
    if (!formData.weight || !formData.height || !formData.age) return latestRecord?.gebAverage || 0;
    const base = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age);
    // Use optional chaining for gender just in case
    return patient?.gender === "male" ? base + 5 : base - 161;
  };

  const currentGEB = Math.round(calculateDynamicGEB());
  const currentGET = Math.round(currentGEB * formData.pa); //+ currentGEB * 0.1);

  if (!patient) return null;

  const handleSubmit = () => {

    const finalProtein = formData.protein_g > 0 ? formData.protein_g : Math.round((currentGET * 0.20) / 4);
    const finalCarbs = formData.carbs_g > 0 ? formData.carbs_g : Math.round((currentGET * 0.50) / 4);
    const finalLipids = formData.lipids_g > 0 ? formData.lipids_g : Math.round((currentGET * 0.30) / 9);
    const finalCalories = formData.calories > 0 ? formData.calories : currentGET;

    const updatedRecordData: Omit<ClinicalRecord, 'id' | 'date'> = {
      weight: formData.weight,
      height: formData.height,
      age: formData.age,
      gebAverage: currentGEB,
      get: currentGET,
      pa: formData.pa,
      notes: formData.notes,
      macros: {
        proteins_g: finalProtein,
        carbs_g: finalCarbs,
        lipids_g: finalLipids,
        calories: finalCalories,
        amount_g: finalProtein + finalCarbs + finalLipids,
      },
    };

    if (mode === 'edit' && latestRecord) {
      updateLatestRecord(patientId, updatedRecordData);
    } else {
      // 2. THE FIX: Safe ID generation (Prevents silent crashes on local HTTP dev environments)
      const safeId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `record-${Date.now()}`;

      const newFollowupRecord: ClinicalRecord = {
        id: safeId,
        date: new Date().toISOString(),
        ...updatedRecordData,
      };
      addNewRecord(patientId, newFollowupRecord);
    }
    onClose();
  };

  const isEdit = mode === 'edit';
  const ActionIcon = isEdit ? Pencil : Plus;
  const dialogTitle = isEdit ? `Editar Datos Clínicos` : `Registrar Nuevo Seguimiento`;

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="max-w-2xl bg-card border-border overflow-hidden p-0 flex flex-col h-[90vh]">
      
      {/* 1. CONTAINED SCROLL AREA FIX */}
      <DialogHeader className="p-6 pb-4 border-b shrink-0">
        <DialogTitle className="flex items-center gap-2 text-foreground">
          <ActionIcon className={`w-5 h-5 ${isEdit ? 'text-secondary' : 'text-primary'}`} />
          {dialogTitle} - {patient.name}
        </DialogTitle>
      </DialogHeader>

      {/* 2. THE MAIN FORM CONTENT (Now contained and scrolling) */}
      <div className="grow overflow-y-auto p-6 space-y-8 pr-3">
        
        {/* TOP SECTION: Antropometría (Sidebar) & Metabolismo (Main) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* SIDEBAR: Antropometría */}
          <div className="md:col-span-1 space-y-4">
            <h4 className="text-sm font-semibold text-foreground border-b pb-1">Antropometría</h4>
            
            {/* WEIGHT & HEIGHT ROW */}
            <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="weight">Peso (kg)</Label>
                  <Input 
                    type="number" 
                    id="weight" 
                    name="weight" 
                    value={formData.weight || ""} 
                    onChange={handleInputChange} 
                    className="border border-border text-foreground h-10 px-2 bg-white rounded-md" 
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
                    className="border border-border text-foreground h-10 px-3 bg-white rounded-md" 
                    placeholder="0"
                  />
                </div>
            </div>
            
            {/* AGE ROW (Necessary for dynamic math) */}
            <div className="space-y-2">
                <Label htmlFor="age">Edad</Label>
                <Input 
                  type="number" 
                  id="age" 
                  name="age" 
                  value={formData.age || ""} 
                  onChange={handleInputChange} 
                  className="border border-border text-foreground h-10 px-3 bg-white rounded-md" 
                  placeholder="0"
                />
            </div>
          </div>

          {/* MAIN AREA: Metabolismo & Macros */}
          <div className="md:col-span-2 space-y-8">
            {/* Metabolismo */}
            <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
                <h4 className="text-sm font-semibold text-foreground border-b pb-1">Metabolismo</h4>
                <div className="space-y-2">
                  <Label>FA (Factor de Actividad)</Label>
                  <Select value={formData.pa.toString()} onValueChange={handleSelectChange}>
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
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="space-y-2">
                    <Label>GEB Promedio</Label>
                    <Input type="number" value={currentGEB} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
                  </div>
                  <div className="space-y-2">
                    <Label>GET (Kcal Totales)</Label>
                    <Input type="number" value={currentGET} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* --- FULL COMPARATIVE MACRO GRID --- */}
        <div className="space-y-4 pt-6 border-t border-dashed">
          <div className="flex items-center justify-between gap-3">
            <h4 className="text-sm font-semibold text-foreground">Objetivos de Macronutrientes</h4>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
              Comparativa vs. Consulta Anterior
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg items-center">
            {/* HEADERS */}
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Métrica</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase">Anterior (Ref)</div>
            <div className="text-[10px] font-bold text-primary uppercase">Sugerido (Calculado)</div>
            <div className="text-[10px] font-bold text-secondary uppercase">Nuevo Ajuste</div>

            {/* CALORIES ROW */}
            <div className="flex items-center text-sm font-medium">Calorías (kcal)</div>
            <div className="text-sm text-muted-foreground">{(latestRecord?.get || (latestRecord?.macros?.calories as any)?.get || 0).toFixed(2)}</div>
            <div className="text-sm font-bold text-primary">{currentGET}</div>
            <Input 
              type="number" 
              name="calories" 
              value={formData.calories === 0 ? "": formData.calories} 
              onChange={handleInputChange} 
              className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
              placeholder="0"
            />

            {/* PROTEIN ROW */}
            <div className="flex items-center text-sm font-medium">Proteína (g)</div>
            <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.proteins_g || (latestRecord?.macros as any)?.proteinGrams || 0).toFixed(1)}</div>
            <div className="text-sm font-bold text-primary">
              {Math.round((currentGET * 0.20) / 4)} 
            </div>
            <Input 
              type="number" 
              name="protein_g" 
              value={formData.protein_g === 0 ? "": formData.protein_g} 
              onChange={handleInputChange} 
              className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
              placeholder="0"
            />

            {/* CARBS ROW (Added Back) */}
            <div className="flex items-center text-sm font-medium">Carbos (g)</div>
            <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.carbs_g || (latestRecord?.macros as any)?.carbohydrateGrams || 0).toFixed(1)}</div>
            <div className="text-sm font-bold text-primary">
              {Math.round((currentGET * 0.50) / 4)}
            </div>
            <Input 
              type="number" 
              name="carbs_g" 
              value={formData.carbs_g === 0 ? "": formData.carbs_g} 
              onChange={handleInputChange} 
              className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
              placeholder="0"
            />

            {/* LIPIDS ROW (Added Back) */}
            <div className="flex items-center text-sm font-medium">Grasas (g)</div>
            <div className="text-sm text-muted-foreground">{(latestRecord?.macros?.lipids_g || (latestRecord?.macros as any)?.lipidGrams || 0).toFixed(1)}</div>
            <div className="text-sm font-bold text-primary">
              {Math.round((currentGET * 0.30) / 9)}
            </div>
            <Input 
              type="number" 
              name="lipids_g" 
              value={formData.lipids_g === 0 ? "": formData.lipids_g} 
              onChange={handleInputChange} 
              className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
              placeholder="0"
            />
          </div>
        </div>

        {/* --- NOTES SECTION (Added Back) --- */}
        <div className="space-y-4 pt-6 md:col-span-2">
            <Label htmlFor="notes" className="font-semibold text-sm">Notas e Historial de la Consulta</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes || ""} 
              onChange={handleInputChange} 
              placeholder="Escribe aquí las observaciones clínicas..." 
              className="h-32 border border-border bg-white rounded-md p-3 text-foreground" 
            />
        </div>

      </div>

      {/* 3. CONTAINED FOOTER */}
      <div className="flex justify-end gap-3 p-6 border-t border-border mt-auto shrink-0">
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} className={isEdit ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}>
            {isEdit ? "Actualizar Registro" : "Crear Nuevo Registro de Seguimiento"}
        </Button>
      </div>

    </DialogContent>
  </Dialog>
);
}