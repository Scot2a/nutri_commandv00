
import { FoodItem } from "@/src/types/food";

const MACROS = {
    GRASA_MONO: { proteins_g: 0, lipids_g: 5, carbs_g: 0, fiber_g: 0, calories: 45},
    GRASA_POLI: { proteins_g: 0, lipids_g: 5, carbs_g: 0, fiber_g: 0, calories: 45},
    GRASA_SAT: { proteins_g: 0, lipids_g: 5, carbs_g: 0, fiber_g: 0, calories: 45},
}

export const fatsDataBase: FoodItem [] = [

    //MONOINSATURATED FATS

    // --- GRASAS MONOINSATURADAS ---

    {
        id: 'aceite-canola',
        name: 'Aceite de canola',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: "aceite-oliva",
        name: "Aceite de oliva",
        categoryId: "fats",
        subCategoryId: "monoinsaturada",
        measure: "1 cucharadita",
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },{
        id: 'aceite-mani',
        name: 'Aceite de maní',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'aceitunas-negras',
        name: 'Aceitunas negras',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '8 unidades grandes',
        amount_g_ml: 30,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'aceitunas-verdes',
        name: 'Aceitunas verdes (rellenas)',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '10 unidades grandes',
        amount_g_ml: 30,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'aguacate-trozo',
        name: 'Aguacate (trozo)',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '1/8 unidad',
        amount_g_ml: 30,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'aguacate-triturado',
        name: 'Aguacate triturado',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '2 cucharadas',
        amount_g_ml: 30,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'mantequilla-frutos-secos',
        name: 'Mantequilla de almendra o maní',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '2 cucharaditas',
        amount_g_ml: 10,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'almendras',
        name: 'Almendras',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '6 unidades',
        amount_g_ml: 6,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'mani-concha',
        name: 'Maní (en concha)',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '10 unidades',
        amount_g_ml: 6,
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'nuez-lisa',
        name: 'Nuez lisa',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '2 unidades',
        amount_g_ml: 5, // Estimado basado en el grupo
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },
    {
        id: 'semillas-ajonjoli',
        name: 'Semillas de ajonjolí',
        categoryId: 'fats',
        subCategoryId: 'monoinsaturada',
        measure: '1 cucharada',
        amount_g_ml: 15, // Estimado para 1 cda
        unit: 'cc',
        ...MACROS.GRASA_MONO,
        micros: {}
    },

    // --- GRASAS POLIINSATURADAS ---
    {
        id: 'aceite-maiz',
        name: 'Aceite de maíz',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'aceite-girasol',
        name: 'Aceite de girasol',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'aceite-soya',
        name: 'Aceite de soya',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'mayonesa-regular',
        name: 'Mayonesa (regular)',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'linaza-polvo',
        name: 'Linaza en polvo',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '2 cucharadas',
        amount_g_ml: 20,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'margarina-kosher',
        name: 'Margarina sin sólidos de leche (Kosher)',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'mayonesa-ligera',
        name: 'Mayonesa (ligera)',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '1 cucharadita', // Ajustado de acuerdo a la densidad calórica típica
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'aderezo-bajo-grasa',
        name: 'Aderezo bajo en grasas (tipo Miracle Whip®)',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '2 cucharaditas',
        amount_g_ml: 10,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },
    {
        id: 'nueces-poli',
        name: 'Nueces',
        categoryId: 'fats',
        subCategoryId: 'poliinsaturada',
        measure: '2 unidades',
        amount_g_ml: 5,
        unit: 'cc',
        ...MACROS.GRASA_POLI,
        micros: {}
    },

    // --- GRASAS SATURADAS ---
  {
    id: 'aceite-coco',
    name: 'Aceite de coco',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '1 cucharadita',
    amount_g_ml: 5,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'coco-rallado-endulzado',
    name: 'Coco endulzado, rallado',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '2 cucharadas',
    amount_g_ml: 15,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'mantequilla-animal',
    name: 'Mantequilla',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '1 cucharadita',
    amount_g_ml: 5,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'manteca-cerdo',
    name: 'Manteca de cerdo',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '1 cucharadita',
    amount_g_ml: 5,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'margarina-regular',
    name: 'Margarina regular',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '1 cucharadita',
    amount_g_ml: 5,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'margarina-ligera',
    name: 'Margarina (ligera)',
    categoryId: 'fats',
    subCategoryId: 'saturada',
    measure: '2 cucharaditas',
    amount_g_ml: 10,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'queso-crema-regular',
    name: 'Queso crema regular',
    categoryId: 'dairy',
    subCategoryId: 'saturada',
    measure: '1 cucharada',
    amount_g_ml: 15,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'queso-fundido-americano',
    name: 'Queso fundido estilo americano',
    categoryId: 'dairy',
    subCategoryId: 'saturada',
    measure: '1 cucharada',
    amount_g_ml: 15,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  },
  {
    id: 'tocineta-cocida',
    name: 'Tocineta (cocida)',
    categoryId: 'meat',
    subCategoryId: 'saturada',
    measure: '2 unid. finas o 1 gruesa',
    amount_g_ml: 9,
    unit: 'cc',
    ...MACROS.GRASA_SAT,
    micros: {}
  }

]
