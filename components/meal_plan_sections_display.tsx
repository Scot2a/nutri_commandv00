'use client'

import { useState, Dispatch } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Trash2, Plus, X } from 'lucide-react'
import { useMealStore, type Meal, type MealPlanFood } from '@/src/meal_store/use_meal_store'
import { getFoodCategoryColor } from '@/src/types/food'

interface MealSectionsDisplayProps {
  meals: Meal[]
}

const mealTypeConfig: Record<string, { label: string; color: string }> = {
  breakfast: { label: 'Breakfast', color: '#fbbf24' },
  lunch: { label: 'Lunch', color: '#60a5fa' },
  snack: { label: 'Snack', color: '#a78bfa' },
  dinner: { label: 'Dinner', color: '#fb7185' },
}


export function MealSectionsDisplay({meals}: MealSectionsDisplayProps) {
  const [addMealDialogOpen, setAddMealDialogOpen] = useState(false)

  const removeFoodFromMeal = useMealStore((state) => state.removeFoodFromMeal)
  const deleteMeal = useMealStore((state) => state.deleteMeal)
  const addMeal = useMealStore((state) => state.addMeal)
  const calculateTotalWeight = (foods: MealPlanFood[]) => {
    return foods.reduce((acc, food) => acc + food.amount_g_ml * food.quantity, 0)
  }

  const handleRemoveFood = (mealId: string, foodId: string) => {
    removeFoodFromMeal(mealId, foodId)    
    }

    
  const handleDeleteMeal = (mealId: string) => {
    deleteMeal(mealId)
  }

  const handleAddMeal = (mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    addMeal (mealType)
    setAddMealDialogOpen(false)
  }


  // Get meal labels with counters for snacks
  const getMealLabel = (meal: Meal) => {
    if (meal.type === 'snack') {
      const snackCount = meals.filter((m) => m.type === 'snack').indexOf(meal) + 1
      return `Snack ${snackCount}`
    }
    return mealTypeConfig[meal.type].label
  }

  // Check which meal types can be added
  const mealTypeList = Object.keys(mealTypeConfig) as Array<'breakfast' | 'lunch' | 'snack' | 'dinner'>
  const canAddMealType = (type: 'breakfast' | 'lunch' | 'snack' | 'dinner') => {
    if (type === 'snack') return true // Always allow snacks
    return !meals.some((m) => m.type === type) // Only one of each other type
  }
  const availableMealTypes = mealTypeList.filter(canAddMealType)

  return (
    <div className="space-y-4">
      {meals.map((meal) => {
        const config = mealTypeConfig[meal.type]
        const totalMacros = calculateTotalWeight(meal.foods)

        return (
          <Card key={meal.id} className="border-border bg-card overflow-hidden relative group">
            <CardHeader className="pb-3" style={{ borderLeftColor: config.color, borderLeftWidth: '4px' }}>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-medium text-foreground">
                    {getMealLabel(meal)}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    {meal.foods.length === 0 ? 'No foods added' : `${meal.foods.length} item(s)`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-sm">
                    {totalMacros.toFixed(1)}g
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteMeal(meal.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                    aria-label={`Remove ${config.label} section`}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4">
              {meal.foods.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No foods added yet
                </p>
              ) : (
                <div className="space-y-2">
                  {meal.foods.map((food) => {
                    const categoryColor = getFoodCategoryColor(food.categoryId)
                    const totalValue = food.amount_g_ml * food.quantity

                    return (
                      <div
                        key={food.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-secondary/20 group hover:bg-secondary/30 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-foreground">
                              {food.name}
                            </span>
                            <Badge
                              variant="outline"
                              className="text-xs"
                              style={{
                                backgroundColor: `${categoryColor}20`,
                                color: categoryColor,
                                borderColor: categoryColor,
                              }}
                            >
                              {food.categoryId}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium text-foreground">{food.quantity} ración(es)</span> 
                            {' '}• {totalValue.toFixed(1)}{food.unit} total 
                            <span className="opacity-70"> ({food.amount_g_ml}{food.unit}/ración)</span>
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFood(meal.id, food.id)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}

      {/* Add Meal Section Button */}
      <div className="pt-4 border-t border-border">
        <Button
          onClick={() => setAddMealDialogOpen(true)}
          className="w-full gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4" />
          Add Meal Section
        </Button>
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={addMealDialogOpen} onOpenChange={setAddMealDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Add Meal Section</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Select the type of meal section to add to your meal plan
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            {mealTypeList.map((type) => {
              const config = mealTypeConfig[type]
              const isDisabled = !canAddMealType(type)
              const snackCount =
                type === 'snack' ? meals.filter((m) => m.type === 'snack').length + 1 : null

              return (
                <button
                  key={type}
                  onClick={() => !isDisabled && handleAddMeal(type)}
                  disabled={isDisabled}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isDisabled
                      ? 'border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50'
                      : 'border-border bg-card hover:border-primary hover:bg-primary/5 text-foreground'
                  }`}
                >
                  <div className="font-semibold mb-1">
                    {type === 'snack' ? `Snack ${snackCount}` : config.label}
                  </div>
                  {isDisabled && type !== 'snack' && (
                    <div className="text-xs text-muted-foreground">Already added</div>
                  )}
                </button>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

