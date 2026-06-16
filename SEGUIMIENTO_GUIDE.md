# Seguimiento Clínico - Full Page Follow-up Workflow

## Overview

The Seguimiento (Clinical Follow-up) feature is a dedicated full-page interface designed for doctor consultations with existing patients. It enables immutable, append-only clinical record management with intelligent macro calculation suggestions based on patient weight changes.

## User Flow

```
Patient List Page
    ↓ [Click "Seguimiento" button]
    ↓
Seguimiento Page Opens
    ├─ LEFT PANEL (Read-Only Clinical History)
    │  ├─ Última Consulta (Last Consultation Date)
    │  ├─ Antropometría (Weight, Height, Age)
    │  ├─ Metabolismo (GEB, GET, PA)
    │  ├─ Plan Nutricional (Protein, Carbs, Fats with percentages)
    │  └─ Historial de Notas (All previous notes with dates)
    │
    ├─ CENTER (Vertical Divider)
    │
    └─ RIGHT PANEL (New Entry Form)
       ├─ Nueva Medición (Weight input)
       ├─ Sugerencia de Macros (Auto-calculated based on weight change)
       │  └─ Shows GET change, macro suggestions with maintained percentages
       ├─ Notas Clínicas (Add/remove notes for this consultation)
       └─ [Guardar Nueva Consulta] + [Cancelar]

After Save
    ↓
- New immutable record created with timestamp
- Previous records remain unchanged
- Returns to Patients List
```

## Layout

The page uses a **responsive 2-column grid** (collapsible to 1 column on mobile):

- **LEFT COLUMN**: Clinical history read-only cards
- **RIGHT COLUMN**: Input form with smart suggestions

## Key Features

### 1. Immutable Record System
- Every save creates a **NEW record** with today's timestamp
- Previous consultations are **never modified**
- Complete audit trail preserved
- Enables accurate progression charts

### 2. Smart Macro Calculation

#### Calculation Formula (Mifflin-St Jeor Equation)
```
GEB = (10×weight) + (6.25×height) - (5×age) + [±5 or -161 by gender]
GET = (GEB × PA) + (GEB × 0.1)

Where:
- GEB = Gasto Energético Basal (Basal Metabolic Rate)
- GET = Gasto Energético Total (Total Daily Energy Expenditure)
- PA = Physical Activity Factor (e.g., 1.2, 1.375, 1.55, etc.)
```

#### Weight Change Detection
When a doctor enters a new weight:

1. **System calculates** new GEB and GET automatically
2. **Compares** new vs previous GET
3. **Extracts** previous macro percentages (Protein %, Carbs %, Fats %)
4. **Applies** same percentages to new GET
5. **Shows** suggestion with visual trend indicator (📈 or 📉)

#### Example

**Previous consultation:**
- Weight: 65 kg
- GET: 2400 kcal
- Macros: 27% Protein, 50% Carbs, 23% Fats
- Details: 162g protein, 300g carbs, 61g fats

**Doctor enters new weight:** 66 kg
- System calculates new GET: 2450 kcal
- Applies same percentages:
  - Protein: 27% → 166g
  - Carbs: 50% → 306g
  - Fats: 23% → 62g
- **Alert shown**: "↑ 50 kcal más" with color highlighting

Doctor can:
- ✅ Accept the suggestion (click outside alert)
- 📝 Manually modify each macro value
- 🗑️ Ignore and manually enter all values

### 3. Clinical Notes Management

#### Notes History
- All notes from all consultations appear on the left panel
- Each note shows: `[Date] Note Text`
- Organized chronologically

#### New Notes Input
- Add multiple notes during this consultation
- Each note gets timestamped when saved
- Can remove notes before final save
- Notes are concatenated with date prefixes in the record

### 4. Data Presentation Cards

**Left Panel Cards:**

| Card | Content | Purpose |
|------|---------|---------|
| Última Consulta | Date of last consultation | Context |
| Antropometría | 3-column grid: Weight, Height, Age | Reference |
| Metabolismo | 2-column grid: GEB, GET (with PA) | Baseline |
| Plan Nutricional | 3 colored rows: Protein, Carbs, Fats (g + %) | Nutrition plan |
| Historial de Notas | Scrollable list of previous notes | Medical history |

