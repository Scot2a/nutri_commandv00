# Clinical Evolution (Seguimiento) Component Guide

## Overview

The **Clinical Evolution** component (`clinical_evolution.tsx`) is a dedicated workspace for managing **longitudinal patient follow-ups** with an **immutable, append-only timeline** design. Unlike the "Editar" (Edit) mode which modifies existing records, the "Nueva Consulta" (New Consultation) workflow creates a new timestamped snapshot of patient data for each visit.

---

## Core Philosophy: Immutable Timeline

### Problem Solved
The traditional edit model destroys clinical history:
- Doctor edits weight from 3 months ago → **Previous data is lost**
- Charts and progression trends become meaningless
- Compliance audits fail (no audit trail)

### Our Solution: Append-Only Records
- Every consultation creates a **NEW record** with today's date
- Previous records remain **untouched**
- Complete chronological timeline of patient evolution
- Safe for charts, trends, and clinical documentation

---

## User Workflow

```
Patient Card → Click "Nueva Consulta" button
    ↓
Dialog Opens → Pre-fills data from LAST consultation
    ↓
Doctor adjusts current metrics:
  • Weight, Height, Age (Antropometría)
  • Activity Factor (FA) → Auto-calculates GET
  • Macronutrients (override if needed)
  • Add clinical notes
    ↓
Click "Guardar Nueva Consulta"
    ↓
✓ NEW record appended to patient.records[]
✓ Timestamped as today
✓ Previous data preserved
```

---

## Component Structure

### Main Dialog (`ClinicalEvolutionDialog`)

**Props:**
```typescript
interface ClinicalEvolutionDialogProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
}
```

**Key Features:**
1. **Two-tab interface**: "Datos Clínicos" | "Notas & Observaciones"
2. **Comparison cards**: Shows previous vs. new metrics side-by-side
3. **Auto-calculations**: GEB, GET updated in real-time
4. **Notes timeline**: All previous notes displayed chronologically
5. **Immutable append**: Saves as new record, never modifies existing

### Tab 1: Datos Clínicos (Clinical Data)

#### Comparison Cards
Show side-by-side metrics with visual trend indicators:
- **Weight (kg)**: Current input vs. Previous value + change indicator
- **GEB Promedio**: Calculated vs. Previous + trend
- **GET (kcal)**: Total energy expenditure with comparison

Trend indicators:
- ↓ Red arrow = increase (negative change preferred for weight loss)
- ↑ Green arrow = decrease
- — Gray dash = no change

#### Antropometría (Sidebar)
```
┌─────────────────┐
│ Peso (kg)       │
│ [input field]   │
├─────────────────┤
│ Estatura (cm)   │
│ [input field]   │
├─────────────────┤
│ Edad            │
│ [input field]   │
└─────────────────┘
```

#### Metabolismo (Main Section)
```
FA (Factor de Actividad) Dropdown:
  • Muy ligera (1.2)
  • Ligera (1.375)
  • Moderada (1.55)
  • Intensa (1.725)
  • Muy intensa (1.9)

Auto-calculated:
  GEB Promedio: [readonly, auto-calculated]
  GET Total (Kcal): [readonly, auto-calculated]
```

#### Objetivos de Macronutrientes (Macro Grid)

4-column comparison table:
```
┌─────────────────────────────────────────────────┐
│ Métrica      │ Anterior │ Sugerido │ Nuevo      │
├─────────────────────────────────────────────────┤
│ Calorías     │  1800    │  1950    │ [input]    │
│ Proteína (g) │   90     │  98      │ [input]    │
│ Carbos (g)   │  220     │  244     │ [input]    │
│ Grasas (g)   │   60     │  65      │ [input]    │
└─────────────────────────────────────────────────┘
```

**Default Calculation Logic** (if not overridden):
- Calories: GET value
- Protein: GET × 0.20 ÷ 4 = grams
- Carbs: GET × 0.50 ÷ 4 = grams
- Fats: GET × 0.30 ÷ 9 = grams

### Tab 2: Notas & Observaciones (Notes Timeline)

#### Historical Notes Display
Scrollable timeline showing all previous notes:
```
┌──────────────────────────────┐
│ [2024-01-15] Doctor obs...   │ [×] Delete
├──────────────────────────────┤
│ [2024-02-20] Patient imp...  │ [×] Delete
├──────────────────────────────┤
│ [2024-03-15] Weight loss...  │ [×] Delete
└──────────────────────────────┘
```

**Features:**
- Click [×] to remove a note before saving
- Sorted by date
- Timestamp prefix: `[YYYY-MM-DD]`

