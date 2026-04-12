'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useMealStore } from '@/src/meal_store/use_meal_store'
import { usePatientStore } from "@/src/patient_store/use_patient_store"
import { Calendar, Utensils } from 'lucide-react'

export function DashboardRecentPlans() {
  const plans = useMealStore((state) => state.plans)
  const patients = usePatientStore((state) => state.patients)
  
  // Get the 3 most recent plans
  const recentPlans = [...plans].reverse().slice(0, 3)

  return (
    <Card className="border-border bg-card h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-foreground">Recent Meal Plans</CardTitle>
          <Badge variant="outline" className="bg-secondary/10">
            {plans.length} Total
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {recentPlans.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            No meal plans created yet.
          </div>
        ) : (
          <div className="space-y-3">
            {recentPlans.map((plan) => {
              const patientName = patients.find(p => p.id === plan.patientId)?.name || "Unassigned"
              const totalItems = plan.meals.reduce((acc, meal) => acc + meal.foods.length, 0)
              
              return (
                <div key={plan.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors border border-border/50">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground leading-none">{plan.name}</p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {plan.date}
                      </span>
                      <span className="flex items-center gap-1 text-primary">
                        • {patientName}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                      {plan.meals.length} Meals
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Utensils className="w-3 h-3" /> {totalItems} items
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}