**Right Panel Cards:**

| Card | Content | Purpose |
|------|---------|---------|
| Nueva Medición | Weight input field | Primary input |
| Sugerencia de Macros | GET comparison + 4-column macro table | Smart suggestion |
| Notas Clínicas | Textarea + preview of added notes | Clinical notes |
| Action Buttons | Save + Cancel | Submission |

## Technical Implementation

### File Structure
```
app/(dashboard)/dashboard/patients/
  └─ [id]/
     └─ seguimiento/
        └─ page.tsx (Main component - 446 lines)
```

### State Management
- Uses **Zustand** patient store
- Calls `addNewRecord()` on save
- Navigates back to `/dashboard/patients` after save

### Calculations (Utility Functions)
```typescript
calculateGEB(weight, height, age, gender) → number
calculateGET(geb, pa) → number
calculateMacroGrams(calories, proteinPercent, carbsPercent, fatsPercent) → object
getMacroPercentages(record) → { protein, carbs, fats }
```

### Dependencies
- `next/navigation` - useRouter, useParams
- `zustand` - usePatientStore
- shadcn/ui components (Button, Input, Textarea, Card)
- `lucide-react` - Icons

## User Experience Details

### Visual Feedback

1. **Weight Input**
   - When weight matches previous: No suggestion shown
   - When weight differs: Suggestion card appears with animation

2. **Macro Suggestion Card**
   - Background: Amber-tinted (soft alert color)
   - Alert icon for attention
   - Clear before/after comparison
   - Trend indicator: 📈 green (increase) or 📉 red (decrease)

3. **Percentage Consistency**
   - All percentages maintained from previous entry
   - Highlighted in colored badges (Primary, Orange, Green)
   - Easy to spot any manual overrides

4. **Notes Management**
   - Preview of added notes before save
   - Date-stamped automatically
   - One-click remove if needed
   - Final concatenation with line breaks

### Mobile Responsiveness
- On screens < 1024px: Stack panels vertically
- Maintains all functionality
- Cards remain readable
- Buttons full-width on small screens

## Data Model

### ClinicalRecord Structure
```typescript
interface ClinicalRecord {
  id: string                    // Unique ID
  date: string                  // ISO date string
  weight: number                // kg
  height: number                // cm (copied from previous)
  age: number                   // years (copied from previous)
  gebAverage: number            // Basal Metabolic Rate
  get: number                   // Total Daily Energy Expenditure
  pa: number                    // Physical Activity Factor (copied)
  macros: {
    proteins_g: number
    carbs_g: number
    lipids_g: number
    calories: number            // Total GET
    amount_g: number            // Sum of all macros
  }
  notes: string                 // Concatenated notes with timestamps
}
```

### Deep Clone Behavior
When opening Seguimiento:
- All fields from last record are pre-populated (read-only in left panel)
- Height, age, and PA are carried forward unchanged
- Weight field is empty by default (doctor enters new measurement)
- Notes history is loaded from all previous records

## Error Handling

- **No patient found**: Shows error card with back button
- **No previous records**: Shows message "Sin registros previos"
- **Invalid weight**: Save button disabled until valid weight entered
- **Missing macros data**: Suggestion card doesn't appear

## Future Enhancements

1. **Custom PA Factor Adjustment** - Allow doctor to change activity level
2. **Bulk Note Templates** - Pre-filled common observations
3. **Photo Upload** - Track progress photos
4. **PDF Export** - Generate consultation report
5. **Comparison Charts** - Visual progression over time
6. **Macro Editing Lock** - Option to lock percentages across consultations

## Testing Checklist

- ✅ Create a patient with initial clinical data
- ✅ Click "Seguimiento" button
- ✅ Verify left panel shows correct last consultation data
- ✅ Enter different weight value
- ✅ Confirm macro suggestion appears with correct calculations
- ✅ Add/remove notes successfully
- ✅ Save new record
- ✅ Verify new record appears in patient history
- ✅ Open Seguimiento again for same patient
- ✅ Confirm previous consultation shows in left panel
- ✅ Verify notes concatenated correctly
