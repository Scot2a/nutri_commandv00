'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import  { MealPlanFood, useMealStore, type Meal } from '@/src/meal_store/use_meal_store'
import { foodCategories, type FoodItem } from '@/src/types/food'
import { usePatientStore } from "@/src/patient_store/use_patient_store";
import { getFoodbyCategory } from '@/app/(dashboard)/dashboard/database'
import { MacroDashboard } from "@/components/macro_dashboard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FoodSearch } from "@/components/food-search"

interface MealPlanBuilderProps {
  meals: Meal[]
}

const mealTypeConfig = {
  breakfast: { label: "Desayuno", color: '#fbbf24' },
  lunch: { label: "Almuerzo", color: '#60a5fa' },
  snack: { label: "Merienda", color: '#a78bfa' },
  dinner: { label: "Cena", color: '#fb7185' },
}

export function MealPlanBuilder({ meals }: MealPlanBuilderProps) {

  const plans = useMealStore((state) => state.plans);
  const currentPlanId = useMealStore((state) => state.currentPlanId);
  const activePatientId = useMealStore ((state) => state.activePatientId);
  const setActivePatientId = useMealStore((state) => state.setActivePatientId);
  const currentPlan = plans.find(p => p.id ===currentPlanId);
  const activeMeals = currentPlan?.meals || [];
  const patients = usePatientStore((state) => state.patients);
  const activePatient = patients.find(p => p.id === activePatientId);
  const latestRecord = activePatient?.records[activePatient.records.length - 1];
  const targetMacros = latestRecord?.macros; 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState<string>(meals[0]?.id || '')
  const [stagedCart, setStagedCart] = useState<Record<string, number>> ({})

  const addFoodToMeal = useMealStore((state) => state.addFoodToMeal)



const currentPlanTotals = React.useMemo(() => {
    const totals = { calories: 0, proteins_g: 0, carbs_g: 0, lipids_g: 0 };
    
    activeMeals.forEach(meal => {
      meal.foods.forEach(food => {
        totals.calories += (food.calories * food.quantity);
        totals.proteins_g += (food.proteins_g * food.quantity);
        totals.carbs_g += (food.carbs_g * food.quantity);
        totals.lipids_g += (food.lipids_g * food.quantity);
      });
    });
    
    return totals;
  }, [activeMeals]);


  const handleCardClick = (foodId: string) => {
    setStagedCart((prev) => ({
      ...prev,
      [foodId]: (prev[foodId] || 0) +1,
    }))
  }

  const handleRemoveFromCart = (foodId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setStagedCart((prev) => {
      const newCart = { ...prev}
      delete newCart[foodId]
      return newCart
    })
  }

  const handleCommitCart = () => {
  if (!selectedMealId || Object.keys(stagedCart).length === 0) return

  // We loop through the cart to add every selected item
  Object.entries(stagedCart).forEach(([foodId, qty]) => {
    //we search around all categories to find the food item
    //this fixes the problem we had with only selected what was on the window
    let foodItem: FoodItem | undefined; 
    for (const category of foodCategories) {
      foodItem = getFoodbyCategory(category.id).find(f => f.id === foodId);
      if (foodItem) break; //we stop searching other categories when the item is found
    }
    
    if (foodItem) {
      addFoodToMeal(selectedMealId, {
        ...foodItem,
        quantity: qty,
      })
    } else{
      console.warn(`Food item with ID ${foodId} not found in database.`);
    }
  })

  // Reset everything
  setStagedCart({})
  setDrawerOpen(false)
}

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between bg-secondary/5 p-4 rounded-lg border border-border">
      <div className="space-y-1">
        <label className="text-xs font-bold uppercase text-muted-foreground">Vincular Paciente</label>
        <Select 
          value={activePatientId || ""} 
          onValueChange={(id) => setActivePatientId(id)}
        >
          <SelectTrigger className="w-[280px] bg-card">
            <SelectValue placeholder="Seleccionar un paciente..." />
          </SelectTrigger>
          <SelectContent>
            {patients.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/*The SAVE BUTTON */}
      
    </div>

    {/**THIS IS MACRODASHBOARD */}
    <MacroDashboard 
    current={currentPlanTotals}
    target={targetMacros}
    patientName={activePatient?.name}
    />
    </div>
      <Card className="border-border bg-card sticky top-4">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg text-foreground">Add Foods</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Meal Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Select Meal Section</label>
            <div className="grid grid-cols-2 gap-2">
              {meals.map((meal) => {
                const config = mealTypeConfig[meal.type]
                return (
                  <button
                    key={meal.id}
                    onClick={() => setSelectedMealId(meal.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedMealId === meal.id
                        ? 'text-white'
                        : 'bg-secondary/10 text-foreground hover:bg-secondary/20'
                    }`}
                    style={
                      selectedMealId === meal.id
                        ? { backgroundColor: config.color }
                        : {}
                    }
                  >
                    {config.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Open Drawer Button */}
          <Button
            onClick={() => setDrawerOpen(true)}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Select Food
          </Button>
          <Button 
        variant="default" 
        className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
        onClick={() => {
          // Since Zustand saves in real-time, this can be a navigation or success toast
          console.log("Plan guardado exitosamente");
          alert("Plan Nutricional Guardado Correctamente");
        }}
      >
        Guardar Cambios del Plan
      </Button>
        </CardContent>
      </Card>

      {/* Food Selection Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-card border-border max-h-[90vh]">
          <DrawerHeader>
            <DrawerTitle className="text-foreground">Select Food</DrawerTitle>
            <DrawerDescription>
              Search for foods by name or browse by category
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 flex-1 overflow-hidden">
            <FoodSearch
              stagedCart={stagedCart}
              onAddToCart={handleCardClick}
              onRemoveFromCart={(foodId) => handleRemoveFromCart(foodId, { stopPropagation: () => {} } as React.MouseEvent)}
              onSelectFood={() => {}}
            />
          </div>

          <DrawerFooter className="border-t border-border pt-4">
            <Button
              onClick={handleCommitCart}
              disabled={Object.keys(stagedCart).length === 0}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Add {Object.keys(stagedCart).length} Item(s)
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" onClick={() => setStagedCart ({})} className="border-border">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
