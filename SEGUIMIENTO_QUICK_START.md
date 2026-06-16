# Clinical Evolution (Seguimiento) - Quick Start Guide

## 🎯 What's New?

You now have a **dedicated "Nueva Consulta" button** that creates **immutable clinical evolution records** for each patient visit—never overwriting previous data.

## 🚀 Quick Access

### From Patient Card
```
Patient: María García
├─ [+ Nueva Consulta]  ← NEW: Start follow-up workflow
├─ [+ Seguimiento]     ← Legacy mode
└─ [✎ Editar]         ← Edit demographics
```

Click **"Nueva Consulta"** to open the Clinical Evolution Dialog.

---

## 📋 The Dialog (Two Tabs)

### Tab 1: "Datos Clínicos" (Clinical Data)

**Comparison Cards** (at top)
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ Peso (kg)    │  │ GEB Promedio │  │ GET (kcal)   │
│ 72kg         │  │ 1435         │  │ 2193 ★       │
│ Anterior: 75 │  │ Anterior:1428│  │ Anterior:2186│
│ Cambio: -3↓  │  │ Cambio: +7   │  │ Cambio: +7   │
└──────────────┘  └──────────────┘  └──────────────┘
```

**Three-Column Layout**

Left sidebar: **Antropometría**
- Peso (kg)
- Estatura (cm)  
- Edad

Right section: **Metabolismo**
- FA (Activity Factor dropdown)
- GEB Promedio (auto-calculated)
- GET Total (auto-calculated)

Bottom: **Macronutrients Grid** (4 columns)
```
Métrica        │ Anterior │ Sugerido │ Nuevo Ajuste
─────────────────────────────────────────────────
Calorías (kcal)│  1800    │  1950    │ [input box]
Proteína (g)   │   90     │   98     │ [input box]
Carbos (g)     │  220     │  244     │ [input box]
Grasas (g)     │   60     │   65     │ [input box]
```

### Tab 2: "Notas & Observaciones" (Notes Timeline)

**Historial de Anotaciones** (Scrollable list)
```
┌─────────────────────────────────────┐
│ 📅 2024-01-15                    [×] │
│ "Consulta inicial. Peso basal."     │
├─────────────────────────────────────┤
│ 📅 2024-02-20                    [×] │
│ "Buen cumplimiento. Perdió 2kg."    │
├─────────────────────────────────────┤
│ 📅 2024-03-15                    [×] │
│ "Progreso continuo. Seguir plan."   │
└─────────────────────────────────────┘
```

**Nueva Anotación** (Input section)
```
Textarea (multiline)
"Escribe las observaciones clínicas de esta consulta..."

[+ Agregar Anotación] ← Click to add note to timeline
```

---

## 🔄 Typical Workflow

### First Consultation
```
1. Create patient (María García, Female)
2. Set: Weight 75kg, Height 165cm, Age 30
3. Click [+ Nueva Consulta]
4. Dialog fills with default/previous data
5. Update: Activity = "Moderada" (1.55)
6. Add note: "Consulta inicial. Plan nutricional establecido."
7. Click [Guardar Nueva Consulta]
   ✓ Record #1 created with timestamp
```

### 3-Month Follow-up
```
1. Click [+ Nueva Consulta] again
2. Form pre-fills from Record #1:
   - Weight: 75kg
   - Height: 165cm
   - Age: 30
   - Activity: 1.55
3. Doctor updates:
   - New weight: 72kg
   - Age: 31 (birthday)
4. Comparison shows:
   - Weight: -3kg ↓ (Good!)
   - GEB: +7 kcal
   - GET: +7 kcal
5. Switch to "Notas" tab
6. Previous notes appear (3 entries)
7. Add new: "Buen progreso. Continuar."
8. Click [Guardar Nueva Consulta]
   ✓ Record #2 created with NEW timestamp
   ✓ Record #1 UNCHANGED
   ✓ Full timeline preserved
