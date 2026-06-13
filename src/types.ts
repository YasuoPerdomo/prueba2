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
}

export interface CartItem {
  dish: Dish;
  quantity: number;
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
