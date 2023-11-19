export type Food = {
  id?: string;
  name: string;
  kcal: number;
  quantity: number;
  quantityUnit: string;
};

export type TMeals = {
  id?: string;
  title: string;
  foods: Food[];
};