```

---

## 📊 Key Features

| Feature | What It Does |
|---------|-------------|
| **Immutable Timeline** | Every save = new record. Never overwrites old data. |
| **Pre-filled Form** | Deep clones last record's data to minimize re-entry. |
| **Real-time Calculations** | GEB, GET auto-update as you type. |
| **Comparison View** | Previous vs. Current metrics side-by-side. |
| **Trend Indicators** | ↑ ↓ — show if metrics improved or worsened. |
| **Notes Management** | Add/remove/view all notes in one place. |

---

## 🧮 Auto-Calculations (You Don't Need to Think About)

**GEB (Basal Energy)** updates when you change:
- Weight, Height, or Age

**GET (Total Energy)** updates when you change:
- GEB or Activity Factor

**Macros** auto-suggest when GET changes:
- Protein: GET × 0.20 ÷ 4
- Carbs: GET × 0.50 ÷ 4
- Fats: GET × 0.30 ÷ 9

You can **override any value** by typing in the "Nuevo Ajuste" column.

---

## 💾 Save Behavior

When you click **[Guardar Nueva Consulta]**:

```
✓ Creates a NEW ClinicalRecord
✓ Timestamps it as TODAY
✓ Appends to patient.records array
✓ Does NOT modify previous records
✓ Closes dialog
```

**Result:**
```
patient.records = [
  { id: "...", date: "2024-01-15", weight: 75, ... },  ← Old (untouched)
  { id: "...", date: "2024-04-15", weight: 72, ... }   ← Just created
]
```

---

## ⚠️ Important Notes

### ❌ DON'T
- Click the "Editar" button if you want to log a new consultation
  - (Editar modifies the LAST record in-place)
- Expect the form to modify existing records
  - (It always creates NEW records)

### ✅ DO
- Use "Nueva Consulta" for every patient visit
- Let pre-filled data save you time
- Override any macro if you have a different prescription
- Add notes that explain the consultation
- Use the notes timeline to see the full story

---

## 🎨 UI Legend

| Element | Meaning |
|---------|---------|
| Blue values | Current/Suggested metrics (system defaults) |
| Green buttons | Primary actions (Guardar) |
| Gray text | Muted/Historical values |
| [×] button | Delete this note (before saving) |
| ↑ Red trend | Increased (bad for weight, good for GET) |
| ↓ Green trend | Decreased (good for weight) |
| — Gray trend | No change |

---

## 📱 Responsive Design

- **Desktop (md+)**: 3-column layout (sidebar + main + compare)
- **Mobile**: Stacks vertically, still fully functional
- **Scrollable**: Long notes lists and forms scroll independently

---

## 🐛 Troubleshooting

**Q: Form won't open?**
- Make sure patient has at least one record (initial consultation data)
- Or create patient with basic info first

**Q: Previous data not showing?**
- Check if patient has prior records in the store
- First consultation will have default/zero values

**Q: Calculations not updating?**
- Ensure all fields are filled (weight, height, age)
- Activity factor must be selected

**Q: Notes disappearing?**
- Click [+ Agregar Anotación] after typing
- Clicking Save saves ALL notes (old + new)

**Q: Want to edit an old consultation?**
- Currently: Create a new one with corrected data and different date
- (Immutable by design—prevents data loss)

---

## 🔍 Under the Hood

**Component File**: `/components/clinical_evolution.tsx`  
**Store Integration**: Zustand `addNewRecord()` action  
**Dialog Triggers**: From `/components/patients_list.tsx`  
**Data Structure**: `ClinicalRecord[]` array per patient  

---

## 📚 More Info

Full documentation: See `CLINICAL_EVOLUTION_GUIDE.md`

Quick questions?
- Check calculation formulas
- Review example workflow
- See data model structure

---

## ✨ Summary

**"Nueva Consulta"** = Safe, timestamped, immutable snapshot of today's consultation.

No more:
- ❌ Overwriting historical data
- ❌ Broken charts due to retroactive edits
- ❌ Lost audit trails

Yes to:
- ✅ Complete clinical timeline
- ✅ Accurate progression tracking
- ✅ Compliance-ready documentation
- ✅ Smart pre-fill to save time

**Happy tracking!** 🎯
