'use client'

import React, { useState, Dispatch } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
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
import { Plus, X } from 'lucide-react'
import  { MealPlanFood, useMealStore, type Meal } from '@/src/meal_store/use_meal_store'
import { foodCategories, getFoodCategoryColor, type FoodItem } from '@/src/types/food'
import { usePatientStore } from "@/src/patient_store/use_patient_store";
import { getFoodbyCategory } from '@/app/data/database'
import { MacroDashboard } from "@/components/macro_dashboard";
import { access } from 'fs'

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
  {/**const currentPlanTotals = React.useMemo(() => {
    return meals.reduce (access, meal( => {
      const foodsInMeal = mealTypeConfig.foods || [];
      foodsInMeal.forEach((food:MealPlanFood) =>{
        acc.calories += (food.calories * food.quantity);
        acc.proteins_g += (food.proteins_g * food.quantity);
        acc.carbs_g =+ (food.carbs_g * food.quantity);
        acc.lipids_g =+ (food.lipids_g * food.quantity);
      });
      return acc;
    }, { calories: 0, proteins_g: 0. carbs_g: 0, lipids_g: 0}); 
  })
  }); */}
  const plans = useMealStore((state) => state.plans);
  const currentPlanId = useMealStore((state) => state.currentPlanId);
  const activePatientId = useMealStore ((state) => state.activePatientId);
  const currentPlan = plans.find(p => p.id ===currentPlanId);
  const activeMeals = currentPlan?.meals || [];
  const patients = usePatientStore((state) => state.patients);
  const activePatient = patients.find(p => p.id === activePatientId);
  const latestRecord = activePatient?.records[activePatient.records.length - 1];
  const targetMacros = latestRecord?.macros; 
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(foodCategories[0].id)
  const [selectedMealId, setSelectedMealId] = useState<string>(meals[0]?.id || '')
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [stagedCart, setStagedCart] = useState<Record<string, number>> ({})

  const addFoodToMeal = useMealStore((state) => state.addFoodToMeal)
  const categoryFoods = getFoodbyCategory(selectedCategory)
  const categoryColor = getFoodCategoryColor(selectedCategory)

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

const handleAddFood = () => {
    if (selectedFood && selectedMealId) {
      
      // 5. USING ZUSTAND: No more dispatch! Just pass the ID and the food data.
      // We spread (...) the selectedFood to keep its exact macros and details, and add the quantity.
      const foodToSave: MealPlanFood = {
        ...selectedFood,
       quantity: quantity,
      };
      
      addFoodToMeal(selectedMealId, foodToSave)

      setDrawerOpen(false)
      setQuantity(1)
      setSelectedFood(null)
    }
  }
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
    // IMPORTANT: Make sure you use the category foods or a global search
    // Using a flat find is safer here
    const foodItem = getFoodbyCategory(selectedCategory).find(f => f.id === foodId)
    
    if (foodItem) {
      addFoodToMeal(selectedMealId, {
        ...foodItem,
        quantity: qty,
      })
    }
  })

  // Reset everything
  setStagedCart({})
  setDrawerOpen(false)
}

  return (
    <>
    <div className="max-w-6xl mx-auto p-6">
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
        </CardContent>
      </Card>

      {/* Food Selection Drawer */}
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="bg-card border-border max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle className="text-foreground">Select Food</DrawerTitle>
            <DrawerDescription>
              Choose a food item to add to your meal
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4 flex flex-col gap-4 flex-1 overflow-hidden">
            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid grid-cols-3 w-full gap-1 bg-secondary/10">
                {foodCategories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="text-xs data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Food List */}
              {foodCategories.map((category) => {
                const foods = getFoodbyCategory(category.id);
                return (
                <TabsContent key={category.id} value={category.id} className="mt-4">
                   <ScrollArea className="h-[500px] rounded-lg border border-border p-4 mt-4">
                  {foods.length === 0 ? (
                    <p className="p-8 text-center text-muted-foreground">No se han encontrado alimentos en {category.name}</p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      {/*{foods.map(food => ( ... ))}*/}
                    </div>
                  )}
                    {/* The Responsive Grid: 2 cols on mobile, up to 6 on massive screens */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                      
                      {getFoodbyCategory(category.id).map((food: FoodItem) => {
                        const quantity = stagedCart[food.id] || 0;
                        const isSelected = quantity > 0;

                        return (
                          <div
                            key={food.id}
                            onClick={() => handleCardClick(food.id)}
                            className={`relative group cursor-pointer rounded-lg border-2 p-2 transition-all hover:shadow-md ${
                              isSelected 
                                ? 'border-primary bg-primary/5' 
                                : 'border-transparent bg-secondary/20 hover:border-primary/30'
                            }`}
                          >
                            {/* Top Right 'X' to clear selection */}
                            {isSelected && (
                              <button
                                onClick={(e) => handleRemoveFromCart(food.id, e)}
                                className="absolute top-1 right-1 z-10 rounded-full bg-destructive/80 p-1 text-white hover:bg-destructive shadow-sm"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            )}

                            {/* Top Left Badge showing current quantity (rations) */}
                            {isSelected && (
                              <div className="absolute top-1 left-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
                                {quantity}
                              </div>
                            )}

                            {/* Image Placeholder (aspect-square) */}
                            <div className="aspect-square w-full rounded-md bg-secondary/40 mb-3 flex items-center justify-center text-center p-2 group-hover:opacity-80 transition-opacity">
                              <span className="text-xs text-muted-foreground font-medium">
                                {food.measure}
                              </span>
                            </div>

                            {/* Text Content Below Image */}
                            <div>
                              <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                                {food.name}
                              </h3>
                              <p className="mt-1 text-xs font-medium text-muted-foreground">
                                {food.amount_g_ml}{food.unit}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </TabsContent>
                );
              })}
            </Tabs>
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
