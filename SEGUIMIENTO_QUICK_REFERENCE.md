# Seguimiento - Quick Reference

## Layout at a Glance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  ← Back  │  Patient Name - Seguimiento Clínico                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────┐  ┌────────────────────────────────────┐   │
│  │   LEFT PANEL (History)     │  │  RIGHT PANEL (New Entry)           │   │
│  │                            │  │                                    │   │
│  │  ┌──────────────────────┐  │  │  ┌──────────────────────────────┐ │   │
│  │  │ Última Consulta      │  │  │  │ Nueva Medición               │ │   │
│  │  │ [Date]               │  │  │  │ Peso (kg): [Input Field] ← │ │   │
│  │  └──────────────────────┘  │  │  │            ↓                 │ │   │
│  │                            │  │  │       [Calcs] ✨              │ │   │
│  │  ┌──────────────────────┐  │  │  └──────────────────────────────┘ │   │
│  │  │ Antropometría        │  │  │                                    │   │
│  │  │ ┌────┬────┬────────┐ │  │  │  ┌──────────────────────────────┐ │   │
│  │  │ │Peso│Alt │Edad    │ │  │  │  │ Sugerencia de Macros [⚠️]   │ │   │
│  │  │ │ kg │cm  │ años   │ │  │  │  │                              │ │   │
│  │  │ └────┴────┴────────┘ │  │  │  │ GET Anterior: 2400 kcal      │ │   │
│  │  └──────────────────────┘  │  │  │ GET Sugerido: 2450 kcal [+50]│ │   │
│  │                            │  │  │                              │ │   │
│  │  ┌──────────────────────┐  │  │  │ │Macro│Anterior│Sugerido│%│ │ │   │
│  │  │ Metabolismo          │  │  │  │ ├──────┼────────┼────────┤  │ │   │
│  │  │ GEB: __ kcal/día     │  │  │  │ │Prot│162g   │166g    │27%│ │   │
│  │  │ GET: __ kcal/día     │  │  │  │ │Carb│300g   │306g    │50%│ │   │
│  │  │ PA: __ (activity)    │  │  │  │ │Gra │61g    │62g     │23%│ │   │
│  │  └──────────────────────┘  │  │  │ └──────┴────────┴────────┘  │ │   │
│  │                            │  │  └──────────────────────────────┘ │   │
│  │  ┌──────────────────────┐  │  │                                    │   │
│  │  │ Plan Nutricional     │  │  │  ┌──────────────────────────────┐ │   │
│  │  │ [🔵] Proteína        │  │  │  │ Notas Clínicas               │ │   │
│  │  │      162g  [27%]     │  │  │  │ [Textarea for notes]         │ │   │
│  │  │ [🟠] Carbohidratos   │  │  │  │                              │ │   │
│  │  │      300g  [50%]     │  │  │  │ [+ Agregar Nota]             │ │   │
│  │  │ [🟢] Grasas          │  │  │  │                              │ │   │
│  │  │      61g   [23%]     │  │  │  │ Preview of added notes:      │ │   │
│  │  └──────────────────────┘  │  │  │ • [2024-06-16] Note text...  │ │   │
│  │                            │  │  │   [✕ Remove]                 │ │   │
│  │  ┌──────────────────────┐  │  │  └──────────────────────────────┘ │   │
│  │  │ Historial de Notas   │  │  │                                    │   │
│  │  │ ┌──────────────────┐ │  │  │  ┌────────────────────────────┐  │   │
│  │  │ │2024-06-10        │ │  │  │  │[💾 Guardar Nueva Consulta]  │  │   │
│  │  │ │Patient improved  │ │  │  │  │[← Cancelar]                 │  │   │
│  │  │ │with new diet     │ │  │  │  └────────────────────────────┘  │   │
│  │  │ └──────────────────┘ │  │  │                                    │   │
│  │  │ ┌──────────────────┐ │  │  │                                    │   │
│  │  │ │2024-06-03        │ │  │  │                                    │   │
│  │  │ │Adjust calories   │ │  │  │                                    │   │
│  │  │ │for next week     │ │  │  │                                    │   │
│  │  │ └──────────────────┘ │  │  │                                    │   │
│  │  └──────────────────────┘  │  │                                    │   │
│  │                            │  │                                    │   │
│  └────────────────────────────┘  └────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Step-by-Step Usage

