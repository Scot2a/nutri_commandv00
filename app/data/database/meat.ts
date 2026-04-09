
import { FoodItem } from "@/src/types/food";

const MACROS = {
    MAGRA: { proteins_g: 7, lipids_g: 3, carbs_g: 0, fiber_g: 0, calories: 55},
    SEMI_GORDAS: {proteins_g: 7, lipids_g: 5, carbs_g: 0,  fiber_g: 0, calories: 75},
    GORDAS: {proteins_g: 7, lipids_g: 8, carbs_g: 0, fiber_g: 0, calories: 100},
}

export const meatDatabase: FoodItem[] = [
    // Hunting animals
    {
        id: "faisan-sin-piel",
        name: "Faisán sin piel",
        categoryId: "meat",
        subCategoryId: "magra",
        measure: "1 trozo pequeño (2 cucharadas)",
        amount_g_ml: 30, 
        unit: "cc",
        ...MACROS.MAGRA,
        micros: {}
    },
    {
    id: "venado",
    name: 'Venado',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'bufalo',
    name: 'Búfalo',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'conejo',
    name: 'Conejo',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'ave-blanca-sin-piel',
    name: 'Pollo, gallina o pavo (carne blanca sin piel)',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'pescado-magro',
    name: 'Pescado fresco/congelado (Lenguado, Bacalao, Atún)',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'sardina-fresca',
    name: 'Sardina fresca',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '5 unidades',
    amount_g_ml: 35,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'claras-huevo',
    name: 'Claras de huevo',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '2 unidades',
    amount_g_ml: 50,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'pechuga-pavo-pollo-lonja',
    name: 'Pechuga de pavo o pollo (jamón)',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 lonja gruesa o 2 finas',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'mariscos-magros',
    name: 'Mariscos (Almejas, langosta, camarón)',
    categoryId: 'meat',
    subCategoryId: 'magra',
    measure: '1 trozo pequeño',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'queso-parmesano-rallado',
    name: 'Queso Parmesano rallado',
    categoryId: 'dairy',
    subCategoryId: 'magra',
    measure: '1 cucharada rasa',
    amount_g_ml: 15,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },
  {
    id: 'requeson',
    name: 'Requesón',
    categoryId: 'dairy',
    subCategoryId: 'magra',
    measure: '1/4 taza',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.MAGRA,
    micros: {}
  },

  // --- CARNES SEMIGORDAS ---
  {
    id: 'cordero-costilla',
    name: 'Cordero (costilla)',
    categoryId: 'meat',
    subCategoryId: 'semigorda',
    measure: '1 trozo pequeño',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'ave-oscura-con-piel',
    name: 'Pollo, gallina o pavo (carne oscura con piel)',
    categoryId: 'meat',
    subCategoryId: 'semigorda',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'res-general',
    name: 'Carne de res (cortes estándar)',
    categoryId: 'meat',
    subCategoryId: 'semigorda',
    measure: '1 trozo pequeño (2 cdas)',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'cerdo-lomo',
    name: 'Lomo de cerdo',
    categoryId: 'meat',
    subCategoryId: 'semigorda',
    measure: '1 trozo pequeño',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'huevo-entero',
    name: 'Huevo entero',
    categoryId: 'meat',
    subCategoryId: 'semigorda',
    measure: '1 unidad',
    amount_g_ml: 50,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'queso-mozzarella',
    name: 'Queso Mozzarella / Búfala',
    categoryId: 'dairy',
    subCategoryId: 'semigorda',
    measure: '1 reb gruesa o 2 finas',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'queso-blanco-suave',
    name: 'Queso Guayanés, Ricotta o Cuajada',
    categoryId: 'dairy',
    subCategoryId: 'semigorda',
    measure: '1/4 taza',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },
  {
    id: 'queso-paisa-varios',
    name: 'Queso Primavera, Palmita, Paisa',
    categoryId: 'dairy',
    subCategoryId: 'semigorda',
    measure: '1 rebanada',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.SEMI_GORDAS,
    micros: {}
  },

  // --- CARNES GORDAS ---
  {
    id: 'bologna',
    name: 'Bologna',
    categoryId: 'meat',
    subCategoryId: 'gorda',
    measure: '1 rebanada',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.GORDAS,
    micros: {}
  },
  {
    id: 'salami',
    name: 'Salami',
    categoryId: 'meat',
    subCategoryId: 'gorda',
    measure: '5 rebanadas',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.GORDAS,
    micros: {}
  },
  {
    id: 'salchicha',
    name: 'Salchicha',
    categoryId: 'meat',
    subCategoryId: 'gorda',
    measure: '1 unidad regular',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.GORDAS,
    micros: {}
  },
  {
    id: 'queso-amarillo-gouda',
    name: 'Queso amarillo tipo Gouda',
    categoryId: 'dairy',
    subCategoryId: 'gorda',
    measure: '1 reb gruesa o 2 finas',
    amount_g_ml: 30,
    unit: 'cc',
    ...MACROS.GORDAS,
    micros: {}
  }

]
