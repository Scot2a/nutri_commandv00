
import { FoodItem } from "@/src/types/food";

const MACROS= {
    FRUTAS: {proteins_g: 0, lipids_g: 0, carbs_g: 15, fiber_g: 2, calories: 60}
}

export const fruitsDatabase: FoodItem [] = [
    // --- FRUTAS FRESCAS (POR UNIDADES) ---

  {
    id: "cambur-guineo",
    name: "Cambur guineo",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1/2 unidad",
    amount_g_ml: 90,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "grapefruit-toronja",
    name: "Grapefruit / Toronja",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1/2 unidad",
    amount_g_ml: 180,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "manzana-con-piel",
    name: "Manzana con piel",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña o 1/2 grande",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "pera",
    name: "Pera",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña o 1/2 grande",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "cambur-manzano",
    name: "Cambur manzano",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña",
    amount_g_ml: 90,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "kiwi",
    name: "Kiwi",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "mango-unidad",
    name: "Mango (unidad)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña",
    amount_g_ml: 190,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "naranja",
    name: "Naranja",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad pequeña",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "mandarina",
    name: "Mandarina",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad mediana",
    amount_g_ml: 130,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "guayaba-rosada",
    name: "Guayaba rosada",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 unidad mediana",
    amount_g_ml: 200,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "durazno",
    name: "Durazno / Melocotón",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "2 unidades pequeñas",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "ciruela-huesito",
    name: "Ciruela de huesito",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "8 unidades",
    amount_g_ml: 90,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "uvas",
    name: "Uvas",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "12 unidades medianas",
    amount_g_ml: 90,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  }, 
  // --- FRUTAS POR TAZAS / CUBOS ---

  {
    id: "pina",
    name: "Piña",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "3/4 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "mora",
    name: "Mora",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "3/4 taza",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "fresas",
    name: "Fresas",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 taza",
    amount_g_ml: 180,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "mamon",
    name: "Mamón",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 taza",
    amount_g_ml: 90,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "melon-verde",
    name: "Melón verde",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 1/2 taza",
    amount_g_ml: 200,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "lechosa-cubos",
    name: "Lechosa (en cubos)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "2 tazas",
    amount_g_ml: 200,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "patilla-cubos",
    name: "Patilla (en cubos)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "2 tazas",
    amount_g_ml: 300,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "guanabana-pulpa",
    name: "Guanábana (pulpa)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "tamarindo-pulpa",
    name: "Tamarindo (pulpa)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "1 cucharada",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  // --- FRUTAS DESHIDRATADAS ---

  {
    id: "albaricoque-deshidratado",
    name: "Albaricoque (orejones)",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "8 unidades pequeñas",
    amount_g_ml: 30, // Estimado estándar para frutas secas
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "ciruelas-pasas",
    name: "Ciruelas pasas",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "3 unidades",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "datiles",
    name: "Dátiles",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "3 unidades",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  },
  {
    id: "pasitas",
    name: "Pasitas",
    categoryId: "fruits",
    subCategoryId: "frutas",
    measure: "2 cucharadas",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.FRUTAS,
    micros: {}
  }


]