#### New Note Input
```
┌────────────────────────────────┐
│ Nueva Anotación                │
├────────────────────────────────┤
│ Textarea (multi-line)          │
│ Escribe las observaciones...   │
├────────────────────────────────┤
│ [+ Agregar Anotación]          │
└────────────────────────────────┘
```

---

## Data Model

### ClinicalRecord Structure
```typescript
interface ClinicalRecord {
  id: string                    // Unique ID (UUID or Date-based)
  date: string                  // ISO date of consultation
  weight: number
  height: number
  age: number
  gebAverage: number            // Calculated basal energy expenditure
  get: number                   // Total energy expenditure
  pa: number                    // Physical activity factor
  macros: {
    proteins_g: number
    carbs_g: number
    lipids_g: number
    calories: number
    amount_g: number
  }
  notes: string                 // Combined notes string with date prefixes
}
```

### Notes Storage Format
Notes are stored as a single concatenated string with date prefixes:
```
[2024-01-15] Initial consultation: Patient at baseline
[2024-02-20] Follow-up: Good compliance, lost 2kg
[2024-03-15] Progress check: Continue current plan
```

**Parsing Logic (in `useEffect`):**
```javascript
const noteMatches = notes.match(/\[\d{4}-\d{2}-\d{2}\]\s+.+/g) || [];
const parsed = noteMatches.map(note => {
  const dateMatch = note.match(/\[(\d{4}-\d{2}-\d{2})\]/);
  const text = note.replace(/\[\d{4}-\d{2}-\d{2}\]\s+/, '');
  return { date: dateMatch?.[1] || '', text };
});
```

---

## Integration Points

### 1. Patient Store (Zustand)
```typescript
// In use_patient_store.ts
addNewRecord: (patientId: string, newRecord: ClinicalRecord) => void
```

Called on save to append the new record:
```javascript
addNewRecord(patientId, newFollowupRecord);
```

### 2. Patients List Component
Integration in `patients_list.tsx`:

```typescript
// Import the dialog
import { ClinicalEvolutionDialog } from "@/components/clinical_evolution"

// Add state
const [isClinicalEvolutionOpen, setIsClinicalEvolutionOpen] = useState(false)
const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null)

// Handler function
const openClinicalEvolution = (patientId: string) => {
  setSelectedPatientId(patientId)
  setIsClinicalEvolutionOpen(true)
}

// In patient card buttons
<Button onClick={() => openClinicalEvolution(patient.id)}>
  Nueva Consulta
</Button>

// Render dialog
{isClinicalEvolutionOpen && selectedPatientId && (
  <ClinicalEvolutionDialog
    isOpen={isClinicalEvolutionOpen}
    patientId={selectedPatientId}
    onClose={() => setIsClinicalEvolutionOpen(false)}
  />
)}
```

---

## Calculation Formulas

### Basal Energy Expenditure (GEB)
**Harris-Benedict Equation (Female):**
```
GEB = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
```

**For Males:**
```
GEB = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
```

### Total Energy Expenditure (GET)
```
GET = (GEB × PA) + (GEB × 0.1)
```

Where PA = Physical Activity Factor:
- 1.2 = Muy ligera (Sedentary)
- 1.375 = Ligera (Light)
- 1.55 = Moderada (Moderate)
- 1.725 = Intensa (Intense)
- 1.9 = Muy intensa (Very intense)

### Macronutrient Distribution (Default 20-50-30)
```
Protein: GET × 0.20 ÷ 4 = grams
Carbs:   GET × 0.50 ÷ 4 = grams
Fats:    GET × 0.30 ÷ 9 = grams
```

---

## Button States & Actions

### Patient Card Button Grid (3-column)

| Button | Purpose | Mode |
|--------|---------|------|
| **Nueva Consulta** | Open Clinical Evolution dialog | New record creation |
| **Seguimiento** | Open legacy follow-up dialog | (Alternative workflow) |
| **Editar** | Edit patient demographics | Basic info only |

---

## User Interactions

### Scenario 1: First Consultation
```
1. Create patient with name, email, BMR/macros
2. Click "Nueva Consulta"
3. Form pre-fills with available data (or zeros)
4. Fill current weight, age, activity factor
5. Add notes: "Initial consultation"
6. Save → Creates record #1 with timestamp
```

### Scenario 2: Follow-up Consultation (3 months later)
```
1. Click "Nueva Consulta" on patient card
2. Dialog opens, form pre-filled with record #1 data:
   - Weight: 75kg
   - Height: 165cm
   - Age: 30
   - PA: 1.55
3. Doctor updates:
   - New weight: 72kg (lost 3kg ✓)
   - New age: 31 (birthday passed)
   - Activity unchanged
4. Comparison cards show:
   - Weight: 72kg (was 75) → -3kg ↓
   - GEB: 1435 (was 1428) → +7
   - GET: 2193 (was 2186) → +7
5. Add note: "Good progress. Continue current plan."
6. Save → Creates record #2 with new timestamp
7. Patient.records = [record #1, record #2]
```

