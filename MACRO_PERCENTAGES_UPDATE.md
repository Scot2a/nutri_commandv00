# Macro Percentages Dynamic Update

## Overview

The Seguimiento (clinical follow-up) page now displays **dynamic macro percentages** based on the patient's actual clinical history instead of using fixed percentages.

## What Changed

### Before (Fixed Percentages)
The left panel displayed hardcoded macro percentages:
- Protein: 27%
- Carbs: 50%
- Fats: 23%

These values never changed and didn't reflect the patient's actual meal plan.

### After (Dynamic Percentages)
The left panel now shows **real percentages calculated from the last clinical record**:

```typescript
// Calculate percentages from stored calories and macros
const getMacroPercentages = (record: ClinicalRecord) => {
  const totalCals = record.macros.calories
  const proteinPercent = (record.macros.proteins_g * 4) / totalCals * 100
  const carbsPercent = (record.macros.carbs_g * 4) / totalCals * 100
  const fatsPercent = (record.macros.lipids_g * 9) / totalCals * 100
  
  return {
    protein: Math.round(proteinPercent),
    carbs: Math.round(carbsPercent),
    fats: Math.round(fatsPercent)
  }
}
```

## Implementation Details

### Key Changes

1. **Memoized Calculation**
   - Added `previousMacroPercentages` state computed from the last clinical record
   - Uses `useMemo` to avoid recalculation on every render

2. **Left Panel Display**
   - Shows actual percentages from clinical history
   - Updates when patient data changes
   - Reflects the patient's actual nutritional plan

3. **Right Panel Suggestion**
   - When weight changes, suggests new macros maintaining the SAME percentages
   - If patient has 27% protein historically, new suggestions also use 27%
   - Respects patient's actual nutritional distribution

## Example Scenario

**Patient History:**
- Last consultation: 65kg, 2400 kcal
- Macros: 162g protein (27%), 300g carbs (50%), 60g fats (23%)

**What Happens When Doctor Enters 66kg:**

1. System calculates new GET: 2450 kcal
2. Extracts historical percentages: 27% / 50% / 23%
3. Applies same percentages: 
   - Protein: 2450 × 27% / 4 = 165g
   - Carbs: 2450 × 50% / 4 = 306g
   - Fats: 2450 × 23% / 9 = 62g
4. Displays suggestion card with trend indicator (+50 kcal)

## Files Modified

- `/app/(dashboard)/dashboard/patients/[id]/seguimiento/page.tsx`
  - Added `previousMacroPercentages` memoized state
  - Updated left panel to use dynamic percentages
  - Existing macro suggestion logic already uses historical percentages correctly

## Testing

To verify the changes work correctly:

1. Create a patient with initial clinical record
2. Navigate to Seguimiento page
3. Check left panel displays actual macro percentages from history
4. Change weight and verify suggestion card maintains same percentages
5. Save new consultation and verify the percentages are preserved

## Compatibility

- ✅ No breaking changes to existing data structures
- ✅ Works with all historical records
- ✅ Backward compatible with existing clinical data
- ✅ No migration needed
