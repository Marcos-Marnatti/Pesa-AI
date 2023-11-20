export type Food = {
  id?: string;
  name: string;
  kcal: number;
  protein?: number,
  carbohydrate?: number,
  fat?: number,
  quantity: number;
  quantityUnit: string;
};

export type TMeals = {
  id?: string;
  title: string;
  foods: Food[];
};

export type ApiFood = {
  id?: number,
  description: string,
  foodGroup?: string,
  cal: number,
  protein: number,
  carbohydrate: number,
  fat: number,
};