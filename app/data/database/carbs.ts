
import { FoodItem } from "@/src/types/food";

const MACROS = {
    CEREALES: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
    TUBERCULOS_PLATANO: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
    LEGUMINOSAS: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
    PANES: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
    GALLETAS: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
    OTROS: {proteins_g: 2, lipids_g: 0, carbs_g: 15, fiber_g: 0, calories:80},
}

export const carbsDatabase: FoodItem [] = [
    // --- CEREALES ---

  {
    id: "arepa-maiz",
    name: "Arepa de maíz",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1 unidad (pequeña)",
    amount_g_ml: 40,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "tortilla-maiz",
    name: "Tortilla de maíz (13 cm)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1 unidad",
    amount_g_ml: 30, // Estimado estándar
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "mazorca",
    name: "Mazorca",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 unidad",
    amount_g_ml: 70,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "arroz-cocido",
    name: "Arroz cocido",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 80,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "cereales-agua",
    name: "Cereales cocidos en agua",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "cereales-integrales",
    name: "Cereales integrales (Special K, All Bran)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "hojuelas-maiz-azucaradas",
    name: "Hojuelas de maíz azucaradas",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "maiz-granos",
    name: "Maíz (en granos)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 120,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "arroz-inflado",
    name: "Arroz inflado",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "3/4 taza",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "hojuelas-maiz-natural",
    name: "Hojuelas de maíz",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "3/4 taza",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "cotufas-sin-grasa",
    name: "Cotufas (sin grasa)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "3 tazas",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "granola-baja-grasa",
    name: "Granola baja en grasa",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/4 taza",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "muesli",
    name: "Muesli",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/4 taza",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "pastas-trigo",
    name: "Pastas de trigo (todas las formas)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 70,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "pastas-sin-gluten",
    name: "Pastas sin gluten (arroz o maíz)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "1/2 taza",
    amount_g_ml: 70,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "avena-hojuelas",
    name: "Avena (en hojuelas)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "2 cucharadas",
    amount_g_ml: 16,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "chia",
    name: "Chía",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "2 cucharadas",
    amount_g_ml: 16,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "germen-trigo",
    name: "Germen de trigo (sin miel)",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "2 cucharadas",
    amount_g_ml: 16,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  {
    id: "harinas-varias",
    name: "Harina de arroz, avena, cebada o maicena",
    categoryId: "carbs",
    subCategoryId: "cereales",
    measure: "2 cucharadas",
    amount_g_ml: 16,
    unit: "cc",
    ...MACROS.CEREALES,
    micros: {}
  },
  // --- TUBÉRCULOS Y PLÁTANO ---

  {
    id: "apio",
    name: "Apio (tubérculo)",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo pequeño",
    amount_g_ml: 60,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "nyame",
    name: "Ñame",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo pequeño",
    amount_g_ml: 60,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "ocumo",
    name: "Ocumo",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo pequeño",
    amount_g_ml: 60,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "yuca",
    name: "Yuca",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo pequeño",
    amount_g_ml: 60,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "topocho",
    name: "Topocho",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo pequeño",
    amount_g_ml: 60,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "pure-tuberculos",
    name: "Puré de apio, batata, ñame, papa u ocumo (sin grasa ni leche)",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1/2 taza",
    amount_g_ml: 110,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "batata-trozo",
    name: "Batata",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 trozo",
    amount_g_ml: 65,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "papa-pequena",
    name: "Papa",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1 unidad (pequeña)",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "papa-amarilla-colombiana",
    name: "Papa amarilla colombiana (mini)",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "5 unidades",
    amount_g_ml: 100, // Estimado basado en peso de papa pequeña
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  {
    id: "platano",
    name: "Plátano",
    categoryId: "carbs",
    subCategoryId: "tuberculos",
    measure: "1/4 unidad",
    amount_g_ml: 50,
    unit: "cc",
    ...MACROS.TUBERCULOS_PLATANO,
    micros: {}
  },
  // --- LEGUMINOSAS ---

  {
    id: "arvejas",
    name: "Arvejas",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "caraotas",
    name: "Caraotas (negras, blancas o rojas)",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "frijoles",
    name: "Frijoles / Frijol Bayo",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "garbanzos",
    name: "Garbanzos",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "guisantes",
    name: "Guisantes",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "habas",
    name: "Habas",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "lentejas",
    name: "Lentejas",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "quinchoncho",
    name: "Quinchoncho",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/2 taza",
    amount_g_ml: 100,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  {
    id: "quinoa",
    name: "Quínoa",
    categoryId: "carbs",
    subCategoryId: "leguminosas",
    measure: "1/4 taza",
    amount_g_ml: 40,
    unit: "cc",
    ...MACROS.LEGUMINOSAS,
    micros: {}
  },
  // --- PANES ---

  {
    id: "pan-arabe-pita",
    name: "Pan Árabe-pita",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1/4 unidad grande o 1/2 mediana",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-ligero",
    name: "Pan bajo en calorías (ligero)",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "2 rebanadas",
    amount_g_ml: 36,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-sueco",
    name: "Pan Sueco",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "2 rebanadas",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "crotones",
    name: "Crotones (sin grasa)",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1 taza",
    amount_g_ml: 30, // Estimado para 1 taza
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-frances-varios",
    name: "Pan Francés, Italiano, Canilla o Campesino",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1/4 unidad",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-hamburguesa-perro",
    name: "Pan de hamburguesa, perro caliente o francés",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1/2 unidad",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-azimo",
    name: "Pan Ázimo (matzoh)",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1/2 unidad",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-banquete",
    name: "Pan de banquete",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1 unidad pequeña",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-rallado",
    name: "Rallado o miga de pan",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "3 cucharadas rasas",
    amount_g_ml: 30, // Estimado para 3 cdas
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  {
    id: "pan-sandwich",
    name: "Sándwich blanco o integral",
    categoryId: "carbs",
    subCategoryId: "panes",
    measure: "1 rebanada",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.PANES,
    micros: {}
  },
  // --- GALLETAS ---

  {
    id: "galletas-soda",
    name: "Galletas de soda",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "3 unidades (1 paquete)",
    amount_g_ml: 25,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },
  {
    id: "galletas-maria",
    name: "Galletas dulces tipo María",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "2 unidades",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },
  {
    id: "galletas-integrales",
    name: "Galletas integrales",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "2 unidades",
    amount_g_ml: 30,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },
  {
    id: "galletas-arroz",
    name: "Galletas de arroz",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "2 unidades grandes o 3 pequeñas",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },
  {
    id: "galletas-maiz",
    name: "Galletas de maíz",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "2 unidades grandes o 5 pequeñas",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },
  {
    id: "galletas-sin-gluten",
    name: "Galletas dulces sin gluten",
    categoryId: "carbs",
    subCategoryId: "galletas",
    measure: "3 unidades pequeñas",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.GALLETAS,
    micros: {}
  },// --- ALIMENTOS PREPARADOS ---

  {
    id: "cachapa",
    name: "Cachapa",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1 unidad pequeña",
    amount_g_ml: 50,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "panqueca",
    name: "Panqueca (9 cm diámetro)",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1 unidad",
    amount_g_ml: 40, // Estimado basado en dimensiones
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "ponque",
    name: "Ponqué (6 cm diámetro)",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "3 unidades pequeñas",
    amount_g_ml: 50,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  // --- OTROS ---

  {
    id: "casabe-trozo",
    name: "Casabe",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1 trozo pequeño",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "casabitos",
    name: "Casabitos",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "5 unidades",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "hallaquita-maiz",
    name: "Hallaquita o bollito de maíz",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1 unidad pequeña",
    amount_g_ml: 50,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "hallaquita-arroz",
    name: "Hallaquita o bollito de arroz",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1 unidad pequeña",
    amount_g_ml: 50,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "petit-pois",
    name: "Petit pois frescos, congelados o enlatados sin sodio",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "1/2 taza",
    amount_g_ml: 80, // Valor estándar para media taza de guisantes
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "senoritas",
    name: "Señoritas",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "2 unidades",
    amount_g_ml: 20,
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  },
  {
    id: "taco-mexicano",
    name: "Taco mexicano (tortilla)",
    categoryId: "carbs",
    subCategoryId: "otros",
    measure: "2 unidades",
    amount_g_ml: 60, // Estimado para 2 unidades
    unit: "cc",
    ...MACROS.OTROS,
    micros: {}
  }


]
