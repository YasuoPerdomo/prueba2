export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  isRecommended?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  isDuo?: boolean;
  image: string;
  badge?: string;
  noSpicy?: boolean;
  alergenos?: string[];
}

export interface CartItem {
  dish: Dish;
  quantity: number;
  spicyLevel?: 'bajo' | 'medio' | 'alto';
}

export interface Sede {
  id: string;
  name: string;
  suffix: string;
  key: string;
  address: string;
  emoji: string;
  phone: string;
}