### Scenario 3: Editing Notes Only
```
1. Click "Notas & Observaciones" tab
2. View all previous notes in timeline
3. Remove outdated notes by clicking [×]
4. Add new note in textarea
5. Click "Agregar Anotación"
6. Note appears in timeline
7. Save → All notes merged into single string
   with date prefixes
```

---

## State Management

### Form State (FollowupFormState)
```typescript
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
```

### Notes State
```typescript
const [newNote, setNewNote] = useState("");
const [notesHistory, setNotesHistory] = useState<Array<{
  date: string;
  text: string;
}>>([]);
```

### Tab State
```typescript
const [activeTab, setActiveTab] = useState<'follow-up' | 'notes'>('follow-up');
```

---

## Key Features

### 1. **Immutable Timeline**
- Every save appends a new record
- Previous consultations never modified
- Full audit trail for compliance

### 2. **Smart Pre-fill**
- Deep clones last record's anthropometric data
- Patient sees where they started
- Minimal re-entry of unchanging data

### 3. **Real-time Calculations**
- GEB, GET update as fields change
- Default macros auto-calculate
- Doctor can override any macro

### 4. **Comparison View**
- Previous vs. Current metrics side-by-side
- Visual trend indicators (↑↓—)
- Easy to spot significant changes

### 5. **Notes Management**
- All historical notes in one view
- Add/remove notes before saving
- Automatic date prefixing

### 6. **Accessible UI**
- Two tabs for data organization
- Clear labeling (Anterior | Sugerido | Nuevo Ajuste)
- Semantic HTML with proper ARIA roles
- ScrollArea for long notes history

---

## Testing Checklist

- [ ] Create patient with valid BMR data
- [ ] Click "Nueva Consulta" → Dialog opens
- [ ] Form pre-fills with previous data
- [ ] Update weight, check comparison cards update
- [ ] Change activity factor → GET recalculates
- [ ] Override macros → Values stick
- [ ] Switch to Notes tab → Historical notes appear
- [ ] Add new note → Appears in timeline
- [ ] Remove note → Disappears before save
- [ ] Click Save → Dialog closes, new record created
- [ ] Check patient.records → Contains 2 records with different dates
- [ ] Click "Nueva Consulta" again → New form pre-fills with previous record

---

## Styling & Theme

The component uses Tailwind CSS with semantic design tokens:

```css
/* Colors */
bg-card         /* Dialog background */
border-border   /* Borders */
text-foreground /* Primary text */
bg-muted/20     /* Muted backgrounds */
text-primary    /* Accent color (GET, suggested macros) */
text-secondary  /* Secondary accent (overrides) */
bg-destructive  /* Negative trend (weight increase) */
```

---

## Common Issues & Solutions

### Issue: Calculations not updating
**Solution:** Ensure `currentGEB` and `currentGET` are derived from `formData` in real-time, not stored in state.

### Issue: Notes not parsing correctly
**Solution:** Check date format is exactly `YYYY-MM-DD` and regex matches `[\d{4}-\d{2}-\d{2}]`.

### Issue: Dialog not opening
**Solution:** Verify `ClinicalEvolutionDialog` is imported and both `isOpen` and `onClose` props are connected.

### Issue: New record not appending
**Solution:** Ensure `addNewRecord` is called (not `updateLastRecord`), and new record has unique ID and current ISO date.

---

## Future Enhancements

1. **Chart Integration**: Display weight/GET progression over time
2. **Meal Plan Linking**: Attach current meal plan to consultation
3. **Photo Tracking**: Before/after photos per consultation
4. **Alerts & Flags**: Alert if weight change > threshold
5. **PDF Export**: Generate consultation summary
6. **Sync to Cloud**: Backup consultation history

---

## File Locations

- **Component**: `/components/clinical_evolution.tsx`
- **Store Integration**: `/src/patient_store/use_patient_store.ts`
- **Patient List Integration**: `/components/patients_list.tsx`
- **Dialog UI Components**: `/components/ui/dialog.tsx`, `/components/ui/card.tsx`, etc.

---

## Summary

The Clinical Evolution component transforms patient follow-ups from destructive edits into a **complete, immutable timeline** of clinical progress. Doctors can confidently track patient evolution, compare metrics across visits, and maintain a robust audit trail—all while keeping the UI simple and focused on what matters: today's consultation and how far the patient has come.
