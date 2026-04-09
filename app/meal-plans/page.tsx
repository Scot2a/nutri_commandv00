"use client"

import { useReducer, useState } from 'react'
import { DashboardSidebar, MobileHeader } from '@/components/dashboard_sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, X } from 'lucide-react'
import { useMealStore  } from '@/src/meal_store/use_meal_store'
import { MealPlanBuilder } from '@/components/meal_plan_builder'
import { MealSectionsDisplay } from '@/components/meal_plan_sections_display'

export default function MealPlansPage() {
  
    const { plans, currentPlanId, setCurrentPlan, createPlan, deletePlan } = useMealStore()
    const currentPlan = plans.find((p) => p.id === currentPlanId)

  const handleCreatePlan = () => {
    // If your createPlan action takes a name/date, you can pass it here
    createPlan(`Plan ${plans.length + 1}`)
  }

  
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <MobileHeader />

      <main className="lg:ml-64">
        {/* Desktop Header */}
        <header className="hidden lg:flex items-center justify-between p-6 border-b border-border">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Meal Plans</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Create and manage meal plans for your patients
            </p>
          </div>
          <Button
            onClick={handleCreatePlan}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Meal Plan
          </Button>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-6 space-y-6">
          {plans.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="pt-12 pb-12 text-center">
                <p className="text-muted-foreground mb-4">No meal plans created yet</p>
                <Button onClick={handleCreatePlan}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Meal Plan
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* Plan Selector Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative p-4 rounded-lg border-2 transition-all group cursor-pointer ${
                      currentPlanId === plan.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-card hover:border-primary/50'
                    }`}
                  >
                    <button
                      onClick={() => setCurrentPlan(plan.id)}
                      className="w-full text-left"
                    >
                      <h3 className="font-semibold text-foreground">{plan.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{plan.date}</p>
                      <Badge variant="secondary" className="mt-3">
                        {plan.meals.length} Section(s)
                      </Badge>
                    </button>
                    
                    {/* Delete Plan Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deletePlan(plan.id)
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={handleCreatePlan}
                  className="p-4 rounded-lg border-2 border-dashed border-border hover:bg-primary/5 transition-all flex items-center justify-center"
                >
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              {/* Current Plan Editor */}
              {currentPlan && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-border">
                  {/* Food Selector Drawer */}
                  <div className="lg:col-span-1">
                    {/* CLEANED PROPS: No more dispatch! */}
                    <MealPlanBuilder meals={currentPlan.meals} />
                  </div>

                  {/* Meal Sections */}
                  <div className="lg:col-span-2">
                    {/* CLEANED PROPS: No more dispatch! */}
                    <MealSectionsDisplay meals={currentPlan.meals} />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  )
}

