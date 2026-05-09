
import { dairyDatabase } from "./dairy";
import { fruitsDatabase } from "./fruits";
import { vegetablesDatabase } from "./vegetables";
import { carbsDatabase } from "./carbs";
import { meatDatabase } from "./meat";
import { fatsDataBase } from "./fats";

export const masterFoodDatabase = [
    ...dairyDatabase,
    ...fruitsDatabase,
    ...vegetablesDatabase,
    ...carbsDatabase,
    ...meatDatabase,
    ...fatsDataBase,
];

export const getFoodbyCategory = (category: string) => {
    return masterFoodDatabase.filter(food => food.categoryId === category)
}
