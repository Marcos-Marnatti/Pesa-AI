export type Food = {
  name: string;
  kcal: number;
  quantity: number;
  quantityUnit: string;
};

export type TMeals = {
  title: string;
  foods: Food[];
};
