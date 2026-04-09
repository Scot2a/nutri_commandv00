
import { Progress } from "@/components/ui/progress";

interface Macros{
    calories: number;
    proteins_g: number;
    carbs_g: number;
    lipids_g: number;

}

interface MacroDashboardProps{
    current: Macros;
    target?: Macros; 
    patientName?: string;

}

export function MacroDashboardProps({ current, target, patientName}: MacroDashboardProps) {
    const isFreestyle = !target || target.calories === 0;
    const calcProgress = (curr: number, max: number) => {
        if (!max || max === 0) return 0;
        const percentage = (curr / max * 100);
            return Math.min(percentage, 100);
    }

    const getProgressColor  = (curr: number, max: number) => {
        if (!max) return "bg-primary";
        const ratio = curr / max;
        if (ratio > 1.05) return "bg-destructive"; 
        if (ratio > 0.96) return "bg-green-500";
        return "bg-primary"
    }

    return (
        <div className="bg-card border border-border rounded-xl p-4 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className=" font-semibold text-foreground">
                    {isFreestyle ? "Plan libre (Sin límites)" : `Plan nutricional: ${patientName}`}
                </h3>
                {!isFreestyle && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        Límites estrictos activos
                    </span>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/*CALORES */}

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
                    )}
                </div>

            </div>
        </div>
    )

}
