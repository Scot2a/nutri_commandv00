import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

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
    return "bg-blue-500";                       // Filling up (Standard)
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm mb-6">
      <div className="flex flex-row justify-between items-start sm:items-center mb-6 gap-4 border-b pb-4">
        <div>
          <h3 className="font-semibold text-foreground">
            {isFreestyle ? "Plan Libre (Sin Límites)" : `Plan Nutricional: ${patientName}`}
          </h3>
          <p className="text-xs text-muted-foreground">Seguimiento nutricional en tiempo real</p>
        </div>
        {!isFreestyle && (
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            Límites Clínicos Activos
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        
      {[
          { label: "Calorías", value: current.calories, max: target?.calories, unit: "kcal" },
          { label: "Proteína", value: current.proteins_g, max: target?.proteins_g, unit: "g" },
          { label: "Carbs", value: current.carbs_g, max: target?.carbs_g, unit: "g" },
          { label: "Lípidos", value: current.lipids_g, max: target?.lipids_g, unit: "g" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col gap-2">
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {item.label}
              </span>
              <div className="text-right">
                <span className="text-sm font-bold text-foreground">{item.value}</span>
                <span className="text-[10px] ml-1 text-muted-foreground">
                  {isFreestyle ? item.unit : `/ ${item.max}${item.unit}`}
                </span>
              </div>
            </div>
            {/* The progress bar now stays visible but empty if in Freestyle */}
            <Progress 
              value={!isFreestyle ? (item.value / item.max!) * 100 : 0} 
              className={`h-2 ${!isFreestyle ? getProgressColor(item.value, item.max!) : "bg-primary/20"}`}
              style={{ color: 'inherit' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}  

        {/* CALORIES */}
        {/*}
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
              className={`h-2 ${getProgressColor(current.calories, target.calories)} [&>div]:bg-current`}
              style={{ color: 'inherit' }} // This ensures the 'bg-current' knows what color to use
            />
          )}
        </div>

        
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
               className={`h-2 ${getProgressColor(current.proteins_g, target.proteins_g)} [&>div]:bg-current`}
                style={{ color: 'inherit' }}
             />
          )}
        </div>

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
               className={`h-2 ${getProgressColor(current.carbs_g, target.carbs_g)} [&>div]:bg-current`}
                style={{ color: 'inherit' }}
             />
          )}
        </div>

        
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
               className={`h-2 ${getProgressColor(current.lipids_g, target.lipids_g)} [&>div]:bg-current`}
                style={{ color: 'inherit' }}
             />
          )}
        </div>

      </div>
    </div>
  );
} */}