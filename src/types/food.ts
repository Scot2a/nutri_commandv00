
export type ExchangeCategory = 
  | 'dairy' 
  | 'vegetables' 
  | 'fruits' 
  | 'carbs' 
  | 'meat' 
  | 'fats';

  export interface FoodCategory{
    id: ExchangeCategory;
    name: string;
    color: string;
  }

  // Allowing for sub-categorization helps with precise macro filtering

export type DairySubCategory = 
  | 'muy_baja_grasa' 
  | 'baja_grasa' 
  | 'semidescremada' 
  | 'entera' 
  | 'deslactosada';

  export type CarbsSubCategory = 
  | "cereales"
  | "tuberculos_platano"
  | "leguminosas"
  | "panes"
  | "galletas"
  | "otros"

  export type MeatSubCategory = 
  | "magra"
  | "semi_gorda"
  | "gorda"

  export type FatsSubCategory =   
  | "grasas_monoinsaturadas"
  | "grasas_poliinsaturadas"
  | "grasas_saturadas"

export interface Micronutrients {
  calcium_mg?: number;
  iron_mg?: number;
  sodium_mg?: number;
  selenium_mcg?: number;
  potassium_mg?: number;
  phosphorus_mg?: number;

}

export const foodCategories: FoodCategory[] = [
  { id: 'dairy', name: "Lácteos", color: "#FFB6C1" },
  { id: 'vegetables', name: "Vegetales", color: "#90EE90" },
  { id: 'fruits', name: "Frutas", color: "#FFD700" },
  { id: "carbs", name: "Cereales", color: "#DEB887" },
  { id: "meat", name: "Proteinas", color: "#4ade80" },
  { id: "fats", name: "Grasas", color: "#FF6347" },
]
export const getFoodCategoryColor = (categoryId: string): string => {
  const category = foodCategories.find(cat => cat.id ===categoryId);
  return category ? category.color: "#94a3b8";
}

export interface FoodItem {
  id: string;
  name: string;
  categoryId: ExchangeCategory;
  subCategoryId?: string;
  
  // Measure for EXACTLY 1 exchange/ration
  measure: string; 
  amount_g_ml: number; 
  unit: 'g' | 'cc' | 'ml';
  
  // Base macros per 1 exchange
  proteins_g: number;
  lipids_g: number;
  carbs_g: number;
  calories: number;
  fiber_g: number;

  // Optional micros for clinical precision
  micros?: Micronutrients;
}