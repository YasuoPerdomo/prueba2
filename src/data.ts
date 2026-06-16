import { Dish, Sede } from "./types";
import arrozMariscos from "./assets/images/arroz_mariscos_1781339688351.jpg";
import causaAcevichada from "./assets/images/causa_acevichada_1781341093495.jpg";
import chicharronPescado from "./assets/images/chicharron_pescado_1781563544480.jpg";

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
    image: causaAcevichada,
    badge: "Recomendado",
    alergenos: ["mariscos"]
  },
  {
    id: "ent_leche",
    name: "Leche de Tigre Clásica 500ML",
    price: 24.90,
    description: "Concentrado cítrico y vitamínico super fresco con trozos de pescado marinados, acompañado de abundante chicharrón de pota crujiente.",
    category: "entradas",
    image: "https://i.ytimg.com/vi/Rh4rVDXB8PY/maxresdefault.jpg",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "ent_tequenos",
    name: "Tequeños del Terminal",
    price: 28.90,
    description: "Crujientes tequeños rellenos de queso andino derretido o mariscos, acompañados de crema de palta artesanal y chicharrón de pota.",
    category: "entradas",
    image: "https://i.ytimg.com/vi/Z6UUKfsyYJY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBV_Mcsc4d2tdYGw6Yc1POgHlzulw",
    alergenos: ["mariscos", "gluten", "lacteos"]
  },

  // --- Ceviches ---
  {
    id: "cev_clasico",
    name: "Ceviche Clásico",
    price: 45.00,
    description: "Pesca fresca del día cortada en dados perfectos, marinada en jugo de limón recién exprimido, ají limo, culantro y cebolla roja. Acompañado de camote glaseado y choclo tierno.",
    category: "ceviches",
    isRecommended: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvoGyLm2Pp3KAULkFBMOMdBSO4YJifjLMoynPgSiuML0EW3fUDsGRPkcJaCIP_Y-8Cj_CRBalMaJmBynttzrZ5oGFQEkPMgP9eAFasp2Eah71_OXKHLwOn4Py1jQUXfSBLIpkWSL8UMxqnrv7kQdgrbcX94Z_kRUnkwvXhpJlSr4_G8vsG7DMCu2_QgnYysyWzAkcXFJrOcaWlXNNxsx6uPcOpUax1lVw4DvOfsN5jpZZNgWXv1CDUJux2soK3EK5buGi_wnwllWha",
    badge: "El Rey de la Casa",
    alergenos: ["mariscos"]
  },
  {
    id: "cev_mixto",
    name: "Ceviche Mixto",
    price: 49.90,
    description: "Una explosión premium del océano: calamar tierno, pulpo, langostinos frescos y pesca del día marinada en nuestra leche de tigre especial con toque de ají rocoto suave.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIS6CcGb_1gMi5rxre_INgL1nSly3Y5VGlGHuMAscOQdpccpzshFT1NCBrqRG7V4J_cRGHW2rqIs05EwQUJ42QVGVHidmMKSXr9aVodbZ1Hrf09qTQ5DPg3F0PrNHv8RmeIyIDrtIDE4ptiM2iSwCUbPBhUnAUjvo7eF42lXVAvFmZ1jTMa_hGq01S-amKmzHAQpJpAN4ZbIpoZf1hpAIPJxyFqId92o0U5rGepXfr85rtWAhaZn1bEtNwbydSaQBtWQR9rV_51lg",
    badge: "Favorito",
    alergenos: ["mariscos"]
  },
  {
    id: "cev_conchas",
    name: "Ceviche de Conchas Negras",
    price: 42.90,
    description: "Clásico norteño garantizado. Fresquísimas conchas negras selváticas marinadas en zumo de limón, cebolla picada finamente, ají limo y un toque sabroso de zarandaja.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBvXhfgpbkXbuD9eNarnz9ssa5xleKpHN7bZnOPIwdhIeZ_LEMGerlFyWmuA67db6m4vufLRGj4tRmVafr3o1OPIpg1DRAXcxDpYxLohwdbEEoghoVtFwTESUuy1OoD5kJiTOx1SGJY-xfg5kELmIefQWFnLXgyUhqkT74rpjWku4sF_zRn68dMrITgclWoy3WIIYA87TAP0o-nJP_bpXlI-mNic2zb3MVz5-JYvYN1tOMy7WTXQ78UIep3O-0dARdcOkNyNjCC7pSF",
    badge: "Especial",
    alergenos: ["mariscos"]
  },
  {
    id: "cev_carretillero",
    name: "Ceviche Carretillero",
    price: 49.90,
    description: "La combinación marina perfecta: nuestro aclamado ceviche clásico de pescado servido con una generosa porción de chicharrón de pota crujiente calientito.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDldQfh-kq6rGj8XO7xctBCHF9iSeQxY6yYbXywhEDy3KwiHBWSd0RkyqnTJ7wAsuhDCKGdmefn1yVeGR8E-y-mc5wjWV3nXTjoxJd85UOb8BUU0Tt47XQR4RWIJu5b6NJ7BHe6IPnEyG8qOBvR9kaTqwU6940HsUF3xmeUn4gH3jbU83iImCtqzoQTfJ2aSC2gRar1kZENZ7rRnQ7H1yygkiVDXIY6THZ1918BgukS_4-qJaqpcf8l33Ii45_eWb9LQegQLkYNPq61",
    badge: "Imperdible",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "cev_pota",
    name: "Ceviche de Pota",
    price: 32.90,
    description: "Nuestra deliciosa pota fresca del litoral marinada al instante en limón norteño y ají limo, con choclo desgranado y camote dulce peruano.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvoGyLm2Pp3KAULkFBMOMdBSO4YJifjLMoynPgSiuML0EW3fUDsGRPkcJaCIP_Y-8Cj_CRBalMaJmBynttzrZ5oGFQEkPMgP9eAFasp2Eah71_OXKHLwOn4Py1jQUXfSBLIpkWSL8UMxqnrv7kQdgrbcX94Z_kRUnkwvXhpJlSr4_G8vsG7DMCu2_QgnYysyWzAkcXFJrOcaWlXNNxsx6uPcOpUax1lVw4DvOfsN5jpZZNgWXv1CDUJux2soK3EK5buGi_wnwllWha",
    alergenos: ["mariscos"]
  },
  {
    id: "cev_porito",
    name: "Ceviche Porito Norte",
    price: 47.90,
    description: "Auténtico sabor chiclayano con el secreto cítrico de la casa, ají de la zona y los ingredientes pesqueros más frescos del alba.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeIS6CcGb_1gMi5rxre_INgL1nSly3Y5VGlGHuMAscOQdpccpzshFT1NCBrqRG7V4J_cRGHW2rqIs05EwQUJ42QVGVHidmMKSXr9aVodbZ1Hrf09qTQ5DPg3F0PrNHv8RmeIyIDrtIDE4ptiM2iSwCUbPBhUnAUjvo7eF42lXVAvFmZ1jTMa_hGq01S-amKmzHAQpJpAN4ZbIpoZf1hpAIPJxyFqId92o0U5rGepXfr85rtWAhaZn1bEtNwbydSaQBtWQR9rV_51lg",
    alergenos: ["mariscos"]
  },
  {
    id: "cev_pescado",
    name: "Ceviche de Pescado",
    price: 47.90,
    description: "La pesca premium del día en dados, marinada al segundo con cebolla roja, limón chalaco y un toque crocante de canchita serrana.",
    category: "ceviches",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDldQfh-kq6rGj8XO7xctBCHF9iSeQxY6yYbXywhEDy3KwiHBWSd0RkyqnTJ7wAsuhDCKGdmefn1yVeGR8E-y-mc5wjWV3nXTjoxJd85UOb8BUU0Tt47XQR4RWIJu5b6NJ7BHe6IPnEyG8qOBvR9kaTqwU6940HsUF3xmeUn4gH3jbU83iImCtqzoQTfJ2aSC2gRar1kZENZ7rRnQ7H1yygkiVDXIY6THZ1918BgukS_4-qJaqpcf8l33Ii45_eWb9LQegQLkYNPq6",
    alergenos: ["mariscos"]
  },

  // --- Fondos ---
  {
    id: "fon_arroz_mar",
    name: "Arroz con Mariscos",
    price: 49.90,
    description: "Cremosa preparación al wok con abundante mistura de mariscos seleccionados, ají panca, vino blanco y un toque sutil de queso parmesano. Servido con zarza criolla.",
    category: "fondos",
    isRecommended: true,
    image: arrozMariscos,
    badge: "Recomendado",
    alergenos: ["mariscos", "lacteos"]
  },
  {
    id: "fon_chaufa_pes",
    name: "Arroz Chaufa de Pescado",
    price: 38.90,
    description: "Arroz saltado a fuego fuerte (al reviente del wok) con trozos de pescado crujiente sazonado, cebollita de verdeo, tortilla de huevo y aceite de ajonjolí auténtico.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=600&q=80",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "fon_jalea",
    name: "Jalea Mixta",
    price: 52.90,
    description: "Montaña crocante de chicharrón de pescado y mariscos seleccionados fritos al estilo norteño, sobre cama de yucas fritas, bañado con zarza criolla de la casa y salsa tártara.",
    category: "fondos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfBy42NHSV-8Jnz4b0PufN6evk7aLNOgABNEVkF3jUa_ErlJVjLCvEzulUIYJ18Uq4HnPvK7QZRrnv_CiRPvEkeURsn2_c43fCuKeVmcYBxmhAft6reHJMGOxl6Ad9H8lDP2JXtwO1RFnYgbqwV6z2eug2WBS2u0eFTdwSHJtfB2sXZaFyrw7XEQRuy9tP7e7BAOXuLxniMfUMQA-grRt0i_qw8nlVnkvB4joK2vEFjgu8dTYa1aub5LjSIOTX3P1XQ60WZorDXMwy",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "fon_chicharron",
    name: "Chicharrón de Pescado",
    price: 48.90,
    description: "Dados de pesca del día marinados en mostaza y ajo, fritos a la perfección doradita. Servido con yucas y salsa tártara cremosa del puerto.",
    category: "fondos",
    image: chicharronPescado,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "fon_tacu",
    name: "Tacu Tacu con Mariscos",
    price: 48.90,
    description: "Masa doradita y crocante de frejol y arroz frita a la sartén, bañada en una suculenta salsa de mariscos cremosos con ají amarillo y toque chalaco.",
    category: "fondos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD24xw05rfYUQ83RYu1qelFl3yHAY1LJ5Fd4tpliNrBe_03ong5SD2uYtVvSznpZuqQ0fqSQUA5B3iJg1jg30HiNJDEzmoMd9d-cELsfSFxnN9-N2OYBVemwRw3nRc5hOoymly1-NOHR3ZvoVywjV5rxLBS4ph3KCMPYN0r4LeSnDovDGfvgVbkNgg5mJC_0yhoIyU9EG2OjPFF8z7HOdmUWy_pB16Ixl0BH54DREHMBNPALghZBy5hIKzgRv-ClO2pY56aWMZ1gh2R",
    badge: "Clásico",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "fon_chich_pota",
    name: "Chicharrón de Pota",
    price: 37.90,
    description: "Crujientes tiritas de pota seleccionada marinadas en especias secretas y fritas con doble rebozado. Servido con yucas doradas.",
    category: "fondos",
    image: "https://i.ytimg.com/vi/dsWLpLpsL8M/sddefault.jpg",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "fon_plancha",
    name: "Filete de Pescado a la Plancha",
    price: 39.90,
    description: "Fresco filete de pescado de estación sellado a la plancha con finas hierbas y ajo, acompañado de arroz blanco graneadito and ensalada fresca del huerto.",
    category: "fondos",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=600&q=80",
    noSpicy: true,
    alergenos: ["mariscos"]
  },
  {
    id: "fon_verde",
    name: "Tallarín Verde con Milanesa de Pescado",
    price: 42.90,
    description: "Jugosos tallarines envueltos en nuestra salsa pesto criolla a base de albahaca fresca y espinaca, acompañados de una milanesa de pescado ultra crocante.",
    category: "fondos",
    image: "https://i.ytimg.com/vi/enxbUqDbq2g/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCmlWvs33fxtTJCN94EQsFnzlwCJw",
    noSpicy: true,
    alergenos: ["mariscos", "gluten", "lacteos"]
  },
  {
    id: "fon_chaufa_mar",
    name: "Arroz Chaufa de Mariscos",
    price: 43.90,
    description: "Arroz frito saltado en soplete de fuego con mixtura fresca de mariscos (langostino, calamar picado), cebollita china, jengibre y tortilla de huevo.",
    category: "fondos",
    image: "https://comedera.com/wp-content/uploads/sites/9/2022/02/arroz-chaufa-de-mariscos.jpg",
    noSpicy: true,
    alergenos: ["mariscos", "gluten"]
  },

  // --- Caldos ---
  {
    id: "cal_chilcano",
    name: "Chilcano de Pescado",
    price: 15.00,
    description: "Sustancioso y reconfortante concentrado de pescado con jengibre aromático, limón sutil norteño, cebollita china y culantro. Ideal para recargar energías.",
    category: "caldos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJq4ehaIfuxdAFf8Lg7t6RRDlEF2RedkokkgSJHpIp6Xf1L8-ACB2r7gjkrcb0BLAtc9gJzgGJevyyEiBHI_OQirUj4aAYdWgyXrlFsFiI1D43XR0ECOva7NL7NPTrPm-qmHfq3R_z_ODp1nMFVnfljSENPz2iQa8AFoWXXqpFXwrn9Ll8YFORWsY3XgPb8FYDj21JX-j-e_Z_Wexw4W6IwrbG-253mOtCQQ7uKzbpmj_Pu40u4Nz_qEyRq6csis6yNpwXI8otRUWb",
    badge: "Energizante",
    alergenos: ["mariscos"]
  },
  {
    id: "cal_chupe",
    name: "Chupe de Langostinos",
    price: 35.00,
    description: "Cremoso y potente caldo tradicional del sur con langostinos, papa amarilla, choclo dulce, habas tiernas, huevo pochado al momento y el aroma único del huacatay.",
    category: "caldos",
    isRecommended: true,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfVTNa-VT_sx_MPJfknLNGvbrPkgTLT7o16exUdKuM9AwXMfQpCQhIF7p5-1v9dZ8okcavIz7kAR9bhgnB7-OeG1lJx6exjgB-zejpdts8BDwPhZWEv4WqRYSQNALp2goJ_k8dLero1axhTqo-ZudQAoI5UN3EYRxCzsGx2V4pmGx0mOz1NPj2nEaMPXkHhDnmGZAlMyO8ZVbBJXbQ7G0N5f5RKpwrccRtXJvb7BfpEosOmgv-T8VNoPuTG4BIOedSOtxj3YQpkcAN",
    badge: "Recomendado",
    alergenos: ["mariscos", "lacteos"]
  },
  {
    id: "cal_parihuela",
    name: "Parihuela Especial",
    price: 32.00,
    description: "Levantamuertos de altamar. Caldo concentrado y espeso de mariscos y filete de pescado cocido con ají panca, ajo de la casa y un chorrito de chicha de jora.",
    category: "caldos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt9x6E6QsV3naruFFFexCGF0WVr329dFCl4FZ-QENUORWnPw_pY2VHPGdDAZhWQqfG-iotC2pVDkYO4Tp5JhRO1NiMum4j-1Izgv3CSRxVShbiLUD50BEzeVoPs9aaevwBXm-QrMUBTBXDCyMQIn6UZMVjGcImN-Nk6nWc8nfmMZehyX4D_M7-UaL76nZPdUaZTI-Pec5HNZqH8eztHSqIqGn9R3J7is_KCSZl_6IgNo--6lrX26-JMu11xAgii-pS6439uO_4NuDW",
    badge: "Levantamuertos",
    alergenos: ["mariscos"]
  },
  {
    id: "cal_sudado",
    name: "Sudado de Pescado",
    price: 28.00,
    description: "Filete jugoso de pesca fresca sudado al vapor de sus jugos con generosas láminas de cebolla, tomate, ají amarillo y chicha de jora. Servido con arroz blanco.",
    category: "caldos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFLMxqtTZuau6K58RXUhDrKm94tKEuQLDv5idXfVWlFyx-ak2FL2v44xQ-SfFRR2wrVLyxqZCYM0lVl7_ce7aBvhYYw-_Bm-z5iCh0lw1wQJJad9WPzNFM3l9ivcCKUUE0F0EdNSMh8IFaVBste-rkV8Ml-pH1DMRCq1PGrrRywp0rE2IA3qknHKi_Q-wl0iguB5jvJMqTQIvB-DGr2UHmc6mPL8cxjXlVPdDGhazMA4lUnvp800P0mCDTFEwhHLGsu5hELmOiYJzE",
    noSpicy: true,
    alergenos: ["mariscos"]
  },

  // --- Menú Kids ---
  {
    id: "kid_chicharron",
    name: "Chicharroncitos de Pollo",
    price: 24.00,
    description: "Trocitos suaves de pechuga de pollo marinados de forma amigable y fritos de forma divertida, acompañados de papas fritas crocantes y mayonesa clásica.",
    category: "menu-kids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbFBWO_pFnOTr-4kJe8ZGu24JzeJEF331wtJ86tBPNaONPe62dYevjkEDrurlTm8iKtqgtES_VAMI1WyZlJVFXRMphU6fzFzq9U4OwyuoXKYxth-2_PvgRrqOr2VmVGST9_i3O88qcpbIGIx49uv2fX1xCnFEmAPaWxd4vnUehXkF1Jgo42cVHKxQpb-XBY6H64HGD3J3_IqD9cM4XTq1AzHIoPA6StfdDE3vGr3QYYWG5iyS57RIXEviL8SThtqxtU-gXJRAnSU2Z",
    badge: "Favorito Kids",
    noSpicy: true,
    alergenos: ["gluten"]
  },
  {
    id: "kid_salchipapa",
    name: "Salchipapa Marina",
    price: 26.00,
    description: "Sabor divertido de papas nativas doradas con trozos de pescado fresco empanizado para niños y rodajas finas de frankfurter premium.",
    category: "menu-kids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC4Jrv07G2aV02_SvqIv1YF1kLtsRiA1mdwrhkTtb6KUPQN7H6wy4Te25dOh3FxevPGWH57ds74rRmM7twewkUFJ1qHthQRLm5o1ijTmP6VdBIRDP4ghd_-j2Xj1M-ouMP_fM9_w_d2ll2UE5LQsTmM9Htk8-ykCwvXnvRlYg8VlSZVVhes6yiqO_NTtMGMjEuyP2Dq84-8cpkXBCwVgXhLTG5dN76ynORk8fkieb2Z_pF5pguq73vRDpDD2h-YYVm4wo4Y59gq2vn",
    badge: "¡Súper divertido!",
    noSpicy: true,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "kid_tallarin",
    name: "Tallarincitos con Pescado",
    price: 25.00,
    description: "Suaves fideos espagueti envueltos en sedosa salsa blanca criolla ligera, coronados con filetito de pescado tierno a la plancha.",
    category: "menu-kids",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6RSRTAVbaDVXJsTiq59X-TB35hJXM_8pCXCzCB8GaAUrGJHgMOE5h-dTp3oe3QMKJ9xSFTakaTiyqSSn0AiGIrHPz-w5QZn_pXXD3ushoxTNLIU7bO-RjBctyHqQ8wFA6OwJQOXctPgPFAOE_znHrLYgvWuEnfn50Dh3PeZgTJF8nM6f9atmNqRDiRsJ2mD7V_B7XPByigtc6biJTHsVWzKAOY3wcoDMCsaWdrjcv7I7zT_zNDv8uDAQnjhletaSodpVp4ULSMKmQ",
    noSpicy: true,
    alergenos: ["mariscos", "gluten", "lacteos"]
  },

  // --- Combos ---
  {
    id: "com_lima",
    name: "Combo Lima (Para 2)",
    price: 170.00,
    description: "Ceviche clásico de pescado, chicharrón crujiente de calamar, 2 causas cremosas rellenas de pulpa de cangrejo y 2 bebidas heladas de tu elección.",
    category: "combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDf83rS1zAYk4skNZgipP7rlfRbppHhap7d2PZ-drJQYKAsLJtpp22_NxU-o9FleK1owuzn45BH-dw0pJAyKZHYz9a9Del1MYizd1VtTnh9r-Qr90MzzEqerDeeMNKID1wO4e7K4LbqMQNpen7lA1-dKqkSIg94HFPdJymz6lqb21HHC3xOKl6IW_RMpol55ozcOj3BWo-98a-319hp9I5FD60DKSuNP7Kb0YCGMMws-L1hPgSb1RlqXqy5IROjrRay0TVSH5ivwXMg",
    badge: "Para Compartir",
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "com_chiclayo",
    name: "Combo Chiclayo",
    price: 245.00,
    description: "Arroz con mariscos ahumado, nuestro aclamado ceviche mixto, tortilla de raya tradicional norteña y una jarra helada de chicha morada hecha de maíz morado.",
    category: "combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCnrEncQoUDCS8_5YgoVFWr4_71WXkUnz3Ac_onoj6JEjb79sjNhPUaS9hTMeCoiGRxMQNVZm2RmSpAzC8kcD4EgZ6YKCNvNu86j9l_cT6BFPcqRBiq8fpUpdw_xSXY3rUoDLFjsAXvMVVpRMe5TRPjMzyL4m34W3mtVN3wmEg-Z0iMWWJYRkXVaeHg28vZW9OHEzmqmcGDECfvbu1XWs2DxLHmuAEs2Rt9XM3d6_vRklNHAADeXRFtDbA-zyAVCkTP5vT57oj85J85",
    badge: "Popular",
    alergenos: ["mariscos", "lacteos"]
  },
  {
    id: "com_terminal",
    name: "Combo Terminal (Para 4-5)",
    price: 299.00,
    description: "Pescado entero de la red bañado a lo macho, ronda fría (ceviche, causa, tiradito), arroz chaufa de mariscos y 1.5L de bebida refrescante del terminal.",
    category: "combos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV4diRRYdY4vXldWYfsebBH8ZP-_KRJ-59LWcx82ahiHys4-y8t7-kCjJ3yoh6rH0qV4MD4OtEAtVrqxp_jBOEEfYeZXqPJ7iz24ZgxYts0bH5HI33KYEZmKYHIMFP17RvrCfsoTSSBwOLNAeYgzrYUsJN3hzlVZaoS3bC4NpUD91-YbrnHwP71iCpDGaxAXDxCmWArBOebrK9eVpeyfs2DWiosF5iHYRcDW_wePdaOw3GAOr2XMRMCcuYpf143z7PltSwRJEOm9a5",
    badge: "La Sazón del Puerto",
    alergenos: ["mariscos", "gluten"]
  },

  // --- Dúos ---
  {
    id: "duo_oriental_p",
    name: "Dúo Oriental Pescado",
    price: 46.90,
    description: "Auténtico ceviche clásico de pescado fresco + una porción humeante de arroz chaufa de pescado al wok. El balance ácido y ahumado perfecto.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAW0-ULxnfUx8AGVzyNXWVCY6YG7VCBuvz9bc2y1O0OyxNwz3co1gV6d34JPTZ7I1ZOtIu_xxznGXEF0Cpwkat_q92tQbTudatmcG7XDKQjM1bMzSZaVEHmOnkUY-NblUPwSprN0rnRWZ28ivQbQnDGzDJgEMMaTAKWaMlxRfyZom9vC9OqD7O7byvW7IeqYeV33rXwto6DnwVjHmyMfn7g1MplIklHfI0oqA4zLFUnGlt3Iqh8QhLYZFZyw1y4o8K5NBiduLZLIc8C",
    isDuo: true,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "duo_oriental_m",
    name: "Dúo Oriental Mariscos",
    price: 46.90,
    description: "Ceviche clásico de pescado combinando texturas con un generoso plato de arroz chaufa de mariscos del terminal.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpvzowojC_u-GP1POMk0ywoRFATVkBdIRykMkGsuSHEXZnuGgeVHeTeztBzYsd5v-6mdzHGI2815IPiMTF9uW8ObP-1fVySdYLGr0Ex3pRcKyjpirLzzDU-iHewlhfY_JqdrypC5PlZsSDZvpNfQStXD7ioZF341fb7dGY3sEno8e0xAr8dFRbyHfSiJdD9kYLcE8IdWYzeJbJ-0-85ZWL6gDQy3PdQ509I3-_p6d92eMyiDM6ynKUPNOI0AIgWlRHgRLco56WXnRw",
    isDuo: true,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "duo_causa",
    name: "Dúo Mi Causa",
    price: 46.90,
    description: "El dúo más fresco: nuestro ceviche marino tradicional marinado al limón peruano emparejado con una causa de langostinos suave.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBMLJvSewAj_81mrL8OJf7KQSo5cJoArP38UaBnwkW75wuSlCW1UnVQF00syQKL46ykdSso3jefXvE3cZ3TvoSEYp5vkUxhRb2NsAxHLPwjsArGuP8JPsaDM8zvhi9Z2Bora_XDuRMG-ay0YetMXgf7F7zIJU_vGWyehXtP31-1uop0FUHIngIxXkt0_c9UB1da__LTYpPZmuCPoQj3ip99bERDQ7f76F6GZ_vA8yj_h2osy0yBqA04bn3Kc2CSr4jIEifLaS7sY4fh",
    isDuo: true,
    alergenos: ["mariscos"]
  },
  {
    id: "duo_carretilla",
    name: "Dúo Carretillero",
    price: 47.90,
    description: "La tradición limeña en tu plato: ceviche de pescado helado más chicharrón de pota crujiente y caliente con salsa tártara.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDldQfh-kq6rGj8XO7xctBCHF9iSeQxY6yYbXywhEDy3KwiHBWSd0RkyqnTJ7wAsuhDCKGdmefn1yVeGR8E-y-mc5wjWV3nXTjoxJd85UOb8BUU0Tt47XQR4RWIJu5b6NJ7BHe6IPnEyG8qOBvR9kaTqwU6940HsUF3xmeUn4gH3jbU83iImCtqzoQTfJ2aSC2gRar1kZENZ7rRnQ7H1yygkiVDXIY6THZ1918BgukS_4-qJaqpcf8l33Ii45_eWb9LQegQLkYNPq61",
    isDuo: true,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "duo_frito",
    name: "Dúo Frito Completo",
    price: 48.90,
    description: "Ceviche de pesca del día acompañado de chicharrón de pescado extra crocante y crujiente para coronar con harto jugo del limón.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDARSQ4zT2ixEeEr0KkTlHfsW03Di5j7SWyetNvrmeKr6BGBEza3zeE8jlUbvCiLW9zf4Shtho2N014YQchgRTmBjd8MQ7-OhF_COtrzNRxOZ2VWm4VxOdjl_Kr6om3--GmgrtwxkxRXX0v3aJNI8iPkqcFHrRov_5KZNtq3D-frGDbwJAWY9cdhAs9bPJJOHO0rYk1hVay5kW97Pt6F9DKwRMWq2ws5C6UXxBdCirmjUkhnXIwvMEQwyh3xSrQnNrzk1YMXd06Q8D7",
    isDuo: true,
    alergenos: ["mariscos", "gluten"]
  },
  {
    id: "duo_clasico",
    name: "Dúo Clásico Marinero",
    price: 49.90,
    description: "El infaltable matrimonio gastronómico peruano: ceviche fresco de pescado + arroz con mariscos cremosito y humeante.",
    category: "duos",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx3-ZIQB0DjbthW0sDMQwG6ToSnZEIc9no-YgSJpxxJzxtnZSpy9416yMFJ4Pqt76gucDSMIIMA3u4XHu4sVzXEma3QvmXapEjm_uUnurhfc4A6odu_wi2IHKcl00Mey6-5jAFak9Q8AlGmJHESJbOnbYAybeHp6sQO2uj3HeXZ-oh_097Pr9wHY_QJJo8kDNRMBCFVUg0-A-EFJzjalgeGxVpD_I8GD83ZKfoG1AT6KY4RxSHfp_wVsIovXhqD0RrD26F3cpj9JuV",
    isDuo: true,
    alergenos: ["mariscos", "lacteos"]
  },

  // --- Bebidas ---
  {
    id: "beb_agua_con_gas",
    name: "Agua San Luis con Gas (350ml)",
    price: 6.00,
    description: "Agua de mesa gasificada de 350ml, ideal para acompañar tus ceviches con harto limón.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1608885898957-947a50616b25?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_agua_sin_gas",
    name: "Agua San Luis sin Gas (350ml)",
    price: 6.00,
    description: "Agua de mesa pura sin gas, fresca y ligera de 350ml para refrescar tu paladar.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_coca_cola_regular",
    name: "Coca-Cola Regular (300ml)",
    price: 6.50,
    description: "La gaseosa clásica helada de 300ml en original presentación de vidrio/lata para maridar tu sabroso plato.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_coca_cola_zero",
    name: "Coca-Cola Zero (300ml)",
    price: 6.50,
    description: "El inconfundible sabor refrescante de siempre, helada de receta Zero azúcar (300ml).",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_inka_cola_regular",
    name: "Inka Kola Regular (300ml)",
    price: 6.50,
    description: "La compañera dorada indiscutible de nuestra gastronomía. Gaseosa nacional heladita de 300ml.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_inka_cola_zero",
    name: "Inka Kola Zero (300ml)",
    price: 6.50,
    description: "El inconfundible sabor nacional en su balanceada versión Zero azúcar y calorías (300ml).",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80",
    noSpicy: true
  },
  {
    id: "beb_chicha_morada_1lt",
    name: "Chicha Morada (1Lt)",
    price: 18.90,
    description: "Exquisita receta de chicha de la casa, hervida con maíz morado, piña, manzana clavo y canela. Botella de 1 litro.",
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    isRecommended: true,
    badge: "Casera",
    noSpicy: true
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
    badge: "Artesanal",
    noSpicy: true,
    alergenos: ["gluten", "lacteos"]
  },
  {
    id: "pos_limon",
    name: "Pie de Limón Real",
    price: 17.00,
    description: "Base crocante de galleta de vainilla, relleno cítrico premium de limón norteño sutil y un merengue suizo dorado al soplete.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
    noSpicy: true,
    alergenos: ["gluten", "lacteos"]
  },
  {
    id: "pos_cheesecake",
    name: "Cheesecake de Frutos Rojos",
    price: 19.00,
    description: "Textura cremosa fría sobre base de galleta con mantequilla andina, coronada con compota casera reducida de fresas, arándanos y frambuesas jugosas.",
    category: "postres",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    badge: "Nuevo",
    noSpicy: true,
    alergenos: ["gluten", "lacteos"]
  }
];
