import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { usePatientStore, ClinicalRecord } from "@/src/patient_store/use_patient_store";
import { Plus, Pencil } from "lucide-react";
import { ClinicalRecordForm, RecordFormState } from "@/components/clinical_record_form"; // Adjust import path as needed

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
  
  const latestRecord = patient?.records && patient.records.length > 0 
    ? patient.records[patient.records.length - 1] 
    : null;

  const [formData, setFormData] = useState<RecordFormState>({
    weight: 0,
    height: 0,
    age: 0,
    pa: 1.2,
    notes: "",
    proteins_g: 0,
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
        proteins_g: 0,
        carbs_g: 0,
        lipids_g: 0,
        calories: 0,
      });
    }
  }, [isOpen, patient, latestRecord, mode]);

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

  const calculateDynamicGEB = () => {
    if (!formData.weight || !formData.height || !formData.age) return latestRecord?.gebAverage || 0;
    const base = (10 * formData.weight) + (6.25 * formData.height) - (5 * formData.age);
    return patient?.gender === "male" ? base + 5 : base - 161;
  };

  const currentGEB = Math.round(calculateDynamicGEB());
  const currentGET = Math.round(currentGEB * formData.pa + currentGEB * 0.1);

  if (!patient) return null;

  const handleSubmit = () => {
    const finalProtein = formData.proteins_g > 0 ? formData.proteins_g : Math.round((currentGET * 0.20) / 4);
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
        
        <DialogHeader className="p-6 pb-4 border-b shrink-0">
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <ActionIcon className={`w-5 h-5 ${isEdit ? 'text-secondary' : 'text-primary'}`} />
            {dialogTitle} - {patient.name}
          </DialogTitle>
        </DialogHeader>

        {/* INJECTED DUMB FORM */}
        <ClinicalRecordForm 
          formData={formData}
          onChange={handleInputChange}
          onActivityLevelChange={handleSelectChange}
          latestRecord={latestRecord}
          computedGEB={currentGEB}
          computedGET={currentGET}
        />

        <DialogFooter className="flex justify-end gap-3 p-6 border-t border-border mt-auto shrink-0">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit} className={isEdit ? "bg-secondary hover:bg-secondary/90 text-secondary-foreground" : ""}>
              {isEdit ? "Actualizar Registro" : "Crear Nuevo Registro de Seguimiento"}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}

// Small defensive subcomponent fix for backward UI layout stability if you don't have DialogFooter imported:
function DialogFooter({ children, className }: { children: React.ReactNode, className?: string }) {
  return <div className={className}>{children}</div>;
}