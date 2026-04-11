import { Progress } from "@/components/ui/progress";

interface Macros {
  calories: number;
  proteins_g: number;
  carbs_g: number;
  lipids_g: number;
}

interface MacroDashboardProps {
  current: Macros;
  target?: Macros; // we make it optional
  patientName?: string;
}

export function MacroDashboard({ current, target, patientName }: MacroDashboardProps) {
  const isFreestyle = !target || target.calories === 0;

  // Helper function to calculate progress percentage safely
  const calcProgress = (curr: number, max: number) => {
    if (!max || max === 0) return 0;
    const percentage = (curr / max) * 100;
    return Math.min(percentage, 100); // Cap at 100% for the visual bar
  };

  // Helper to determine color based on how close we are to the limit
  const getProgressColor = (curr: number, max: number) => {
    if (!max) return "bg-primary";
    const ratio = curr / max;
    if (ratio > 1.05) return "bg-destructive"; // Over limit (Red)
    if (ratio > 0.96) return "bg-green-500";   // Perfect zone (Green)
    return "bg-primary";                       // Filling up (Standard)
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h3 className="font-semibold text-foreground">
          {isFreestyle ? "Plan Libre (Sin Límites)" : `Plan Nutricional: ${patientName}`}
        </h3>
        {!isFreestyle && (
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
            Límites Estrictos Activos
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* CALORIES */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Calorías</span>
            <span className="font-bold">
              {current.calories} {isFreestyle ? "kcal" : `/ ${target.calories} kcal`}
            </span>
          </div>
          {!isFreestyle && (
            <Progress 
              value={calcProgress(current.calories, target.calories)} 
              indicatorColor={getProgressColor(current.calories, target.calories)}
              className="h-2"
            />
          )}
        </div>

        {/* PROTEINS */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Proteína</span>
            <span className="font-bold">
              {current.proteins_g} {isFreestyle ? "g" : `/ ${target.proteins_g} g`}
            </span>
          </div>
          {!isFreestyle && (
             <Progress 
               value={calcProgress(current.proteins_g, target.proteins_g)} 
               indicatorColor={getProgressColor(current.proteins_g, target.proteins_g)}
               className="h-2"
             />
          )}
        </div>

        {/* CARBS */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Carbohidratos</span>
            <span className="font-bold">
              {current.carbs_g} {isFreestyle ? "g" : `/ ${target.carbs_g} g`}
            </span>
          </div>
          {!isFreestyle && (
             <Progress 
               value={calcProgress(current.carbs_g, target.carbs_g)} 
               indicatorColor={getProgressColor(current.carbs_g, target.carbs_g)}
               className="h-2"
             />
          )}
        </div>

        {/* LIPIDS */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Lípidos</span>
            <span className="font-bold">
              {current.lipids_g} {isFreestyle ? "g" : `/ ${target.lipids_g} g`}
            </span>
          </div>
          {!isFreestyle && (
             <Progress 
               value={calcProgress(current.lipids_g, target.lipids_g)} 
               indicatorColor={getProgressColor(current.lipids_g, target.lipids_g)}
               className="h-2"
             />
          )}
        </div>

      </div>
    </div>
  );
}