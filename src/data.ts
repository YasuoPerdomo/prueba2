import { Dish, Sede } from "./types";

export const SEDES: Sede[] = [
  {
    id: "begonias",
    name: "Terminal Pesquero - BEGONIAS",
    suffix: "San Isidro",
    key: "begonias",
    address: "Calle Las Begonias 760, San Isidro",
    emoji: "🏢",
    phone: "51902862400"
  },
  {
    id: "jesus_maria",
    name: "Terminal Pesquero - JESÚS MARÍA",
    suffix: "Salaverry",
    key: "jesus_maria",
    address: "Av. General Salaverry 1540, Jesús María",
    emoji: "🦁",
    phone: "51902862400"
  },
  {
    id: "barranco",
    name: "Terminal Pesquero - BARRANCO",
    suffix: "Grau",
    key: "barranco",
    address: "Av. Almirante Miguel Grau 300, Barranco",
    emoji: "🎨",
    phone: "51902862400"
  },
  {
    id: "chacarilla",
    name: "Terminal Pesquero - CHACARILLA",
    suffix: "Surco",
    key: "chacarilla",
    address: "Av. Caminos del Inca 250, Chacarilla, Surco",
    emoji: "🌳",
    phone: "51902862400"
  },
  {
    id: "miraflores",
    name: "Terminal Pesquero - MIRAFLORES",
    suffix: "Larco",
    key: "miraflores",
    address: "Av. José Larco 1140, Miraflores",
    emoji: "🌊",
    phone: "51902862400"
  },
  {
    id: "monterrico",
    name: "Terminal Pesquero - MONTERRICO",
    suffix: "El Polo",
    key: "monterrico",
    address: "Av. El Polo 705, Santiago de Surco",
    emoji: "🏌️",
    phone: "51902862400"
  },
  {
    id: "san_isidro",
    name: "Terminal Pesquero - SAN ISIDRO",
    suffix: "Canaval y Moreyra",
    key: "san_isidro",
    address: "Av. Canaval y Moreyra 450, San Isidro",
    emoji: "💼",
    phone: "51902862400"
  },
  {
    id: "punta_hermosa",
    name: "Terminal Pesquero - PUNTA HERMOSA",
    suffix: "Playa",
    key: "punta_hermosa",
    address: "Av. Sunset 102, Punta Hermosa",
    emoji: "🏖️",
    phone: "51902862400"
  },
  {
    id: "san_miguel",
    name: "Terminal Pesquero - SAN MIGUEL",
    suffix: "La Marina",
    key: "san_miguel",
    address: "Av. La Marina 2300, San Miguel",
    emoji: "🎡",
    phone: "51902862400"
  }
];