### 1. Enter New Weight
```
Doctor enters weight (only required field)
         ↓
System auto-calculates:
  • New GEB (Basal Metabolic Rate)
  • New GET (Total Daily Energy Expenditure)
  • New macros (using previous percentages)
         ↓
Suggestion card appears with green/red indicator
```

### 2. Review Macro Suggestion
```
LEFT SIDE shows:                 RIGHT SIDE shows:
─────────────────                 ─────────────────
✓ Previous GEB                   → New calculated GEB
✓ Previous GET                   → New calculated GET
✓ Previous Macros                → Suggested macros (same %)
✓ Historical data                → Difference indicator (📈/📉)
```

### 3. Add Clinical Notes
```
Type observations
         ↓
Click "Agregar Nota"
         ↓
Note appears with today's date
         ↓
Can add multiple notes or remove before save
```

### 4. Save
```
Click "Guardar Nueva Consulta"
         ↓
✓ New immutable record created
✓ Previous records unchanged
✓ Redirects to patient list
```

## Calculation Example

**Patient: Maria, Female, 165cm, Age 32**

### Consultation 1 (Previous)
```
Weight: 65 kg
GEB = (10×65) + (6.25×165) - (5×32) - 161 = 1530 kcal
PA = 1.375 (moderate)
GET = (1530 × 1.375) + (1530 × 0.1) = 2153 kcal

Macros:
  27% Protein = 145g  (580 kcal)
  50% Carbs   = 269g  (1076 kcal)
  23% Fats    = 56g   (497 kcal)
```

### Consultation 2 (Today - Weight changed to 66kg)
```
Doctor enters: Weight = 66 kg
System calculates:
GEB = (10×66) + (6.25×165) - (5×32) - 161 = 1540 kcal
GET = (1540 × 1.375) + (1540 × 0.1) = 2167 kcal

Suggestion (same 27/50/23 percentages):
  27% Protein = 146g  (584 kcal)
  50% Carbs   = 271g  (1084 kcal)
  23% Fats    = 56g   (499 kcal)

Display:
  GET Anterior: 2153 kcal
  GET Sugerido: 2167 kcal  [↑ +14 kcal]  ← Green indicator
```

## Color Codes

| Element | Color | Meaning |
|---------|-------|---------|
| Weight Change (↑) | Green | Calorie increase |
| Weight Change (↓) | Red | Calorie decrease |
| Macro % | Color badges | Protein (blue), Carbs (orange), Fats (green) |
| Suggestion card | Amber/yellow | Alert - review before saving |
| Accepted macro | Primary color | Currently active macros |

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Add note | `Ctrl+Enter` in textarea |
| Save | Tab to button + `Enter` |
| Back | `Escape` |

## Common Workflows

### Scenario A: Minor Weight Increase
```
Weight: 65kg → 66kg
GET: 2153 → 2167 kcal
Action: Accept suggestion, add note "Slight weight gain, maintain current plan"
```

### Scenario B: Significant Weight Loss
```
Weight: 70kg → 64kg
GET: 2400 → 2150 kcal
Action: Review suggestion carefully, may adjust % if patient struggling with hunger
```

### Scenario C: Weight Stable
```
Weight: 68kg → 68kg
Suggestion: Not shown (identical to previous)
Action: Doctor may manually adjust macros or add notes only
```

### Scenario D: Update After Medication Change
```
Same weight but activity level discussion
Action: Add note about medication effect, doctor manually adjusts if needed
```

## Troubleshooting

### Suggestion card won't appear
- **Check**: Did you change the weight value?
- **Fix**: Clear field and re-enter a different weight

### Can't save
- **Check**: Weight field is filled with valid number
- **Fix**: Ensure weight > 0 and reasonable for patient

### Previous notes missing
- **Check**: They should appear in "Historial de Notas"
- **Fix**: Scroll down in notes card if many entries

### Macros seem wrong
- **Check**: Are percentages maintained from previous entry?
- **Fix**: Review the GET calculation (weight change affects it)

## Data Privacy

- All records are stored locally in browser LocalStorage
- No data sent to servers (current implementation)
- Export functionality planned for future
- Each patient record is independent and encrypted in storage
