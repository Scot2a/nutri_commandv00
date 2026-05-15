import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ClinicalRecord{
  id: string;
  date: string; //ISO DATE
  //ANTROPOMETRY
  weight: number;
  height: number;
  age: number;
  gebAverage: number;
  get: number;
  pa: number;
  //For meal plan
  macros: {
    proteins_g: number;
    carbs_g: number;
    lipids_g: number;
    calories: number;
    amount_g: number;
  }
  notes: string;
}

export interface Patient {
    id: string
    name: string
    gender: "male" | "female"
    email: string
    phone: string
    notes: string
    patientHistory?: PatientHistory
    createdAt: string
    records: ClinicalRecord[];
}

export interface PatientHistory {
  medicalConditions: string[]
  surgeries: string[]
  dietaryRestrictions: string[]
  allergies: string[]
  preferences: string[]
  otherNotes: string
}

interface PatientStore{
    patients: Patient[]
    addPatient: (patient: Patient) => void;
    removePatient: (patientId: string) => void;
    updatePatient: (updatedPatient: Patient) => void;
    updatePatientIdentity: (patientId: string, updates: Partial<Patient>) => void;
    updateLastRecord: (patientId: string, updates: Partial<ClinicalRecord>) => void;
    addNewRecord: (patientId: string, newRecord: ClinicalRecord) => void;
    
}

export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],
      addPatient: (patient) =>
        set((state) => ({
          patients: [...state.patients, {...patient, records: patient.records || []}],
        })),
        updatePatient: (updatedPatient) =>
          set((state) => ({
            patients: state.patients.map((p) =>
            p.id === updatedPatient.id 
            ? {...updatedPatient, records: updatedPatient.records || p.records || []}
             : p 
          ),
          })),

      // FIX: Standard filter logic to remove a patient
      removePatient: (patientId) =>
        set((state) => ({
          patients: state.patients.filter((p) => p.id !== patientId),
        })),

      updatePatientIdentity: (patientId, updates) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === patientId ? { ...p, ...updates } : p
          ),
        })),

      updateLastRecord: (patientId, updates) =>
        set((state) => ({
          patients: state.patients.map((p) => {
            if (p.id !== patientId || !p.records || p.records.length === 0) return p;
            const updatedRecords = [...p.records];
            const lastIndex = updatedRecords.length - 1;
            updatedRecords[lastIndex] = { ...updatedRecords[lastIndex], ...updates };
            return { ...p, records: updatedRecords };
          }),
        })),

      addNewRecord: (patientId, newRecord) =>
        set((state) => ({
          patients: state.patients.map((p) =>
            p.id === patientId 
              ? { ...p, records: [...p.records, newRecord] } 
              : p
          ),
        })),
    }),
    {
      name: "patient-storage", // This is the key for LocalStorage
    }
  )
);

{/*export const usePatientStore = create<PatientStore>()(
  persist(
    (set) => ({
      patients: [],
      addPatient: (patientData) => set((state) => ({
        patients: [...state.patients, {
          ...patientData,
          id: `patient-${Date.now()}`,
          createdAt: new Date().toISOString(),
        }]
      })),
      removePatient: (patientId) => set((state) => ({
        patients: state.patients.filter((p) => p.id !== patientId)
      })),
      updatePatient: (updatedPatient) => set((state) => ({
        patients: state.patients.map((p) => 
          p.id === updatedPatient.id ? updatedPatient : p
        )
      })),
    }),
    {
      name: 'nutricommand_patients',
    }
  )
)*/}
