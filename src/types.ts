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
  isAvailable?: boolean;
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

export interface BusinessSchedule {
  weekdayOpen: string; // "12:00"
  weekdayClose: string; // "16:30"
  weekendOpen: string; // "12:00"
  weekendClose: string; // "17:00"
  manualOverride?: "auto" | "always_open" | "always_closed";
}

export interface ClaimRecord {
  id: string;
  correlativeNumber: number;
  createdAt: string;
  consumer: {
    fullName: string;
    docType: 'DNI' | 'CE' | 'Pasaporte' | 'RUC';
    docNumber: string;
    phone: string;
    email: string;
    address: string;
    isMinor?: boolean;
    parentName?: string;
  };
  contractedGood: {
    type: 'producto' | 'servicio';
    sede: string;
    amount?: number;
    description: string;
  };
  claimDetail: {
    type: 'reclamo' | 'queja';
    detail: string;
    request: string;
  };
  status: 'pendiente' | 'en_proceso' | 'atendido';
  adminNotes?: string;
}

export interface OrderRecord {
  id: string;
  createdAt: string;
  dateLabel: string;
  weekLabel: string;
  customerName: string;
  customerAddress: string;
  sedeName: string;
  items: {
    dishId: string;
    dishName: string;
    category: string;
    price: number;
    quantity: number;
    spicyLevel?: string;
  }[];
  totalAmount: number;
  status: "completado" | "enviado";
}


