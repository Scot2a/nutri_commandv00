'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { usePatientStore } from "@/src/patient_store/use_patient_store"
import { useMealStore } from "@/src/meal_store/use_meal_store"

export function DashboardDailyProgress() {
  const activePatientId = useMealStore((state) => state.activePatientId)
  const patients = usePatientStore((state) => state.patients)
  const plans = useMealStore((state) => state.plans)
  
  // Get active patient and their targets
  const activePatient = patients.find(p => p.id === activePatientId)
  const latestRecord = activePatient?.records[activePatient.records.length - 1]
  
  // If no patient is selected, let's use some mock data for the dashboard preview
  const target = latestRecord?.macros || { calories: 2000, proteins_g: 150, carbs_g: 250, lipids_g: 70 }
  const patientName = activePatient?.name || "Demo Patient"

  // Calculate current intake from the active plan
  const currentPlan = plans.find(p => p.patientId === activePatientId) || plans[plans.length - 1]
  const current = React.useMemo(() => {
    const totals = { calories: 0, proteins_g: 0, carbs_g: 0, lipids_g: 0 }
    if (!currentPlan) return totals;

    currentPlan.meals.forEach(meal => {
      meal.foods.forEach(food => {
        totals.calories += (food.calories * food.quantity)
        totals.proteins_g += (food.proteins_g * food.quantity)
        totals.carbs_g += (food.carbs_g * food.quantity)
        totals.lipids_g += (food.lipids_g * food.quantity)
      })
    })
    return totals
  }, [currentPlan])

  // Helper to calculate percentages safely
  const getPercentage = (current: number, target: number) => Math.min(100, Math.max(0, (current / (target || 1)) * 100))

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-foreground">Daily Progress</CardTitle>
          <span className="text-xs text-muted-foreground bg-secondary/20 px-2 py-1 rounded-md">
            {patientName}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-4">
        
        {/* Calories Master Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium text-foreground">Total Intake</span>
            <span className="text-muted-foreground">{current.calories.toFixed(0)} / {target.calories} kcal</span>
          </div>
          {/* Using a custom gradient or your primary color for the main progress */}
          <Progress value={getPercentage(current.calories, target.calories)} className="h-3 bg-secondary" />
        </div>

        {/* Macros Breakdown */}
        <div className="space-y-4 pt-2">
          {/* Proteins */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Proteins</span>
              </div>
              <span className="font-medium text-foreground">{current.proteins_g.toFixed(0)} / {target.proteins_g} g</span>
            </div>
            <Progress value={getPercentage(current.proteins_g, target.proteins_g)} className="h-1.5 bg-secondary [&>div]:bg-emerald-500" />
          </div>

          {/* Carbohydrates */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-muted-foreground">Carbohydrates</span>
              </div>
              <span className="font-medium text-foreground">{current.carbs_g.toFixed(0)} / {target.carbs_g} g</span>
            </div>
            <Progress value={getPercentage(current.carbs_g, target.carbs_g)} className="h-1.5 bg-secondary [&>div]:bg-blue-500" />
          </div>

          {/* Lipids */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-muted-foreground">Lipids</span>
              </div>
              <span className="font-medium text-foreground">{current.lipids_g.toFixed(0)} / {target.lipids_g} g</span>
            </div>
            <Progress value={getPercentage(current.lipids_g, target.lipids_g)} className="h-1.5 bg-secondary [&>div]:bg-orange-500" />
          </div>
        </div>

      </CardContent>
    </Card>
  )
}