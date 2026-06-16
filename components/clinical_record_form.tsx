import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClinicalRecord } from "@/src/patient_store/use_patient_store";

const activityLevels = [
  { value: "1.2", label: "Muy ligera" },
  { value: "1.375", label: "Ligera" },
  { value: "1.55", label: "Moderada" },
  { value: "1.725", label: "Intensa" },
  { value: "1.9", label: "Muy intensa" },
];

export interface RecordFormState {
  weight: number;
  height: number;
  age: number;
  pa: number;
  notes: string;
  proteins_g: number;
  carbs_g: number;
  lipids_g: number;
  calories: number;
}

interface ClinicalRecordFormProps {
  formData: RecordFormState;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onActivityLevelChange: (value: string) => void;
  latestRecord: ClinicalRecord | null;
  computedGEB: number;
  computedGET: number;
}

export function ClinicalRecordForm({
  formData,
  onChange,
  onActivityLevelChange,
  latestRecord,
  computedGEB,
  computedGET,
}: ClinicalRecordFormProps) {
  
  // Clean fallback logic for reference tracking (Fixing potential data structure drift)
  const refCalories = latestRecord?.get || (latestRecord?.macros as any)?.calories || 0;
  const refProteins = latestRecord?.macros?.proteins_g || (latestRecord?.macros as any)?.proteinGrams || 0;
  const refCarbs = latestRecord?.macros?.carbs_g || (latestRecord?.macros as any)?.carbohydrateGrams || 0;
  const refLipids = latestRecord?.macros?.lipids_g || (latestRecord?.macros as any)?.lipidGrams || 0;

  return (
    <div className="grow overflow-y-auto p-6 space-y-8 pr-3">
      {/* TOP SECTION: Antropometría & Metabolismo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* SIDEBAR: Antropometría */}
        <div className="md:col-span-1 space-y-4">
          <h4 className="text-sm font-semibold text-foreground border-b pb-1">Antropometría</h4>
          
          <div className="grid grid-cols-1 gap-3">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input 
                type="number" 
                id="weight" 
                name="weight" 
                value={formData.weight || ""} 
                onChange={onChange} 
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
                onChange={onChange} 
                className="border border-border text-foreground h-10 px-3 bg-white rounded-md" 
                placeholder="0"
              />
            </div>
          </div> 
          
          <div className="space-y-2">
            <Label htmlFor="age">Edad</Label>
            <Input 
              type="number" 
              id="age" 
              name="age" 
              value={formData.age || ""} 
              onChange={onChange} 
              className="border border-border text-foreground h-10 px-3 bg-white rounded-md" 
              placeholder="0"
            />
          </div>
        </div>

        {/* MAIN AREA: Metabolismo */}
        <div className="md:col-span-2 space-y-8">
          <div className="space-y-4 bg-muted/20 p-4 rounded-lg">
            <h4 className="text-sm font-semibold text-foreground border-b pb-1">Metabolismo</h4>
            <div className="space-y-2">
              <Label>FA (Factor de Actividad)</Label>
              <Select value={formData.pa.toString()} onValueChange={onActivityLevelChange}>
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
                <Input type="number" value={computedGEB} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
              </div>
              <div className="space-y-2">
                <Label>GET (Kcal Totales)</Label>
                <Input type="number" value={computedGET} disabled className="bg-primary/5 border-primary/20 text-primary font-bold h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COMPARATIVE MACRO GRID */}
      <div className="space-y-4 pt-6 border-t border-dashed">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-sm font-semibold text-foreground">Objetivos de Macronutrientes</h4>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
            Comparativa vs. Consulta Anterior
          </span>
        </div>

        <div className="grid grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg items-center">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">Métrica</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase">Anterior (Ref)</div>
          <div className="text-[10px] font-bold text-primary uppercase">Sugerido (Calculado)</div>
          <div className="text-[10px] font-bold text-secondary uppercase">Nuevo Ajuste</div>

          {/* CALORIES */}
          <div className="flex items-center text-sm font-medium">Calorías (kcal)</div>
          <div className="text-sm text-muted-foreground">{Number(refCalories).toFixed(0)}</div>
          <div className="text-sm font-bold text-primary">{computedGET}</div>
          <Input 
            type="number" 
            name="calories" 
            value={formData.calories === 0 ? "" : formData.calories} 
            onChange={onChange} 
            className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
            placeholder="0"
          />

          {/* PROTEIN */}
          <div className="flex items-center text-sm font-medium">Proteína (g)</div>
          <div className="text-sm text-muted-foreground">{Number(refProteins).toFixed(1)}</div>
          <div className="text-sm font-bold text-primary">{Math.round((computedGET * 0.20) / 4)}</div>
          <Input 
            type="number" 
            name="proteins_g" 
            value={formData.proteins_g === 0 ? "" : formData.proteins_g} 
            onChange={onChange} 
            className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
            placeholder="0"
          />

          {/* CARBS */}
          <div className="flex items-center text-sm font-medium">Carbos (g)</div>
          <div className="text-sm text-muted-foreground">{Number(refCarbs).toFixed(1)}</div>
          <div className="text-sm font-bold text-primary">{Math.round((computedGET * 0.50) / 4)}</div>
          <Input 
            type="number" 
            name="carbs_g" 
            value={formData.carbs_g === 0 ? "" : formData.carbs_g} 
            onChange={onChange} 
            className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
            placeholder="0"
          />

          {/* LIPIDS */}
          <div className="flex items-center text-sm font-medium">Grasas (g)</div>
          <div className="text-sm text-muted-foreground">{Number(refLipids).toFixed(1)}</div>
          <div className="text-sm font-bold text-primary">{Math.round((computedGET * 0.30) / 9)}</div>
          <Input 
            type="number" 
            name="lipids_g" 
            value={formData.lipids_g === 0 ? "" : formData.lipids_g} 
            onChange={onChange} 
            className="h-9 border border-secondary/50 focus-visible:ring-secondary text-foreground bg-white rounded-md"
            placeholder="0"
          />
        </div>
      </div>

      {/* NOTES SECTION */}
      <div className="space-y-4 pt-6">
        <Label htmlFor="notes" className="font-semibold text-sm">Notas e Historial de la Consulta</Label>
        <Textarea 
          id="notes" 
          name="notes" 
          value={formData.notes || ""} 
          onChange={onChange} 
          placeholder="Escribe aquí las observaciones clínicas..." 
          className="h-32 border border-border bg-white rounded-md p-3 text-foreground" 
        />
      </div>
    </div>
  );
}