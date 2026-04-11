
import { create } from 'zustand'
import { ExchangeCategory, Micronutrients } from "@/src/types/food";

export interface MealPlanFood extends Record<string, unknown> {
  id: string;
  name: string;
  measure: string;
  amount_g_ml: number;
  unit: "g" | "cc" | "ml" ;
  proteins_g: number;
  lipids_g: number;
  carbs_g: number;
  calories: number;
  quantity: number;
  categoryId: ExchangeCategory;
  micros?: Micronutrients;
}

export interface Meal {
  id: string
  type: 'breakfast' | 'lunch' | 'snack' | 'dinner'
  foods: MealPlanFood[]
}

export interface MealPlan {
  id: string
  name: string
  date: string
  meals: Meal[]
  patientId?: string | null
}

// 2. Combine the State and the Actions into one Master Blueprint
interface MealStore {
  plans: MealPlan[]
  currentPlanId: string | null
  activePatientId: string |null
  
  // Actions
  createPlan: (date: string, patientId?: string) => void
  setCurrentPlan: (planId: string) => void
  setActivePatientId: (patientId:string | null) => void;
  addFoodToMeal: (mealId: string, food: MealPlanFood) => void
  removeFoodFromMeal: (mealId: string, foodId: string) => void
  updateFoodQuantity: (mealId: string, foodId: string, quantity: number) => void
  deletePlan: (planId: string) => void
  deleteMeal: (mealId: string) => void
  addMeal: (mealType: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void
}

// 3. Build the Store
export const useMealStore = create<MealStore>((set) => ({
  // Initial State
  plans: [],
  currentPlanId: null,
  activePatientId: null,

  setActivePatientId: (patientId) => set({ activePatientId: patientId}),

  // Functions (Actions)
  createPlan: (date, patientId) => set((state) => {
    const newPlan: MealPlan = {
      id: `plan-${Date.now()}`,
      name: `Plan nutricional - ${date}`,
      date: date,
      patientId: patientId || state.activePatientId,
      meals: [
        { id: `meal-breakfast-${Date.now()}`, type: 'breakfast', foods: [] },
        { id: `meal-lunch-${Date.now()}-1`, type: 'lunch', foods: [] },
        { id: `meal-snack-${Date.now()}-1`, type: 'snack', foods: [] },
        { id: `meal-dinner-${Date.now()}`, type: 'dinner', foods: [] },
      ],
    }
    return {
      plans: [...state.plans, newPlan],
      currentPlanId: newPlan.id,
    }
  }),

  setCurrentPlan: (planId) => set({ currentPlanId: planId }),

  addFoodToMeal: (mealId, food) => set((state) => ({
    plans: state.plans.map((plan) => {
      if (plan.id === state.currentPlanId) {
        return {
          ...plan,
          meals: plan.meals.map((meal) =>
            meal.id === mealId
              ? { ...meal, foods: [...meal.foods, food] }
              : meal
          ),
        }
      }
      return plan
    }),
  })),

  removeFoodFromMeal: (mealId, foodId) => set((state) => ({
    plans: state.plans.map((plan) => {
      if (plan.id === state.currentPlanId) {
        return {
          ...plan,
          meals: plan.meals.map((meal) =>
            meal.id === mealId
              ? { ...meal, foods: meal.foods.filter((f) => f.id !== foodId) }
              : meal
          ),
        }
      }
      return plan
    }),
  })),

  updateFoodQuantity: (mealId, foodId, quantity) => set((state) => ({
    plans: state.plans.map((plan) => {
      if (plan.id === state.currentPlanId) {
        return {
          ...plan,
          meals: plan.meals.map((meal) =>
            meal.id === mealId
              ? {
                  ...meal,
                  foods: meal.foods.map((f) =>
                    f.id === foodId ? { ...f, quantity } : f
                  ),
                }
              : meal
          ),
        }
      }
      return plan
    }),
  })),

  deletePlan: (planId) => set((state) => {
    const updatedPlans = state.plans.filter((plan) => plan.id !== planId)
    //const newCurrentPlanId =
      state.currentPlanId === planId
        ? updatedPlans.length > 0
          ? updatedPlans[0].id
          : null
        : state.currentPlanId
    return {
      plans: updatedPlans,
      currentPlanId: state.currentPlanId === planId ? (updatedPlans[0]?.id || null) : state.currentPlanId,
      //newCurrentPlanId
    }
  }),

  deleteMeal: (mealId) => set((state) => ({
    plans: state.plans.map((plan) => {
      if (plan.id === state.currentPlanId) {
        return {
          ...plan,
          meals: plan.meals.filter((meal) => meal.id !== mealId),
        }
      }
      return plan
    }),
  })),

  addMeal: (mealType) => set((state) => ({
    plans: state.plans.map((plan) => {
      if (plan.id === state.currentPlanId) {
        const newMeal: Meal = {
          id: `meal-${mealType}-${Date.now()}`,
          type: mealType,
          foods: [],
        }
        return {
          ...plan,
          meals: [...plan.meals, newMeal],
        }
      }
      return plan
    }),
  })),
}))