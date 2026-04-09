'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface MacroTotals {
  proteins: number
  carbs: number
  lipids: number
  total: number
}

interface FoodProgressProps {
  macroTotals: MacroTotals
  estimatedCalories: number
}

const macroLimits = {
  proteins: 150,
  carbs: 250,
  lipids: 70,
}

const macroProgress = (totals: MacroTotals) => [
  { name: 'Proteins', current: totals.proteins, limit: macroLimits.proteins, color: '#4ade80', unit: 'g' },
  { name: 'Carbohydrates', current: totals.carbs, limit: macroLimits.carbs, color: '#38bdf8', unit: 'g' },
  { name: 'Lipids', current: totals.lipids, limit: macroLimits.lipids, color: '#f97316', unit: 'g' },
]

export function FoodProgress({ macroTotals, estimatedCalories }: FoodProgressProps) {
  const totalLimit = 2000
  const totalPercentage = Math.min((estimatedCalories / totalLimit) * 100, 100)
  const macros = macroProgress(macroTotals)

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground">Daily Progress</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-foreground font-medium">Total Intake</span>
            <span className="text-muted-foreground">
              {estimatedCalories} / {totalLimit} kcal
            </span>
          </div>
          <div className="relative h-4 rounded-full bg-secondary overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{ 
                width: `${totalPercentage}%`,
                background: 'linear-gradient(90deg, #4ade80 0%, #38bdf8 50%, #f97316 100%)'
              }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.round(totalPercentage)}% of daily goal</span>
            <span>{Math.max(0, totalLimit - estimatedCalories)} kcal remaining</span>
          </div>
        </div>

        {/* Individual Macros */}
        <div className="space-y-4 pt-2">
          {macros.map((macro) => {
            const percentage = Math.min((macro.current / macro.limit) * 100, 100)
            const isNearLimit = percentage >= 85
            
            return (
              <div key={macro.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: macro.color }}
                    />
                    <span className="text-sm text-foreground">{macro.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {macro.current} / {macro.limit} {macro.unit}
                  </span>
                </div>
                <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: macro.color
                    }}
                  />
                </div>
                {isNearLimit && (
                  <p className="text-xs text-accent">
                    Approaching daily limit
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