export const DISHES: Dish[] = [
  // --- Entradas ---
  {
    id: "ent_causa",
    name: "Causa Acevichada",
    price: 39.90,
    description: "Cremosa masa de papa al ají amarillo, rellena de láminas de palta y mayonesa. Coronada con su cevichazo premium bañado en salsa de ají amarillo.",
    category: "entradas",
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    badge: "Recomendado"
  },
  {
    id: "ent_leche",
    name: "Leche de Tigre Clásica 500ML",
    price: 24.90,
    description: "Concentrado cítrico y vitamínico super fresco con trozos de pescado marinados, acompañado de abundante chicharrón de pota crujiente.",
    category: "entradas",
    image: "https://images.unsplash.com/photo-1534080391025-a87bdf19d26f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ent_tequenos",
    name: "Tequeños del Terminal",
    price: 28.90,
    description: "Crujientes tequeños rellenos de queso andino derretido o mariscos, acompañados de crema de palta artesanal y chicharrón de pota.",
    category: "entradas",
    image: "https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&w=600&q=80"
  },

  // --- Ceviches ---
  {
    id: "cev_clasico",
    name: "Ceviche Clásico",
    price: 45.00,
    description: "Pesca fresca del día cortada en dados perfectos, marinada en jugo de limón recién exprimido, ají limo, culantro y cebolla roja. Acompañado de camote glaseado y choclo tierno.",
    category: "ceviches",
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1534080391025-a87bdf19d26f?auto=format&fit=crop&w=600&q=80",
    badge: "El Rey de la Casa"
  },
  {
    id: "cev_mixto",
    name: "Ceviche Mixto",
    price: 49.90,
    description: "Una explosión premium del océano: calamar tierno, pulpo, langostinos frescos y pesca del día marinada en nuestra leche de tigre especial con toque de ají rocoto suave.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1625938146369-adc83368bda7?auto=format&fit=crop&w=600&q=80",
    badge: "Favorito"
  },
  {
    id: "cev_conchas",
    name: "Ceviche de Conchas Negras",
    price: 42.90,
    description: "Clásico norteño garantizado. Fresquísimas conchas negras selváticas marinadas en zumo de limón, cebolla picada finamente, ají limo y un toque sabroso de zarandaja.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    badge: "Especial"
  },
  {
    id: "cev_carretillero",
    name: "Ceviche Carretillero",
    price: 49.90,
    description: "La combinación marina perfecta: nuestro aclamado ceviche clásico de pescado servido con una generosa porción de chicharrón de pota crujiente calientito.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    badge: "Imperdible"
  },
  {
    id: "cev_pota",
    name: "Ceviche de Pota",
    price: 32.90,
    description: "Nuestra deliciosa pota fresca del litoral marinada al instante en limón norteño y ají limo, con choclo desgranado y camote dulce peruano.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cev_porito",
    name: "Ceviche Porito Norte",
    price: 47.90,
    description: "Auténtico sabor chiclayano con el secreto cítrico de la casa, ají de la zona y los ingredientes pesqueros más frescos del alba.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1534080391025-a87bdf19d26f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cev_pescado",
    name: "Ceviche de Pescado",
    price: 47.90,
    description: "La pesca premium del día en dados, marinada al segundo con cebolla roja, limón chalaco y un toque crocante de canchita serrana.",
    category: "ceviches",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80"
  },

  // --- Fondos ---
  {
    id: "fon_arroz_mar",
    name: "Arroz con Mariscos",
    price: 49.90,
    description: "Cremosa preparación al wok con abundante mistura de mariscos seleccionados, ají panca, vino blanco y un toque sutil de queso parmesano. Servido con zarza criolla.",
    category: "fondos",
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1626853501548-24d19bdee1a4?auto=format&fit=crop&w=600&q=80",
    badge: "Recomendado"
  },
  {
    id: "fon_chaufa_pes",
    name: "Arroz Chaufa de Pescado",
    price: 38.90,
    description: "Arroz saltado a fuego fuerte (al reviente del wok) con trozos de pescado crujiente sazonado, cebollita de verdeo, tortilla de huevo y aceite de ajonjolí auténtico.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_jalea",
    name: "Jalea Mixta",
    price: 52.90,
    description: "Montaña crocante de chicharrón de pescado y mariscos seleccionados fritos al estilo norteño, sobre cama de yucas fritas, bañado con zarza criolla de la casa y salsa tártara.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_chicharron",
    name: "Chicharrón de Pescado",
    price: 48.90,
    description: "Dados de pesca del día marinados en mostaza y ajo, fritos a la perfección doradita. Servido con yucas y salsa tártara cremosa del puerto.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_tacu",
    name: "Tacu Tacu con Mariscos",
    price: 48.90,
    description: "Masa doradita y crocante de frejol y arroz frita a la sartén, bañada en una suculenta salsa de mariscos cremosos con ají amarillo y toque chalaco.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1626853501548-24d19bdee1a4?auto=format&fit=crop&w=600&q=80",
    badge: "Clásico"
  },
  {
    id: "fon_chich_pota",
    name: "Chicharrón de Pota",
    price: 37.90,
    description: "Crujientes tiritas de pota seleccionada marinadas en especias secretas y fritas con doble rebozado. Servido con yucas doradas.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_plancha",
    name: "Filete de Pescado a la Plancha",
    price: 39.90,
    description: "Fresco filete de pescado de estación sellado a la plancha con finas hierbas y ajo, acompañado de arroz blanco graneadito y ensalada fresca del huerto.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_verde",
    name: "Tallarín Verde con Milanesa de Pescado",
    price: 42.90,
    description: "Jugosos tallarines envueltos en nuestra salsa pesto criolla a base de albahaca fresca y espinaca, acompañados de una milanesa de pescado ultra crocante.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fon_chaufa_mar",
    name: "Arroz Chaufa de Mariscos",
    price: 43.90,
    description: "Arroz frito saltado en soplete de fuego con mixtura fresca de mariscos (langostino, calamar picado), cebollita china, jengibre y tortilla de huevo.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80"
  },

  // --- Caldos ---
  {
    id: "cal_chilcano",
    name: "Chilcano de Pescado",
    price: 15.00,
    description: "Sustancioso y reconfortante concentrado de pescado con jengibre aromático, limón sutil norteño, cebollita china y culantro. Ideal para recargar energías.",
    category: "caldos",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    badge: "Energizante"
  },
  {
    id: "cal_chupe",
    name: "Chupe de Langostinos",
    price: 35.00,
    description: "Cremoso y potente caldo tradicional del sur con langostinos, papa amarilla, choclo dulce, habas tiernas, huevo pochado al momento y el aroma único del huacatay.",
    category: "caldos",
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    badge: "Recomendado"
  },
  {
    id: "cal_parihuela",
    name: "Parihuela Especial",
    price: 32.00,
    description: "Levantamuertos de altamar. Caldo concentrado y espeso de mariscos y filete de pescado cocido con ají panca, ajo de la casa y un chorrito de chicha de jora.",
    category: "caldos",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=600&q=80",
    badge: "Levantamuertos"
  },
  {
    id: "cal_sudado",
    name: "Sudado de Pescado",
    price: 28.00,
    description: "Filete jugoso de pesca fresca sudado al vapor de sus jugos con generosas láminas de cebolla, tomate, ají amarillo y chicha de jora. Servido con arroz blanco.",
    category: "caldos",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80"
  },

  // --- Menú Kids ---
  {
    id: "kid_chicharron",
    name: "Chicharroncitos de Pollo",
    price: 24.00,
    description: "Trocitos suaves de pechuga de pollo marinados de forma amigable y fritos de forma divertida, acompañados de papas fritas crocantes y mayonesa clásica.",
    category: "menu-kids",
    image: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=600&q=80",
    badge: "Favorito Kids"
  },
  {
    id: "kid_salchipapa",
    name: "Salchipapa Marina",
    price: 26.00,
    description: "Sabor divertido de papas nativas doradas con trozos de pescado fresco empanizado para niños y rodajas finas de frankfurter premium.",
    category: "menu-kids",
    image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80",
    badge: "¡Súper divertido!"
  },
  {
    id: "kid_tallarin",
    name: "Tallarincitos con Pescado",
    price: 25.00,
    description: "Suaves fideos espagueti envueltos en sedosa salsa blanca criolla ligera, coronados con filetito de pescado tierno a la plancha.",
    category: "menu-kids",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=600&q=80"
  },

  // --- Combos ---
  {
    id: "com_lima",
    name: "Combo Lima (Para 2)",
    price: 170.00,
    description: "Ceviche clásico de pescado, chicharrón crujiente de calamar, 2 causas cremosas rellenas de pulpa de cangrejo y 2 bebidas heladas de tu elección.",
    category: "combos",
    image: "https://images.unsplash.com/photo-1534080391025-a87bdf19d26f?auto=format&fit=crop&w=600&q=80",
    badge: "Para Compartir"
  },
  {
    id: "com_chiclayo",
    name: "Combo Chiclayo",
    price: 245.00,
    description: "Arroz con mariscos ahumado, nuestro aclamado ceviche mixto, tortilla de raya tradicional norteña y una jarra helada de chicha morada hecha de maíz morado.",
    category: "combos",
    image: "https://images.unsplash.com/photo-1626853501548-24d19bdee1a4?auto=format&fit=crop&w=600&q=80",
    badge: "Popular"
  },
  {
    id: "com_terminal",
    name: "Combo Terminal (Para 4-5)",
    price: 299.00,
    description: "Pescado entero de la red bañado a lo macho, ronda fría (ceviche, causa, tiradito), arroz chaufa de mariscos y 1.5L de bebida refrescante del terminal.",
    category: "combos",
    image: "https://images.unsplash.com/photo-1534080391025-a87bdf19d26f?auto=format&fit=crop&w=600&q=80",
    badge: "La Sazón del Puerto"
  },

  // --- Dúos ---
  {
    id: "duo_oriental_p",
    name: "Dúo Oriental Pescado",
    price: 46.90,
    description: "Auténtico ceviche clásico de pescado fresco + una porción humeante de arroz chaufa de pescado al wok. El balance ácido y ahumado perfecto.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },
  {
    id: "duo_oriental_m",
    name: "Dúo Oriental Mariscos",
    price: 46.90,
    description: "Ceviche clásico de pescado combinando texturas con un generoso plato de arroz chaufa de mariscos del terminal.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },
  {
    id: "duo_causa",
    name: "Dúo Mi Causa",
    price: 46.90,
    description: "El dúo más fresco: nuestro ceviche marino tradicional marinado al limón peruano emparejado con una causa de langostinos suave.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },
  {
    id: "duo_carretilla",
    name: "Dúo Carretillero",
    price: 47.90,
    description: "La tradición limeña en tu plato: ceviche de pescado helado más chicharrón de pota crujiente y caliente con salsa tártara.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },
  {
    id: "duo_frito",
    name: "Dúo Frito Completo",
    price: 48.90,
    description: "Ceviche de pesca del día acompañado de chicharrón de pescado extra crocante y crujiente para coronar con harto jugo del limón.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },
  {
    id: "duo_clasico",
    name: "Dúo Clásico Marinero",
    price: 49.90,
    description: "El infaltable matrimonio gastronómico peruano: ceviche fresco de pescado + arroz con mariscos cremosito y humeante.",
    category: "duos",
    image: "https://images.unsplash.com/photo-1626853501548-24d19bdee1a4?auto=format&fit=crop&w=600&q=80",
    isDuo: true
  },

  // --- Postres ---
  {
    id: "pos_chocolate",
    name: "Torta de Chocolate Norteña",
    price: 18.00,
    description: "Clásica y húmeda torta de cacao puro peruano al 70%, rellena generosamente con manjar blanco de olla artesanal y cubierta con fudge espeso.",
    category: "postres",
    isRecommended: true,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    badge: "Artesanal"
  },
  {
    id: "pos_limon",
    name: "Pie de Limón Real",
    price: 17.00,
    description: "Base crocante de galleta de vainilla, relleno cítrico premium de limón norteño sutil y un merengue suizo dorado al soplete.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pos_cheesecake",
    name: "Cheesecake de Frutos Rojos",
    price: 19.00,
    description: "Textura cremosa fría sobre base de galleta con mantequilla andina, coronada con compota casera reducida de fresas, arándanos y frambuesas jugosas.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    badge: "Nuevo"
  }
];
