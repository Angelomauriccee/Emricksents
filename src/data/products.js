// Complete list of all perfumes in alphabetical order with proper image mapping
const products = [
  {
    id: 1,
    name: "Afnan 9pm eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 60000,
    originalPrice: null,
    image: "/images/afnan-9pm-men-display.jpeg",
    images: [
      "/images/afnan-9pm-men-display.jpeg",
      "/images/afnan-9pm-men.jpg"
    ],
    description: "Afnan 9pm is a captivating fragrance that embodies sophistication and allure. This luxurious scent opens with vibrant citrus notes that gradually blend with a heart of aromatic spices and rich florals. The base notes of warm amber, vanilla, and musk create a lasting impression that's perfect for evening wear. Its elegant composition offers a perfect balance of freshness and depth, making it a versatile choice for the modern individual who appreciates refined fragrances.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Eugenol, Benzyl Benzoate, Citronellol, Geraniol, Cinnamal, Benzyl Alcohol, Citral, Farnesol, Benzyl Cinnamate, Benzyl Salicylate, Alpha-Isomethyl Ionone",
        details: {
      topNotes: ["Apple", "Cinnamon", "Wild Lavender", "Bergamot"],
      heartNotes: ["Orange Blossom", "Lily of the Valley"],
      baseNotes: ["Vanilla", "Tonka Bean", "Amber", "Patchouli", "Musk"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
  },
  {
    id: 2,
    name: "Afnan 9pm REBEL eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 60000,
    originalPrice: null,
    image: "/images/Afnan-9pm-rebel-display.jpeg",
    images: [
      "/images/Afnan-9pm-rebel-display.jpeg",
      "/images/Afnan-9pm-rebel.jpg"
    ],
    description: "Afnan 9pm REBEL is a bold and distinctive fragrance that challenges conventions. This daring scent begins with an invigorating burst of bergamot and black pepper, leading to a complex heart of leather and smoky incense. The base notes of vetiver, patchouli, and dark amber create a rebellious signature that lingers impressively. Perfect for those who dare to stand out, this fragrance exudes confidence and charisma with every note, making it ideal for those who write their own rules.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone",
    details: {
  topNotes: ["Pineapple", "Granny Smith Apple", "Mandarin"],  // confirmed :contentReference[oaicite:0]{index=0}
  heartNotes: ["Oakmoss", "Vanilla", "Cedarwood"],           // confirmed :contentReference[oaicite:1]{index=1}
  baseNotes: ["Dry Woods", "Ambergris", "Caramel", "Musk"]    // confirmed :contentReference[oaicite:2]{index=2}
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
  },
  {
    id: 3,
    name: "Afnan la fleur bouquet eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 92000,
    originalPrice: null,
    image: "/images/afnan-la-fluer-bouquet-display.webp",
    images: [
      "/images/afnan-la-fluer-bouquet-display.webp",
      "/images/afnan-la-fluer-bouquet-pack.jpg",
      "/images/afnan-la-fluer-bouquet.jpg"
    ],
    description: "Afnan La Fleur Bouquet is an exquisite floral masterpiece that celebrates the beauty of nature's most delicate blooms. This enchanting fragrance opens with sparkling notes of bergamot and lily of the valley, unfolding into a lush heart of jasmine, rose, and peony. The base notes of white musk, sandalwood, and vanilla provide a warm, creamy foundation that enhances the floral composition. Elegant and timeless, this perfume captures the essence of a fresh bouquet of flowers, making it perfect for those who appreciate classic femininity with a modern twist.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Linalool, Limonene, Hydroxycitronellal, Geraniol, Citronellol, Alpha-Isomethyl Ionone, Benzyl Salicylate, Benzyl Benzoate, Farnesol, Benzyl Alcohol, Citral, Eugenol",
    details: {
  topNotes: ["Orange Blossom", "Jasmine", "Peony"],           // confirmed :contentReference[oaicite:3]{index=3}
  heartNotes: ["Litchi", "Peach", "Bergamot"],                // confirmed :contentReference[oaicite:4]{index=4}
  baseNotes: ["Musk", "Moss", "Petalia"]                      // confirmed :contentReference[oaicite:5]{index=5}
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false
  },
  {
    id: 4,
    name: "Afnan supremacy collector’s edition eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 105000,
    originalPrice: null,
    image: "/images/Afnan-supremacy-collectors-edition-eau-de-parfum-display.jpeg",
    images: [
      "/images/Afnan-supremacy-collectors-edition-eau-de-parfum-display.jpeg",
      "/images/Afnan-supremacy-collectors-edition-eau-de-parfum-pack.jpeg",
      "/images/Afnan-supremacy-collectors-edition-eau-de-parfum.jpeg"
    ],
    description: "Afnan supremacy collector’s edition eau de parfum 100ml is an exquisite fragrance that captures the essence of luxury and sophistication. Crafted with precision and passion, it offers a unique olfactory experience that evolves beautifully throughout the day. The carefully selected notes create a harmonious blend that is both distinctive and memorable.",
   details: {
  topNotes: ["Bergamot", "Pineapple", "Black Currant"],        // TBC
  heartNotes: ["Birch", "Jasmine", "Rose"],                    // TBC
  baseNotes: ["Musk", "Oakmoss", "Ambergris", "Vanilla"]        // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol",
    collection: "limited"
  },
  {
    id: 5,
    name: "Afnan supremacy not only intense extrait de parfum 100ml",
    category: "Unisex Collection",
    type: "Extrait",
    price: 87000,
    originalPrice: null,
    image: "/images/afnan-supremacy-not-only-intense-display.jpg",
    images: [
      "/images/afnan-supremacy-not-only-intense-display.jpg",
      "/images/afnan-supremacy-not-only-intense-pack.jpg"
    ],
    description: "Afnan Supremacy Not Only Intense is an extraordinary extrait de parfum that delivers unparalleled intensity and longevity. This potent fragrance opens with a captivating blend of citrus and spicy notes, leading to a sophisticated heart of rich florals and aromatic woods. The base notes of amber, leather, and oud create a powerful foundation that resonates for hours. With its exceptional concentration, this extrait de parfum offers a luxurious scent experience that evolves beautifully throughout the day, making it perfect for special occasions and those who appreciate truly remarkable fragrances.",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Eugenol, Benzyl Benzoate, Citronellol, Geraniol, Cinnamal, Benzyl Alcohol, Citral, Farnesol, Benzyl Cinnamate, Benzyl Salicylate, Alpha-Isomethyl Ionone",
    details: {
  topNotes: ["Black Currant", "Apple", "Bergamot", "Pineapple"], // TBC
  heartNotes: ["Lavender", "Patchouli", "Rose", "Birch"],         // TBC
  baseNotes: ["Musk", "Ambergris", "Oud", "Vanilla"]              // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false
  },
  {
    id: 6,
    name: "Afnan supremacy pour homme eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 65000,
    originalPrice: null,
    image: "/images/Afnan-Supremacy-Silver-Pour-Homme-Edp-100ml-display.jpeg",
    images: [
      "/images/Afnan-Supremacy-Silver-Pour-Homme-Edp-100ml-display.jpeg",
      "/images/Afnan-Supremacy-Silver-Pour-Homme-Edp-100ml-pack.jpeg"
    ],
    description: "Afnan supremacy pour homme eau de parfum 100ml is an exquisite fragrance that captures the essence of luxury and sophistication. Crafted with precision and passion, it offers a unique olfactory experience that evolves beautifully throughout the day. The carefully selected notes create a harmonious blend that is both distinctive and memorable.",
    details: {
  topNotes: ["Pineapple", "Bergamot", "Black Currant", "Apple"],  // TBC
  heartNotes: ["Birch", "Jasmine", "Rose"],                        // TBC
  baseNotes: ["Musk", "Oakmoss", "Ambergris", "Vanilla"]           // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol"
  },
  {
    id: 7,
    name: "Amouage crimson rocks eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 596000,
    originalPrice: null,
    image: "/images/amouage-crimson-rocks-edp-display.jpeg",
    images: [
      "/images/Amouage-crimson-rocks-edp-display.jpeg",
      "/images/Amouage-crimson-rocks-edp-pack.jpeg"
    ],
    description: "Amouage crimson rocks eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
  topNotes: ["Cinnamon", "Pink Pepper"],                         // TBC
  heartNotes: ["Rose", "Honey"],                                 // TBC
  baseNotes: ["Oakwood", "Atlas Cedar", "Vetiver"]               // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 8,
    name: "Amouage interlude man eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 680000,
    originalPrice: null,
    image: "/images/amouage-interlude-man-edp-display.jpeg",
    images: [
      "/images/amouage-interlude-man-edp-display.jpeg"
    ],
    description: "Amouage interlude man eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
  topNotes: ["Bergamot", "Oregano", "Allspice"],                 // TBC
  heartNotes: ["Amber", "Frankincense", "Opoponax"],             // TBC
  baseNotes: ["Leather", "Agarwood (Oud)", "Patchouli", "Sandalwood"] // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 9,
    name: "Armaf club de nuit maleka eau de parfume 105ml-",
    category: "",
    type: "Parfum",
    price: 72220,
    originalPrice: null,
    image: "/images/Armaf-club-de-nuit-maleka-display.webp",
    images: [
      "/images/Armaf-club-de-nuit-maleka-pack.jpg",
      "/images/Armaf-club-de-nuit-maleka-display.webp",
      "/images/Armaf-club-de-nuit-maleka.jpg"
    ],
    description: "Armaf club de nuit  maleka eau de parfume 105ml- is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["Lychee", "Bergamot", "Pink Pepper"],                // confirmed :contentReference[oaicite:6]{index=6}
  heartNotes: ["Orris"],                                          // confirmed :contentReference[oaicite:7]{index=7}
  baseNotes: ["Praline", "Sandalwood", "Ambroxan"]                // confirmed :contentReference[oaicite:8]{index=8}
},
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 10,
    name: "Armaf club de nuit intense man eau de toilette 105ml",
    category: "",
    type: "EDT",
    price: 67000,
    originalPrice: null,
    image: "/images/armaf-club-de-nuit-intense-man-display.jpeg",
    images: [
      "/images/armaf-club-de-nuit-intense-man-display.jpeg",
      "/images/armaf-club-de-nuit-intense-man-pack.jpg"
    ],
    description: "Armaf club de nuit intense man eau de toilette 105ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["Lemon", "Pineapple", "Black Currant", "Apple", "Bergamot"], // TBC
  heartNotes: ["Birch", "Jasmine", "Rose"],                                 // TBC
  baseNotes: ["Musk", "Ambergris", "Patchouli", "Vanilla"]                 // TBC
},
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    collection: "signature",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 11,
    name: "Armaf club de nuit Precieux I extrait de parfum 55ml",
    category: "Unisex Collection",
    type: "Extrait",
    price: 125000,
    originalPrice: null,
    image: "/images/Armaf-precieux-i-club-de-nuit-extrait-display.jpeg",
    images: [
      "/images/Armaf-precieux-i-club-de-nuit-extrait-pack.jpeg",
      "/images/Armaf-precieux-i-club-de-nuit-extrait-display.jpeg"
    ],
    description: "Armaf club de nuit Precieux I extrait de parfum 55ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["TBC"],
  heartNotes: ["TBC"],
  baseNotes: ["TBC"]
},
    size: "55ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 12,
    name: "Armaf club de nuit sillage eau de parfum 105ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 75000,
    originalPrice: null,
    image: "/images/armaf-club-de-nuit-sillage-display.webp",
    images: [
      "/images/armaf-club-de-nuit-sillage-display.webp",
      "/images/armaf-club-de-nuit-sillage-pack.jpg"
    ],
    description: "Armaf club de nuit sillage eau de parfum 105ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["Bergamot", "Black Currant", "Lemon", "Lime", "Ginger"],        // TBC
  heartNotes: ["Rose", "Iris", "Jasmine"],                                   // TBC
  baseNotes: ["Ambroxan", "Musk", "Cedarwood"]                               // TBC
},
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 13,
    name: "Armaf club de nuit urban man elixir eau de parfum 105ml",
    category: "",
    type: "Parfum",
    price: 68000,
    originalPrice: null,
    image: "/images/armaf-club-de-nuit-urban-man-display.jpeg",
    images: [
      "/images/armaf-club-de-nuit-urban-man-display.jpeg"
    ],
    description: "Armaf club de nuit urban man elixir eau de parfum 105ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["TBC"],
  heartNotes: ["TBC"],
  baseNotes: ["TBC"]
},
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 14,
    name: "Armaf club de nuit woman eau de parfum 105ml",
    category: "",
    type: "Parfum",
    price: 62000,
    originalPrice: null,
    image: "/images/armaf-club-de-nuit-women-edp-display.webp",
    images: [
      "/images/armaf-club-de-nuit-women-edp-display.webp",
      "/images/armaf-club-de-nuit-women-edp-pack.jpg",
      "/images/armaf-club-de-nuit-women-edp.jpg"
    ],
    description: "Armaf club de nuit woman eau de parfum 105ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["Orange", "Bergamot", "Grapefruit", "Peach"],                    // confirmed :contentReference[oaicite:9]{index=9}
  heartNotes: ["Rose", "Jasmine", "Litchi", "Geranium"],                      // confirmed :contentReference[oaicite:10]{index=10}
  baseNotes: ["Patchouli", "Vanilla", "Musk", "Vetiver"]                      // confirmed :contentReference[oaicite:11]{index=11}
},
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 15,
    name: "Armaf delights yumyum eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 80999,
    originalPrice: null,
    image: "/images/Afnan-yum-yum-de-parfum-display.jpg",
    images: [
      "/images/Afnan-yum-yum-de-parfum-display.jpg",
      "/images/Afnan-yum-yum-de-parfum-pack.jpg",
      "/images/Afnan-yum-yum-de-parfum.jpg"
    ],
    description: "Armaf delights yumyum eau de parfum 100ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["TBC"],
  heartNotes: ["TBC"],
  baseNotes: ["TBC"]
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 16,
    name: "Armaf Miss Armaf catwalk eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 60000,
    originalPrice: null,
    image: "/images/Armaf-Miss-Armaf-catwalk-eau-de-parfum-display.jpeg",
    images: [
      "/images/Armaf-Miss-Armaf-catwalk-eau-de-parfum-display.jpeg",
      "/images/Armaf-Miss-Armaf-catwalk-eau-de-parfum-pack.jpeg"
    ],
    description: "Armaf Miss Armaf catwalk eau de parfum 100ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["TBC"],
  heartNotes: ["TBC"],
  baseNotes: ["TBC"]
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 17,
    name: "Armaf ombre d’or eau de parfum 75ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 75000,
    originalPrice: null,
    image: "/images/Armaf-ombredor-edp-display.webp",
    images: [
      "/images/Armaf-ombredor-edp-display.webp",
      "/images/Armaf-ombredor-edp-pack.jpg"
    ],
    description: "Armaf ombre d’or eau de parfum 75ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
  topNotes: ["TBC"],
  heartNotes: ["TBC"],
  baseNotes: ["TBC"]
},
    size: "75ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 18,
    name: "Azzaro the most wanted eau de parfum intense 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 180000,
    originalPrice: null,
    image: "/images/azzaro-the-most-wanted-edp-intense-display.jpg",
    images: [
      "/images/azzaro-the-most-wanted-edp-intense-display.jpg",
      "/images/azzaro-the-most-wanted-edp-intense-pack.jpg"
    ],
    description: "Azzaro the most wanted eau de parfum intense 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
   details: {
  topNotes: ["Cardamom"],                                                   // TBC
  heartNotes: ["Toffee Accord"],                                            // TBC
  baseNotes: ["Amberwood", "Vetiver"]                                        // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 19,
    name: "Azzaro wanted girl eau de parfum 80ml",
    category: "",
    type: "Parfum",
    price: 150000,
    originalPrice: null,
    image: "/images/Azzaro-wanted-girl-eau-de-parfum-80ml-display.jpeg",
    images: [
      "/images/Azzaro-wanted-girl-eau-de-parfum-80ml-display.jpeg",
      "/images/Azzaro-wanted-girl-eau-de-parfum-80ml-pack.jpeg"
    ],
    description: "Azzaro wanted girl eau de parfum 80ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
   details: {
  topNotes: ["Ginger Flower", "Orange Blossom", "Pink Pepper"],              // TBC
  heartNotes: ["Datura Flower", "Caramel", "Dulce de Leche"],                // TBC
  baseNotes: ["Tonka Bean", "Vanilla", "Vetiver", "Patchouli"]               // TBC
},
    size: "80ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 20,
    name: "Bentley for men absolute eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 70000,
    originalPrice: null,
    image: "/images/bentley-for-men-absolute-display.webp",
    images: [
      "/images/bentley-for-men-absolute-display.webp"
    ],
    description: "Bentley for men absolute eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
  topNotes: ["Pink Pepper", "Ginger", "Olibanum"],                            // TBC
  heartNotes: ["Papyrus", "Sandalwood", "Atlas Cedar"],                       // TBC
  baseNotes: ["Amber", "Moss", "Oud"]                                          // TBC
},
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 21,
    name: "Bentley for men intense eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 70000,
    originalPrice: null,
    image: "/images/bentley-for-men-intense-edp-display.jpeg",
    images: [
      "/images/bentley-for-men-intense-edp-display.jpeg"
    ],
    description: "Bentley for men intense eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 22,
    name: "Bleu de chanel paris eau de parfum pour homme 100ml",
    category: "",
    type: "Parfum",
    price: 415000,
    originalPrice: null,
    image: "/images/bleu-de-chanel-paris-eau-de-parfum-pour-homme-display.jpeg",
    images: [
      "/images/bleu-de-chanel-paris-eau-de-parfum-pour-homme-display.jpeg"
    ],
    description: "Bleu de chanel paris eau de parfum pour homme 100ml is an iconic fragrance that represents timeless elegance and luxury. Created with the finest ingredients and unparalleled craftsmanship, it embodies the essence of the legendary fashion house. The sophisticated composition unfolds beautifully on the skin, revealing complex layers that tell a story of refinement and style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Citral, Eugenol, Farnesol, Benzyl Benzoate, Benzyl Alcohol, Benzyl Salicylate, Cinnamal, Cinnamyl Alcohol",
    collection: "limited"
  },
  {
    id: 23,
    name: "hugo boss the scent absolute eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 202000,
    originalPrice: null,
    image: "/images/hugo-boss-the-scent-absolute-display.jpeg",
    images: [
      "/images/hugo-boss-the-scent-absolute-display.jpeg"
    ],
    description: "hugo boss the scent absolute eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 24,
    name: "hugo boss the scent for her eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 220000,
    originalPrice: null,
    image: "/images/hugo-boss-the-scent-for-her-display.jpeg",
    images: [
      "/images/hugo-boss-the-scent-for-her-display.jpeg"
    ],
    description: "hugo boss the scent for her eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 25,
    name: "Burberry Her eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 230000,
    originalPrice: null,
    image: "/images/burberry-her-display.jpeg",
    images: [
      "/images/burberry-her-display.jpeg"
    ],
    description: "Burberry Her eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 26,
    name: "Bvlgari man in black eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 225000,
    originalPrice: null,
    image: "/images/Bvlgari-man-in-black-display.jpeg",
    images: [
      "/images/Bvlgari-man-in-black-display.jpeg",
      "/images/Bvlgari-man-in-black-pack.jpeg"
    ],
    description: "Bvlgari man in black eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 27,
    name: "Calvin klein Eternity for men AIR eau de toilette 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 144000,
    originalPrice: null,
    image: "/images/calvin-klein-eternity-for-men-air-display.jpeg",
    images: [
      "/images/calvin-klein-eternity-for-men-air-display.jpeg"
    ],
    description: "Calvin klein Eternity for men AIR eau de toilette 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 28,
    name: "Calvin klein Eternity for men flame eau de toilette 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 143000,
    originalPrice: null,
    image: "/images/calvin-klein-eternity-for-men-flame-display.jpeg",
    images: [
      "/images/calvin-klein-eternity-for-men-flame-display.jpeg"
    ],
    description: "Calvin klein Eternity for men flame eau de toilette 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 29,
    name: "Calvin klein Eternity for women eau de parfum  100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 167000,
    originalPrice: null,
    image: "/images/calvin-klein-eternity-for-women-display.jpeg",
    images: [
      "/images/calvin-klein-eternity-for-women-display.jpeg",
      "/images/calvin-klein-eternity-for-women.jpg"
    ],
    description: "Calvin klein Eternity for women eau de parfum  100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 30,
    name: "Calvin klein Eternity for women eau de parfum intense 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 176000,
    originalPrice: null,
    image: "/images/Calvin-klein-Eternity-for-women-edp-intense-display.jpeg",
    images: [
      "/images/Calvin-klein-Eternity-for-women-edp-intense-display.jpeg",
      "/images/Calvin-klein-Eternity-for-women-edp-intense-pack.jpeg"
    ],
    description: "Calvin klein Eternity for women eau de parfum intense 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 31,
    name: "Calvin klein Eternity for women flame eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 160000,
    originalPrice: null,
    image: "/images/Calvin-klein-Eternity-for-women-flame-display.jpeg",
    images: [
      "/images/Calvin-klein-Eternity-for-women-flame-display.jpeg",
      "/images/Calvin-klein-Eternity-for-women-flame-pack.jpeg",
      "/images/Calvin-klein-Eternity-for-women-flame.jpeg"
    ],
    description: "Calvin klein Eternity for women flame eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 32,
    name: "Carolina Herrera 212 men nyc eau de toilette 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 115000,
    originalPrice: null,
    image: "/images/carolina-herrera-212-men-nyc-edt-display.jpeg",
    images: [
      "/images/carolina-herrera-212-men-nyc-edt-display.jpeg"
    ],
    description: "Carolina Herrera 212 men nyc eau de toilette 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 33,
    name: "Carolina Herrera 212 vip black nyc eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 167000,
    originalPrice: null,
    image: "/images/carolina-herrera-212-vip-black-nycdisplay.jpeg",
    images: [
      "/images/carolina-herrera-212-vip-black-nycdisplay.jpeg"
    ],
    description: "Carolina Herrera 212 vip black nyc eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 34,
    name: "Carolina Herrera 212 vip rose eau cde parfum 80ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 172000,
    originalPrice: null,
    image: "/images/carolina-herrera-212-vip-rose-edp-display.jpeg",
    images: [
      "/images/carolina-herrera-212-vip-rose-edp-display.jpeg"
    ],
    description: "Carolina Herrera 212 vip rose eau cde parfum 80ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "80ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 35,
    name: "Carolina Herrera bad boy cobalt eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 190000,
    originalPrice: null,
    image: "/images/carolina-herrera-bad-boy-cobalt-edp-display.jpeg",
    images: [
      "/images/carolina-herrera-bad-boy-cobalt-edp-display.jpeg"
    ],
    description: "Carolina Herrera bad boy cobalt eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 36,
    name: "Carolina Herrera good girl gold fantasy eau de parfum 80ml",
    category: "",
    type: "Parfum",
    price: 205000,
    originalPrice: null,
    image: "/images/carolina-herrera-good-girl-gold-fantasy-edp-display.jpeg",
    images: [
      "/images/carolina-herrera-good-girl-gold-fantasy-edp-display.jpeg"
    ],
    description: "Carolina Herrera good girl gold fantasy eau de parfum 80ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "80ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 37,
    name: "Chanel paris  coco mademoiselle eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 400000,
    originalPrice: null,
    image: "/images/Chanel-paris-coco-mademoiselle-display.jpeg",
    images: [
      "/images/Chanel-paris-coco-mademoiselle-display.jpeg",
      "/images/Chanel-paris-coco-mademoiselle-pack.jpeg"
    ],
    description: "Chanel paris  coco mademoiselle eau de parfum 100ml is an iconic fragrance that represents timeless elegance and luxury. Created with the finest ingredients and unparalleled craftsmanship, it embodies the essence of the legendary fashion house. The sophisticated composition unfolds beautifully on the skin, revealing complex layers that tell a story of refinement and style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Citral, Eugenol, Farnesol, Benzyl Benzoate, Benzyl Alcohol, Benzyl Salicylate, Cinnamal, Cinnamyl Alcohol"
  },
  {
    id: 38,
    name: "Chanel paris N’0 5 Eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 400000,
    originalPrice: null,
    image: "/images/Chanel-paris-N0 5-display.jpeg",
    images: [
      "/images/Chanel-paris-N0 5-display.jpeg",
      "/images/Chanel-paris-N0 5-pack.jpeg"
    ],
    description: "Chanel paris N’0 5 Eau de parfum 100ml is an iconic fragrance that represents timeless elegance and luxury. Created with the finest ingredients and unparalleled craftsmanship, it embodies the essence of the legendary fashion house. The sophisticated composition unfolds beautifully on the skin, revealing complex layers that tell a story of refinement and style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    collection: "signature",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Citral, Eugenol, Farnesol, Benzyl Benzoate, Benzyl Alcohol, Benzyl Salicylate, Cinnamal, Cinnamyl Alcohol"
  },
  {
    id: 39,
    name: "Clive Christian 1872 original collector perfume spray 100ml",
    category: "Unisex Collection",
    type: "EDP",
    price: 1250000,
    originalPrice: null,
    image: "/images/clive-christian-1872-original-collector-perfume-spray-display.jpeg",
    images: [
      "/images/clive-christian-1872-original-collector-perfume-spray-display.jpeg"
    ],
    description: "Clive Christian 1872 original collector perfume spray 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 40,
    name: "Creed aventus cologne eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 602500,
    originalPrice: null,
    image: "/images/Creed-aventus-cologne-edp-display.jpeg",
    images: [
      "/images/Creed-aventus-cologne-edp-display.jpeg",
      "/images/Creed-aventus-cologne-edp-pack.jpeg",
      "/images/Creed-aventus-cologne-edp.jpg"
    ],
    description: "Creed aventus cologne eau de parfum 100ml is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin"
  },
  {
    id: 41,
    name: "Creed aventus eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 615000,
    originalPrice: null,
    image: "/images/creed-aventusdisplay.jpeg",
    images: [
      "/images/creed-aventusdisplay.jpeg",
      "/images/Creed-aventus-pack.jpeg"
    ],
    description: "Creed aventus eau de parfum 100ml is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin",
    collection: "signature"
  },
  {
    id: 42,
    name: "Creed green irish tweed eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 605000,
    originalPrice: null,
    image: "/images/creed-green-irish-tweed-edp-display.jpeg",
    images: [
      "/images/creed-green-irish-tweed-edp-display.jpeg"
    ],
    description: "Creed green irish tweed eau de parfum 100ml is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin",
  },
  {
    id: 43,
    name: "Creed queen of silk eau de parfum 75ml",
    category: "",
    type: "Parfum",
    price: 690000,
    originalPrice: null,
    image: "/images/creed-queen-of-silk-edp-display.jpeg",
    images: [
      "/images/creed-queen-of-silk-edp-display.jpeg"
    ],
    description: "Creed queen of silk eau de parfum 75ml is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "75ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin"
  },
  {
    id: 44,
    name: "Creed royal oud eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 620000,
    originalPrice: null,
    image: "/images/creed-royal-oud-edp-display.jpeg",
    images: [
      "/images/creed-royal-oud-edp-display.jpeg"
    ],
    description: "Creed royal oud eau de parfum 100ml is an exceptional fragrance that exemplifies the house commitment to quality and artisanal craftsmanship. Created using traditional techniques and the finest natural ingredients, it offers a luxurious olfactory experience. The sophisticated blend of notes creates a distinctive signature that evolves beautifully throughout the day, revealing new facets with each passing hour.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Eugenol, Farnesol, Citral, Benzyl Benzoate, Benzyl Salicylate, Benzyl Alcohol, Amyl Cinnamal, Coumarin",
    collection: "signature"
  },
  {
    id: 45,
    name: "Davidoff cool water eau de toilette 125ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 107000,
    originalPrice: null,
    image: "/images/davidoff-cool-water-edt-display.jpeg",
    images: [
      "/images/davidoff-cool-water-edt-display.jpeg"
    ],
    description: "Davidoff cool water eau de toilette 125ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "125ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 46,
    name: "Dior sauvage eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 289000,
    originalPrice: null,
    image: "/images/dior-sauvage-edp-display.jpeg",
    images: [
      "/images/dior-sauvage-edp-display.jpeg",
      "/images/dior-sauvage-edp-pack.jpg"
    ],
    description: "Dior sauvage eau de parfum 100ml is a magnificent fragrance that embodies the elegance and sophistication of the legendary fashion house. Created with exceptional ingredients and unparalleled craftsmanship, it offers a luxurious olfactory journey. The harmonious composition unfolds beautifully on the skin, revealing complex layers that tell a story of French refinement and timeless style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    collection: "signature",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Citronellol, Geraniol, Coumarin, Citral, Benzyl Alcohol, Benzyl Benzoate, Farnesol, Benzyl Salicylate, Eugenol, Alpha-Isomethyl Ionone"
  },
  {
    id: 47,
    name: "Dolce & Gabbana devotion eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 195000,
    originalPrice: null,
    image: "/images/Dolce-&-Gabbana-devotion-edp-display.jpeg",
    images: [
      "/images/Dolce-&-Gabbana-devotion-edp-display.jpeg",
      "/images/Dolce-&-Gabbana-devotion-edp.jpeg",
      "/images/Dolce-&-Gabbana-devotion-pack.jpeg"
    ],
    description: "Dolce & Gabbana devotion eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 48,
    name: "Dolce & Gabbana devotion pour homme eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 232000,
    originalPrice: null,
    image: "/images/Dolce-&-Gabbana-devotion-pour-homme-edp-display.jpeg",
    images: [
      "/images/Dolce-&-Gabbana-devotion-pour-homme-edp-display.jpeg",
      "/images/Dolce-&-Gabbana-devotion-pour-homme-edp-pack.jpg"
    ],
    description: "Dolce & Gabbana devotion pour homme eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 49,
    name: "Dolce & Gabbana the only one eau de parfum intense 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 245000,
    originalPrice: null,
    image: "/images/Dolce-&-Gabbana-the-only-one-display.jpeg",
    images: [
      "/images/Dolce-&-Gabbana-the-only-one-display.jpeg",
      "/images/Dolce-&-Gabbana-the-only-one-pack.webp"
    ],
    description: "Dolce & Gabbana the only one eau de parfum intense 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 50,
    name: "Emporio Armani stronger with you Absolutely parfum pour homme 100ml",
    category: "",
    type: "Parfum",
    price: 205000,
    originalPrice: null,
    image: "/images/Emporio-armani-absolutely-stronger-with-you-display.jpeg",
    images: [
      "/images/Emporio-armani-absolutely-stronger-with-you-display.jpeg",
      "/images/Emporio-armani-absolutely-stronger-with-you-pack.jpeg",
      "/images/Emporio-armani-absolutely-stronger-with-you.jpg"
    ],
    description: "Emporio Armani stronger with you Absolutely parfum pour homme 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 51,
    name: "Emporio Armani stronger with you intensely eau de parfum pour homme 100ml",
    category: "",
    type: "Parfum",
    price: 205000,
    originalPrice: null,
    image: "/images/Emporio-armani-Intensely-stronger-with-you-display.jpeg",
    images: [
      "/images/Emporio-armani-Intensely-stronger-with-you-display.jpeg",
      "/images/emporio armani stronger with you intensely-pack.webp"
    ],
    description: "Emporio Armani stronger with you intensely eau de parfum pour homme 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 52,
    name: "Emporio Armani stronger with you parfum 100ml",
    category: "",
    type: "Parfum",
    price: 249700,
    originalPrice: null,
    image: "/images/Emporio-Armani-stronger-with-you-parfum-100ml-display.jpeg",
    images: [
      "/images/Emporio-Armani-stronger-with-you-parfum-100ml-pack.jpeg",
      "/images/Emporio-Armani-stronger-with-you-parfum-100ml.jpeg",
      "/images/Emporio-Armani-stronger-with-you-parfum-100ml-display.jpeg"
    ],
    description: "Emporio Armani stronger with you parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 53,
    name: "Emporio Armani stronger with you tobacco eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 245700,
    originalPrice: null,
    image: "/images/emporio-armani-stronger-with-you-tobacco-display.jpeg",
    images: [
      "/images/emporio-armani-stronger-with-you-tobacco-display.jpeg"
    ],
    description: "Emporio Armani stronger with you tobacco eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 54,
    name: "Ferragamo intense leather eau de parfum pour homme 100ml",
    category: "",
    type: "Parfum",
    price: 168000,
    originalPrice: null,
    image: "/images/ferragamo-intense-leather-eau-de-parfum-pour-homme-display.jpeg",
    images: [
      "/images/ferragamo-intense-leather-eau-de-parfum-pour-homme-display.jpeg"
    ],
    description: "Ferragamo intense leather eau de parfum pour homme 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 55,
    name: "Ferragamo spicy leather parfum pour homme 100ml",
    category: "",
    type: "Parfum",
    price: 175350,
    originalPrice: null,
    image: "/images/ferragamo-spicy-leather-parfum-pour-homme-display.jpeg",
    images: [
      "/images/ferragamo-spicy-leather-parfum-pour-homme-display.jpeg",
      "/images/ferragamo-spicy-leather-parfum-pour-homme-pack.jpg",
      "/images/ferragamo-spicy-leather-parfum-pour-homme.jpg"
    ],
    description: "Ferragamo spicy leather parfum pour homme 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 56,
    name: "Giorgio Armani my way eau de parfum 90ml",
    category: "",
    type: "Parfum",
    price: 250000,
    originalPrice: null,
    image: "/images/Giorgio-armani-my-way-display.webp",
    images: [
      "/images/Giorgio-armani-my-way-display.webp",
      "/images/Giorgio-armani-my-way-pack.jpeg"
    ],
    description: "Giorgio Armani my way eau de parfum 90ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "90ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 57,
    name: "Giorgio Armani SI eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 250000,
    originalPrice: null,
    image: "/images/Giorgio-amani-si-display.jpeg",
    images: [
      "/images/Giorgio-amani-si-display.jpeg",
      "/images/Giorgio-amani-si-pack.jpg"
    ],
    description: "Giorgio Armani SI eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 58,
    name: "Givenchy gentleman society  ambree eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 250000,
    originalPrice: null,
    image: "/images/Givenchy-gentleman-society-ambree-display.jpeg",
    images: [
      "/images/Givenchy-gentleman-society-ambree-display.jpeg",
      "/images/Givenchy-gentleman-society-ambree-pack.jpeg"
    ],
    description: "Givenchy gentleman society  ambree eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 59,
    name: "Givenchy gentleman society eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 211000,
    originalPrice: null,
    image: "/images/givenchy-gentleman-society-display.jpeg",
    images: [
      "/images/givenchy-gentleman-society-display.jpeg"
    ],
    description: "Givenchy gentleman society eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 60,
    name: "Gucci flora gorgeous gardenia eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 238000,
    originalPrice: null,
    image: "/images/gucci-flora-gorgeous-gardenia-display.jpeg",
    images: [
      "/images/gucci-flora-gorgeous-gardenia-display.jpeg"
    ],
    description: "Gucci flora gorgeous gardenia eau de parfum 100ml is an extraordinary fragrance that captures the essence of Italian luxury and contemporary style. Created with exceptional ingredients and innovative techniques, it offers a distinctive olfactory experience that is both sophisticated and modern. The carefully crafted composition unfolds beautifully on the skin, revealing complex layers that embody the creative vision of the iconic fashion house.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Hydroxycitronellal"
  },
  {
    id: 61,
    name: "Gucci flora gorgeous jasmine eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 245000,
    originalPrice: null,
    image: "/images/gucci-flora-gorgeous-jasmine-display.jpeg",
    images: [
      "/images/gucci-flora-gorgeous-jasmine-display.jpeg"
    ],
    description: "Gucci flora gorgeous jasmine eau de parfum 100ml is an extraordinary fragrance that captures the essence of Italian luxury and contemporary style. Created with exceptional ingredients and innovative techniques, it offers a distinctive olfactory experience that is both sophisticated and modern. The carefully crafted composition unfolds beautifully on the skin, revealing complex layers that embody the creative vision of the iconic fashion house.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Hydroxycitronellal"
  },
  {
    id: 62,
    name: "Gucci intense oud eau de parfum 90ml",
    category: "",
    type: "Parfum",
    price: 302000,
    originalPrice: null,
    image: "/images/gucci-intense-oud-display.jpeg",
    images: [
      "/images/gucci-intense-oud-display.jpeg"
    ],
    description: "Gucci intense oud eau de parfum 90ml is an extraordinary fragrance that captures the essence of Italian luxury and contemporary style. Created with exceptional ingredients and innovative techniques, it offers a distinctive olfactory experience that is both sophisticated and modern. The carefully crafted composition unfolds beautifully on the skin, revealing complex layers that embody the creative vision of the iconic fashion house.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "90ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Benzyl Salicylate, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Hydroxycitronellal"
  },
  {
    id: 63,
    name: "L’homme ideal de Guerlain paris parfum 100ml",
    category: "",
    type: "Parfum",
    price: 271000,
    originalPrice: null,
    image: "/images/L’homme-ideal-de-Guerlain-paris-parfum-pack.webp",
    images: [
      "/images/L’homme-ideal-de-Guerlain-paris-parfum-pack.webp",
      "/images/L’homme-ideal-de-Guerlain-paris-parfum-pack.jpeg"
    ],
    description: "L’homme ideal de Guerlain paris parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 64,
    name: "Hermes Terre D’HERMES  Eau intense vetiver 100ml",
    category: "Unisex Collection",
    type: "EDP",
    price: 215000,
    originalPrice: null,
    image: "/images/Hermes-Terre-DHERMES- Eau-intense-vetiver-display.png",
    images: [
      "/images/Hermes-Terre-DHERMES- Eau-intense-vetiver-display.png",
      "/images/Hermes-Terre-DHERMES- Eau-intense-vetiver-pack.jpg",
      "/images/Hermes-Terre-DHERMES- Eau-intense-vetiver.jpeg"
    ],
    description: "Hermes Terre D’HERMES  Eau intense vetiver 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 65,
    name: "Initio oud for greatness eau de parfum 90ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 542000,
    originalPrice: null,
    image: "/images/initio-oud-for-greatness-display.jpeg",
    images: [
      "/images/initio-oud-for-greatness-display.jpeg"
    ],
    description: "Initio oud for greatness eau de parfum 90ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "90ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 66,
    name: "Jean paul Gaultier divine eau de parfume 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 215000,
    originalPrice: null,
    image: "/images/jean-paul-gaultier-divine-edp-display.jpeg",
    images: [
      "/images/jean-paul-gaultier-divine-edp-display.jpeg",
      "/images/jean-paul-gaultier-divine-edp.jpg"
    ],
    description: "Jean paul Gaultier divine eau de parfume 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 67,
    name: "Jean paul Gaultier “Le male” elixir parfum 125ml",
    category: "",
    type: "Parfum",
    price: 215000,
    originalPrice: null,
    image: "/images/jean-paul-gaultier-le-male-elixir-le-parfum-display.jpeg",
    images: [
      "/images/jean-paul-gaultier-le-male-elixir-le-parfum-display.jpeg",
      "/images/jean-paul-gaultier-le-male-elixir-le-parfum.jpg",
      "/images/jean-paul-gaultier-le-male-elixir-le-parfum-pack.jpg"
    ],
    description: "Jean paul Gaultier “Le male” elixir parfum 125ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "125ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 68,
    name: "Jean paul Gaultier “le male” le parfum 125ml",
    category: "",
    type: "Parfum",
    price: 215500,
    originalPrice: null,
    image: "/images/jean-paul-gaultier-le-male-le-parfum-display.jpeg",
    images: [
      "/images/jean-paul-gaultier-le-male-le-parfum-display.jpeg",
      "/images/jean-paul-gaultier-le-male-le-parfum-pack.jpeg",
      "/images/jean-paul-gaultier-le-male-le-parfum.jpg"
    ],
    description: "Jean paul Gaultier “le male” le parfum 125ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "125ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 69,
    name: "Armaf club de nuit untold eau de parfum 105ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 71000,
    originalPrice: null,
    image: "/images/armaf-club-de-nuit-untold-display.webp",
    images: [
      "/images/armaf-club-de-nuit-untold-display.webp",
      "/images/armaf-club-de-nuit-untold-pack.jpg",
      "/images/armaf-club-de-nuit-untold.jpg"
    ],
    description: "Armaf club de nuit untold eau de parfum 105ml is a distinguished fragrance that embodies contemporary elegance with its sophisticated composition. The masterful blend of notes creates a captivating aura that makes a lasting impression. Perfect for the modern individual who appreciates quality craftsmanship in their fragrances.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "105ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 70,
    name: "Louis Vuitton imagination eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 1050000,
    originalPrice: null,
    image: "/images/louis-vuitton-imagination-display.jpeg",
    images: [
      "/images/louis-vuitton-imagination-display.jpeg"
    ],
    description: "Louis Vuitton imagination eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: true,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 71,
    name: "Louis Vuitton les sables roses eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 1350000,
    originalPrice: null,
    image: "/images/louis-vuitton-les-sables-roses-display.jpg",
    images: [
      "/images/louis-vuitton-les-sables-roses-display.jpg"
    ],
    description: "Louis Vuitton les sables roses eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 72,
    name: "Louis Vuitton ombre nomade eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 1380000,
    originalPrice: null,
    image: "/images/louis-vuitton-ombre-nomade-display.jpeg",
    images: [
      "/images/louis-vuitton-ombre-nomade-display.jpeg"
    ],
    description: "Louis Vuitton ombre nomade eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate",
    collection: "signature"
  },
  {
    id: 73,
    name: "L’homme ideal de Guerlain paris eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 225000,
    originalPrice: null,
    image: "/images/L’homme-ideal-de-Guerlain-paris-eau-de-parfum-display.jpeg",
    images: [
      "/images/L’homme-ideal-de-Guerlain-paris-eau-de-parfum-pack.jpeg",
      "/images/L’homme-ideal-de-Guerlain-paris-eau-de-parfum.jpeg"
    ],
    description: "L’homme ideal de Guerlain paris eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 74,
    name: "L’homme ideal l’intense de Guerlain paris eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 225000,
    originalPrice: null,
    image: "/images/L’homme-ideal-intense-de-Guerlain-paris-eau-de-parfum-display.webp",
    images: [
      "/images/L’homme-ideal-intense-de-Guerlain-paris-eau-de-parfum-display.webp",
      "/images/L’homme-ideal-intense-de-Guerlain-paris-eau-de-parfum-pack.avif"
    ],
    description: "L’homme ideal l’intense de Guerlain paris eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 75,
    name: "Montale paris black aoud eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 140000,
    originalPrice: null,
    image: "/images/montale-paris-black-aoud-edp-display.jpeg",
    images: [
      "/images/montale-paris-black-aoud-edp-display.jpeg",
      "/images/montale-paris-black-aoud-edp-pack.jpg",
      "/images/montale-paris-black-aoud-edp.jpg"
    ],
    description: "Montale paris black aoud eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 76,
    name: "Montale paris boise fruite eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 145000,
    originalPrice: null,
    image: "/images/montale-paris-boise-fruite-display.jpeg",
    images: [
      "/images/montale-paris-boise-fruite-display.jpeg",
      "/images/montale-paris-boise-fruite-pack.jpg"
    ],
    description: "Montale paris boise fruite eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 77,
    name: "Montale paris fantastic oud eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 145000,
    originalPrice: null,
    image: "/images/montale-paris-fantastic-oud-display.jpg",
    images: [
      "/images/montale-paris-fantastic-oud-display.jpg"
    ],
    description: "Montale paris fantastic oud eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 78,
    name: "Montale paris intense café eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 145000,
    originalPrice: null,
    image: "/images/Montale-paris-intense-cafe.jpg",
    images: [
      "/images/Montale-paris-intense-cafe.jpg"
    ],
    description: "Montale paris intense café eau de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 79,
    name: "Nishane hacivat extrait de parfum 100ml",
    category: "Unisex Collection",
    type: "Extrait",
    price: 430000,
    originalPrice: null,
    image: "/images/nishane-hacivat-extrait-de-parfum-display.jpeg",
    images: [
      "/images/nishane-hacivat-extrait-de-parfum-display.jpeg",
      "/images/nishane-hacivat-extrait-de-parfum-pack.jpg"
    ],
    description: "Nishane hacivat extrait de parfum 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 80,
    name: "Paco rabanne 1 million eau de parfum 100ml",
    category: "Unisex Collection",
    type: "EDP",
    price: 169000,
    originalPrice: null,
    image: "/images/paco-rabanne-1-million-parfum-display.jpg",
    images: [
      "/images/paco-rabanne-1-million-parfum-display.jpg",
      "/images/paco-rabanne-1-million-parfum-pack.jpg",
      "/images/paco-rabanne-1-million-parfum.jpg"
    ],
    description: "Paco rabanne 1 million eau de parfum is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 81,
    name: "Polo ralph lauren oud eau de parfum 125ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 202000,
    originalPrice: null,
    image: "/images/ralph-lauren-polo-oud-display.jpeg",
    images: [
      "/images/ralph-lauren-polo-oud-display.jpeg",
      "/images/ralph-lauren-polo-oud.jpg"
    ],
    description: "Polo ralph lauren oud eau de parfum 125ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "125ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 82,
    name: "Polo ralph lauren red parfum 125ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 202000,
    originalPrice: null,
    image: "/images/ralph-lauren-red-polo-display.jpeg",
    images: [
      "/images/ralph-lauren-red-polo-display.jpeg",
      "/images/ralph-lauren-red-polo.jpg"
    ],
    description: "Polo ralph lauren red parfum 125ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "125ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 83,
    name: "Tom ford café rose eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 368000,
    originalPrice: null,
    image: "/images/Tom-ford-café-rose-display.jpeg",
    images: [
      "/images/Tom-ford-café-rose-display.jpeg",
      "/images/Tom-ford-café-rose-edp-pack.jpeg"
    ],
    description: "Tom ford café rose eau de parfum 100ml is an extraordinary fragrance that exemplifies the designer bold vision and commitment to luxury. Created with the finest ingredients and uncompromising attention to detail, it offers a sophisticated olfactory experience that is both distinctive and memorable. The complex composition unfolds beautifully on the skin, revealing layers of depth and character that make a powerful statement of style and refinement.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Benzoate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Cinnamal"
  },
  {
    id: 84,
    name: "Tom ford noir extreme eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 340000,
    originalPrice: null,
    image: "/images/tom-ford-noir-extreme-edp-display.jpeg",
    images: [
      "/images/tom-ford-noir-extreme-edp-display.jpeg"
    ],
    description: "Tom ford noir extreme eau de parfum 100ml is an extraordinary fragrance that exemplifies the designer bold vision and commitment to luxury. Created with the finest ingredients and uncompromising attention to detail, it offers a sophisticated olfactory experience that is both distinctive and memorable. The complex composition unfolds beautifully on the skin, revealing layers of depth and character that make a powerful statement of style and refinement.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    collection: "signature",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Benzoate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Cinnamal"
  },
  {
    id: 85,
    name: "Tom ford ombre leather parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 340000,
    originalPrice: null,
    image: "/images/tom-ford-ombre-leather-parfum-display.jpeg",
    images: [
      "/images/tom-ford-ombre-leather-parfum-display.jpeg"
    ],
    description: "Tom ford ombre leather parfum 100ml is an extraordinary fragrance that exemplifies the designer bold vision and commitment to luxury. Created with the finest ingredients and uncompromising attention to detail, it offers a sophisticated olfactory experience that is both distinctive and memorable. The complex composition unfolds beautifully on the skin, revealing layers of depth and character that make a powerful statement of style and refinement.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Benzoate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Cinnamal"
  },
  {
    id: 86,
    name: "Valentino uomo  born in roma coral fantasy eau de toilette 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 200000,
    originalPrice: null,
    image: "/images/Valentino-uomo-born-in-roma-coral-fantasy-eau-de-toilette-100ml-display.jpeg",
    images: [
      "/images/Valentino-uomo-born-in-roma-coral-fantasy-eau-de-toilette-100ml-display.jpeg",
      "/images/Valentino-uomo-born-in-roma-coral-fantasy-eau-de-toilette-100ml-pack..jpeg"
    ],
    description: "Valentino uomo  born in roma coral fantasy eau de toilette 100ml is an exquisite fragrance that represents the pinnacle of perfumery artistry. Crafted with the finest ingredients and exceptional attention to detail, it offers a sophisticated olfactory journey that evolves beautifully on the skin. The harmonious blend of notes creates a distinctive signature that makes a lasting impression, perfect for those who appreciate refined luxury and quality craftsmanship.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate"
  },
  {
    id: 87,
    name: "Versace eros Najim pour homme parfum 100ml",
    category: "",
    type: "Parfum",
    price: 241999,
    originalPrice: null,
    image: "/images/Versace -eros-Najim-pour-homme-parfum-display.jpg",
    images: [
      "/images/Versace -eros-Najim-pour-homme-parfum-display.jpg",
      "/images/Versace -eros-Najim-pour-homme-parfum-pack.jpeg",
      "/images/Versace -eros-Najim-pour-homme-parfum.webp"
    ],
    description: "Versace eros Najim pour homme parfum 100ml is a magnificent fragrance that embodies the glamour and opulence of the iconic Italian fashion house. Created with exceptional ingredients and masterful craftsmanship, it offers a luxurious olfactory experience that is both bold and sophisticated. The distinctive composition unfolds beautifully on the skin, revealing complex layers that capture the essence of Mediterranean luxury and contemporary style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Alpha-Isomethyl Ionone"
  },
  {
    id: 88,
    name: "Versace eros pour femme eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 215000,
    originalPrice: null,
    image: "/images/versace-eros-pour-femme-edp-display.jpeg",
    images: [
      "/images/versace-eros-pour-femme-edp-display.jpeg",
      "/images/versace-eros-pour-femme-edp-pack.jpg"
    ],
    description: "Versace eros pour femme eau de parfum 100ml is a magnificent fragrance that embodies the glamour and opulence of the iconic Italian fashion house. Created with exceptional ingredients and masterful craftsmanship, it offers a luxurious olfactory experience that is both bold and sophisticated. The distinctive composition unfolds beautifully on the skin, revealing complex layers that capture the essence of Mediterranean luxury and contemporary style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Alpha-Isomethyl Ionone"
  },
  {
    id: 89,
    name: "Versace pour homme  oud noir eau de parfum 100ml",
    category: "",
    type: "Parfum",
    price: 232000,
    originalPrice: null,
    image: "/images/Versace-pour-homme-oud-noir-display.jpeg",
    images: [
      "/images/Versace-pour-homme-oud-noir-display.jpeg",
      "/images/Versace-pour-homme-oud-noir-pack.jpeg",
      "/images/Versace-pour-homme-oud-noir.jpg"
    ],
    description: "Versace pour homme  oud noir eau de parfum 100ml is a magnificent fragrance that embodies the glamour and opulence of the iconic Italian fashion house. Created with exceptional ingredients and masterful craftsmanship, it offers a luxurious olfactory experience that is both bold and sophisticated. The distinctive composition unfolds beautifully on the skin, revealing complex layers that capture the essence of Mediterranean luxury and contemporary style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Benzyl Salicylate, Alpha-Isomethyl Ionone"
  },
  {
    id: 90,
    name: "yves saint Laurent kouros eau de toilette 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 180000,
    originalPrice: null,
    image: "/images/yves-saint-laurent-kouros-edt-display.jpeg",
    images: [
      "/images/yves-saint-laurent-kouros-edt-display.jpeg",
      "/images/yves-saint-laurent-kouros-edt.jpg"
    ],
    description: "yves saint Laurent kouros eau de toilette 100ml is a captivating fragrance that embodies the brand legacy of Parisian elegance and bold creativity. Created with exceptional ingredients and innovative techniques, it offers a sophisticated olfactory journey that is both distinctive and refined. The masterful composition unfolds beautifully on the skin, revealing complex layers that reflect the house commitment to luxury and avant-garde style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 91,
    name: "yves saint Laurent libre le parfum 90ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 220000,
    originalPrice: null,
    image: "/images/yves-saint-laurent-libre-le-parfum-display.png",
    images: [
      "/images/yves-saint-laurent-libre-le-parfum-display.png",
      "/images/yves-saint-laurent-libre-le-parfum-pack.jpg",
      "/images/yves-saint-laurent-libre-le-parfum.jpg"
    ],
    description: "yves saint Laurent libre le parfum 90ml is a captivating fragrance that embodies the brand legacy of Parisian elegance and bold creativity. Created with exceptional ingredients and innovative techniques, it offers a sophisticated olfactory journey that is both distinctive and refined. The masterful composition unfolds beautifully on the skin, revealing complex layers that reflect the house commitment to luxury and avant-garde style.",
    details: {
      topNotes: [],
      heartNotes: [],
      baseNotes: []
    },
    size: "90ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    collection: "signature",
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 92,
    name: "yves saint Laurent MyvesF Eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 247000,
    originalPrice: null,
    image: "/images/myself-display.jpeg",
    images: [
      "/images/myself-display.jpeg",
      "/images/myself.jpeg",
      "/images/myself-pack.jpeg"
    ],
    description: "yves saint Laurent MyvesF Eau de parfum 100ml is a captivating fragrance that embodies the brand legacy of Parisian elegance and bold creativity. Created with exceptional ingredients and innovative techniques, it offers a sophisticated olfactory journey that is both distinctive and refined. The masterful composition unfolds beautifully on the skin, revealing complex layers that reflect the house commitment to luxury and avant-garde style.",
    details: {
      topNotes: [ "Bergamot, Mandarin Orange"],
      heartNotes: [ "Lavender, Geranium"],
      baseNotes: [ "Cedarwood, Amber"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 93,
    name: "yves saint Laurent Y le parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 203000,
    originalPrice: null,
    image: "/images/yves-saint-laurent-y-le-parfum-display.jpg",
    images: [
      "/images/yves-saint-laurent-y-le-parfum-display.jpg",
      "/images/yves-saint-laurent-y-le-parfum.jpg"
    ],
    description: "yves saint Laurent Y le parfum 100ml is a captivating fragrance that embodies the brand legacy of Parisian elegance and bold creativity. Created with exceptional ingredients and innovative techniques, it offers a sophisticated olfactory journey that is both distinctive and refined. The masterful composition unfolds beautifully on the skin, revealing complex layers that reflect the house commitment to luxury and avant-garde style.",
    details: {
      topNotes: [ "Bergamot, Mandarin Orange"],
      heartNotes: [ "Lavender, Geranium"],
      baseNotes: [ "Cedarwood, Amber"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Farnesol, Alpha-Isomethyl Ionone"
  },
  {
    id: 94,
    name: " Afnan 9pm Elixir",
    category: "Unisex Collection",
    type: "Parfum",
    price: 75000,
    originalPrice: null,
    image: "/images/Afnan-9pm-elixir-display.jpeg",
    images: [
      "/images/Afnan-9pm-elixir-display.jpeg",
      "/images/afnan-9pm-elixir.jpg",
      "/images/afan-9pm-elixir-pack.jpeg"
    ],
    description: "Afnan 9pm Elixir, A bold & magnetic unisex extrait de parfum that awakens the night. It opens with sparkling spices—cardamom, nutmeg and elemi—leading into a smoky, leathery heart of pimento and lavender. The dry-down settles into warm vanilla, patchouli, labdanum and rock rose, creating a rich, sensual trail that’s perfect for evenings and special occasions",
    details: {
      topNotes: ["Cardamom, Nutmeg, Elemi"],
      heartNotes: ["Pimento, Lavender"],
      baseNotes: ["Vanilla, Patchouli, Labdanum, Rock Rose"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Cardamom, Nutmeg, Elemi, Pimento, Lavender, Vanilla, Patchouli, Labdanum, Rock Rose"
  },
  {
    id: 95,
    name: "Armaf Club de nuit oud parfum",
    category: "Unisex Collection",
    type: "Parfum",
    price: 130000,
    originalPrice: null,
    image: "/images/Armaf-Club-de-Nuit-Oud-display.jpeg",
    images: [
      "/images/Armaf-Club-de-Nuit-Oud-display.jpeg",
      "/images/armaf-club-de-nuit-oud-parfum-pack.jpeg",
      "/images/armaf-club-de-nuit-oud-parfum.jpeg"
    ],
    description: "Armaf Club de nuit oud parfum is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    details: {
      topNotes: ["Saffron, Bergamot"],
      heartNotes: ["Oud, Rose"],
      baseNotes: ["Amber, Patchouli"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Saffron, Bergamot, Oud, Rose, Amber, Patchouli"
  },
  {
    id: 96,
    name: "Emrick essential oil",
    category: "Essential oil",
    type: "oil",
    price: 15000,
    originalPrice: null,
    image: "/images/4.png",
    images: [
      "/images/4.png",
      "/images/3.png",
    ],
    description: "Emrick essential oil is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
  },
  {
    id: 97,
    name: "Emrick essential oil",
    category: "Essential oil",
    type: "oil",
    price: 30000,
    originalPrice: null,
    image: "/images/1.png",
    images: [
      "/images/1.png",
      "/images/2.png",
    ],
    description: "Emrick essential oil is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    size: "50ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
  },
  {
    id: 98,
    name: "Louis Vuitton L'immensité eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 1050000,
    originalPrice: null,
    image: "/images/Louis-vuitton-L'immensité-display.jpeg",
    images: [
      "/images/Louis-vuitton-L'immensité-display.jpeg",
      "/images/Louis-vuitton-L'immensité-pack.jpeg"
    ],
    description: "Louis Vuitton L'immensité eau de parfum 100ml is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    details: {
      topNotes: ["Saffron, Bergamot"],
      heartNotes: ["Oud, Rose"],
      baseNotes: ["Amber, Patchouli"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Saffron, Bergamot, Oud, Rose, Amber, Patchouli"
  },
  {
    id: 99,
    name: "Louis vuitton lovers eau de parfum 100ml",
    category: "Unisex Collection",
    type: "Parfum",
    price: 1050000,
    originalPrice: null,
    image: "/images/louis-vuitton-lovers-display.jpeg",
    images: [
      "/images/louis-vuitton-lovers-display.jpeg",
      "/images/louyis-vuitton-lovers-pack.jpeg",
      "/images/louis-vuitton-lovers-.jpeg"
    ],
    description: "Louis vuitton lovers eau de parfum 100ml is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    details: {
      topNotes: ["lotus, Mandarin Orange"],
      heartNotes: ["Jasmine, Oud"],
      baseNotes: ["Amber, Patchouli"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Lotus, Mandarin Orange, Jasmine, Oud, Amber, Patchouli"
  },
  {
    id: 100,
    name: "paco rabanne edt 1 million 100ml",
    category: "Unisex Collection",
    type: "EDT",
    price: 137000,
    originalPrice: null,
    image: "/images/paco-edt-display.jpeg",
    images: [
      "/images/paco-edt-display.jpeg",
      "/images/paco-rabane-pack.jpeg"
    ],
    description: "paco rabanne edt 1 million 100ml is a bold and captivating fragrance that embodies the essence of luxury and sophistication. This unisex parfum opens with a rich blend of spices and floral notes, leading to a heart of oud and amber. The base notes are warm and inviting, creating a sensual trail that lingers on the skin.",
    details: {
      topNotes: ["lotus, Mandarin Orange"],
      heartNotes: ["Jasmine, Oud"],
      baseNotes: ["Amber, Patchouli"]
    },
    size: "100ml",
    isNew: false,
    discount: null,
    inStock: true,
    featured: false,
    ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water), Limonene, Linalool, Coumarin, Benzyl Salicylate, Citronellol, Geraniol, Eugenol, Citral, Benzyl Benzoate, Benzyl Alcohol, Lotus, Mandarin Orange, Jasmine, Oud, Amber, Patchouli"
  },
  {
  id: 101,
  name: "Lancome La Nuit Tresor 100ml",
  category: "",
  type: "EDP",
  price: 258000,
  originalPrice: 260000,
  image: "/images/Lancome la Nuit tresor-display.jpeg",
  images: ["/images/Lancome la Nuit tresor-display.jpeg", "/images/Lancome la Nuit tresor-pack.jpeg", "/images/Lancome la Nuit tresor.jpeg"],
  description: "Lancome La Nuit Tresor 100ml is a luxurious, sensual fragrance for women, blending sweet, floral, and gourmand notes to create a captivating scent that embodies romance and sophistication.",
  details: {
    topNotes: ["Pear", "Tangerine", "Bergamot"],
    heartNotes: ["Strawberry", "Vanilla Orchid", "Black Rose"],
    baseNotes: ["Praline", "Caramel", "Coffee", "Licorice", "Patchouli", "Incense", "Papyrus", "Coumarin"]
  },
  size: "100ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Pear, Tangerine, Bergamot, Strawberry, Vanilla Orchid, Black Rose, Praline, Caramel, Coffee, Licorice, Patchouli, Incense, Papyrus, Coumarin"
},
{
  id: 102,
  name: "Armani My Way Intense EDP",
  category: "",
  type: "EDP",
  price: 225000,
  originalPrice: null,
  image: "/images/Armani my way intense Edp-display.jpeg",
  images: ["/images/Armani my way intense Edp-display.jpeg", "/images/Armani my way intense Edp-2.jpeg", "/images/Armani my way intense Edp-pack.jpeg"],
  description: "Armani My Way Intense is a modern floral fragrance that emphasizes white flowers and warm woods, designed for the woman who seeks meaningful experiences and lasting impressions.",
  details: {
    topNotes: ["Orange Blossom", "Bitter Orange"],
    heartNotes: ["Indian Tuberose", "Jasmine"],
    baseNotes: ["Vanilla", "Sandalwood"]
  },
  size: "100ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Orange Blossom, Bitter Orange, Indian Tuberose, Jasmine, Vanilla, Sandalwood"
},
{
  id: 103,
  name: "Jean Paul Gaultier La Belle Le Parfum Intense EDP 100ml",
  category: "",
  type: "EDP",
  price: 219500,
  originalPrice: 221000,
  image: "/images/Jean Paul Gaultier la belle le parfum intense-display.jpeg",
  images: ["/images/Jean Paul Gaultier la belle le parfum intense-display.jpeg", "/images/Jean Paul Gaultier la belle le parfum intense-pack.jpeg", "/images/Jean Paul Gaultier la belle le parfum intense.jpeg"],
  description: "Jean Paul Gaultier La Belle Le Parfum Intense is an alluring, gourmand fragrance that blends warm vanilla, sweet pear, and sensual tonka bean, creating an irresistibly seductive scent.",
  details: {
    topNotes: ["Pear"],
    heartNotes: ["Tonka Bean"],
    baseNotes: ["Vanilla"]
  },
  size: "100ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Pear, Tonka Bean, Vanilla"
},
{
  id: 104,
  name: "Givenchy Gentleman EDP Boisée",
  category: "",
  type: "EDP",
  price: 215000,
  originalPrice: null,
  image: "/images/Givenchy gentleman Edp Boisée-display.jpeg",
  images: ["/images/Givenchy gentleman Edp Boisée-display.jpeg", "/images/Givenchy gentleman Edp Boisée-pack.jpeg"],
  description: "Givenchy Gentleman EDP Boisée is a woody, spicy fragrance for men, balancing black pepper, cocoa, and iris with warm, earthy tones for a refined yet powerful scent.",
  details: {
    topNotes: ["Black Pepper", "Geranium", "Coriander"],
    heartNotes: ["Cocoa", "Iris", "Cedar"],
    baseNotes: ["Sandalwood", "Patchouli", "Woody Notes"]
  },
  size: "100ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Black Pepper, Geranium, Coriander, Cocoa, Iris, Cedar, Sandalwood, Patchouli, Woody Notes"
},
{
  id: 105,
  name: "Armaf Club de Nuit Milestone EDP 105ml",
  category: "Unisex Collection",
  type: "EDP",
  price: 78000,
  originalPrice: null,
  image: "/images/Armaf club de Nuit milestone Edp 105ml-display.jpeg",
  images: ["/images/Armaf club de Nuit milestone Edp 105ml-display.jpeg", "/images/Armaf club de Nuit milestone Edp 105ml-pack.jpeg"],
  description: "Armaf Club de Nuit Milestone is a luxurious unisex fragrance with a fresh marine opening, a heart of florals, and a refined, musky-woody dry down reminiscent of ocean breezes.",
  details: {
    topNotes: ["Sea Notes", "Red Fruits", "Bergamot"],
    heartNotes: ["Violet", "Sandalwood", "White Woods"],
    baseNotes: ["Ambroxan", "Musk", "Vetiver"]
  },
  size: "105ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Sea Notes, Red Fruits, Bergamot, Violet, Sandalwood, White Woods, Ambroxan, Musk, Vetiver"
},
{
  id: 106,
  name: "Armaf Hunter Intense Men EDT",
  category: "",
  type: "EDT",
  price: 40000,
  originalPrice: null,
  image: "/images/Armaf hunter intense men-display.jpeg",
  images: ["/images/Armaf hunter intense men-display.jpeg", "/images/Armaf hunter intense men-pack.jpeg", "/images/Armaf Hunter Intense.jpeg"],
  description: "Armaf Hunter Intense is a bold, masculine fragrance with refreshing citrus top notes, a heart of spices and florals, and a strong woody-amber base for lasting impact.",
  details: {
    topNotes: ["Citrus", "Cardamom", "Cedar", "Rosemary"],
    heartNotes: ["Ylang-Ylang", "Tuberose", "Orris"],
    baseNotes: ["Cedarwood", "Vetiver", "Amber", "Labdanum"]
  },
  size: "100ml", 
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Citrus, Cardamom, Cedar, Rosemary, Ylang-Ylang, Tuberose, Orris, Cedarwood, Vetiver, Amber, Labdanum"
},
{
  id: 107,
  name: "Armani Acqua Di Gio Pour Homme Parfum",
  category: "",
  type: "Parfum",
  price: 215000,
  originalPrice: null,
  image: "/images/Armani Acqua Di gio pour homme parfum-display.jpeg",
  images: ["/images/Armani Acqua Di gio pour homme parfum-display.jpeg", "/images/Armani Beauty Acqua di Giò Profondo Perfume for Men _ Luxury Fresh & Intense Fragrance.jpeg", "/images/Armani Acqua Di gio pour homme parfum-3.jpeg"],
  description: "Armani Acqua Di Gio Pour Homme Parfum is a sophisticated aquatic fragrance for men, blending fresh marine accords with aromatic herbs and woody base notes for a timeless, elegant scent.",
  details: {
    topNotes: ["Marine Notes", "Bergamot"],
    heartNotes: ["Rosemary", "Clary Sage", "Geranium"],
    baseNotes: ["Patchouli", "Olibanum"]
  },
  size: "100ml",
  isNew: false,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Fragrance, Water, Marine Notes, Bergamot, Rosemary, Clary Sage, Geranium, Patchouli, Olibanum"
},
{
  id: 108,
  name: "Gucci guilty parfum pour homme 90ml",
  category: "",
  type: "Parfum",
  price: 222500,
  originalPrice: null,
  image: "/public/images/october/Gucci guilty pour homme 🔝.jpeg",
  images: ["/public/images/october/gucci-guilty.jpeg", "/public/images/october/Gucci guilty pour homme 🔝.jpeg", "/public/images/october/Gucci Men's Accessories.jpeg"],
  description: "Gucci Guilty Parfum Pour Homme reimagines the original with a richer, wood-aromatic amber signature. Bright juniper and citrus open into orange blossom and a hint of nutmeg, settling into patchouli and dry woods for a confident, modern warmth.",
  details: {
    topNotes: ["Juniper", "Lemon", "Lavender"],
    heartNotes: ["Orange Blossom", "Nutmeg"],
    baseNotes: ["Patchouli", "Dry Woods"]
  },
  size: "90ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 109,
  name: "Franck Olivier tribal 100ml",
  category: "",
  type: "Parfum",
  price: 85000,
  originalPrice: null,
  image: "/public/images/october/frank-oliver-tribal.avif",
  images: ["/public/images/october/frank-oliver-tribal.avif", "/public/images/october/frank-oliver-ribal-pack.jpg", "/public/images/october/frank-oliver-tribal.main.jpg"],
  description: "Tribal by Franck Olivier is a warm, inviting amber-woody scent. Sparkling citrus lifts a floral heart with hints of patchouli and violet, drying down to soft sandalwood, musk, amber and vanilla.",
  details: {
    topNotes: ["Bergamot", "Mandarin"],
    heartNotes: ["Jasmine", "Rose", "Violet", "Patchouli"],
    baseNotes: ["Sandalwood", "Musk", "Amber", "Vanilla"]
  },
  size: "100ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 110,
  name: "Frank Olivier parisan oud 100ml",
  category: "",
  type: "Parfum",
  price: 68000,
  originalPrice: null,
  image: "/public/images/october/frank-oliver-parisan-oud.png",
  images: ["/public/images/october/frank-oliver-parisan-oud.png", "/public/images/october/frank-oliver-parisan-oud-pack.png", "/public/images/october/frank-oliver-parisan-oud-main.jpg"],
  description: "Parisian Oud by Franck Olivier blends juicy fruits and florals over an elegant oud-amber base. Bright raspberry and citrus lead to rose, jasmine and violet, wrapped in creamy vanilla, musk and oud.",
  details: {
    topNotes: ["Raspberry", "Lemon", "Orange"],
    heartNotes: ["Rose", "Jasmine", "Violet", "Patchouli"],
    baseNotes: ["Oud", "Amber", "Vanilla", "Musk"]
  },
  size: "100ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 111,
  name: "Issey miyake Nuit D'issey parfum 125ml",
  category: "",
  type: "Parfum",
  price: 118800,
  originalPrice: null,
  image: "/public/images/october/Issey Miyake Nuit d'Issey Eau de Toilette Nat_ Spray  75 ml.jpeg",
  images: ["/public/images/october/Issey Miyake Nuit d'Issey Eau de Toilette Nat_ Spray  75 ml.jpeg", "/public/images/october/Issey Miyake, Parfum, Nuit d'Issey (Eau de Parfum, 125 ml).jpeg"],
  description: "Nuit d’Issey Parfum deepens the nocturnal, woody-spicy signature with darker, smoother intensity. Sparkling citrus spices lead into leathery woods and incense over a sensual ambered base.",
  details: {
    topNotes: ["Grapefruit", "Bergamot", "Black Pepper"],
    heartNotes: ["Leather", "Woods", "Incense"],
    baseNotes: ["Patchouli", "Tonka Bean", "Amber"]
  },
  size: "125ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 112,
  name: "Issey miyake leau D'issey pour homme noir ambre edp 100ml",
  category: "",
  type: "Parfum",
  price: 225000,
  originalPrice: null,
  image: "/public/images/october/issey-miyake-pour-homme-noir.jpeg",
  images: ["/public/images/october/issey-miyake-pour-homme-noir.jpeg", "/public/images/october/issey-miyake-pour-homme-noir-pack.jpeg"],
  description: "L’Eau d’Issey Pour Homme Noir Ambre is an oriental-amber take on the classic: a luxurious blend of warm spices over leather and amber, softened by woods and vanilla.",
  details: {
    topNotes: ["Saffron", "Cinnamon", "Nutmeg", "Coriander"],
    heartNotes: ["Leather", "Amber", "Papyrus"],
    baseNotes: ["Sandalwood", "Cedarwood", "Patchouli", "Vanilla"]
  },
  size: "125ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 113,
  name: "L'eau D'issey pour homme intense edt 125ml",
  category: "",
  type: "Parfum",
  price: 169999,
  originalPrice: null,
  image: "/public/images/october/Intense - Issey Miyake.jpeg",
  images: ["/public/images/october/L'eau De Issey Intense Eau De Toilette Spray 4_2 Oz.jpeg", "/public/images/october/Intense - Issey Miyake.jpeg"],
  description: "L’Eau d’Issey Pour Homme Intense amplifies the fresh-spicy DNA with vivid citrus and spices over a resinous, incense-amber base.",
  details: {
    topNotes: ["Yuzu", "Bergamot", "Sweet Orange"],
    heartNotes: ["Cinnamon", "Nutmeg", "Cardamom", "Lotus"],
    baseNotes: ["Incense", "Amber", "Benzoin", "Sandalwood"]
  },
  size: "125ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 114,
  name: "Christian Dior oud ispahan 100ml",
  category: "",
  type: "Parfum",
  price: 682500,
  originalPrice: null,
  image: "/public/images/october/christian-dior-display.jpeg",
  images: ["/public/images/october/christian-dior-display.jpeg", "/public/images/october/christian-dior.jpeg.jpeg", "/public/images/october/christian-diorrrr.jpeg", "/public/images/october/Christian Dior Unisex Fragrance £40_00.jpeg"],
  description: "Oud Ispahan from Dior’s La Collection Privée is a sumptuous rose-oud composition where smoky labdanum and incense meet velvety rose and woods for a deep, opulent trail.",
  details: {
    topNotes: ["Labdanum"],
    heartNotes: ["Damask Rose", "Patchouli"],
    baseNotes: ["Oud", "Sandalwood", "Cedar", "Incense"]
  },
  size: "125ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
},
{
  id: 115,
  name: "Frank Olivier oud vanille 100ml",
  category: "",
  type: "Parfum",
  price: 45000,
  originalPrice: null,
  image: "/public/images/october/Oud Vanille _0599775441_#maykayfragrance #perfumecombo #perfumegh #perfumegram #maykay #maykayenterprise.jpeg",
  images: ["/public/images/october/Oud Vanille _0599775441_#maykayfragrance #perfumecombo #perfumegh #perfumegram #maykay #maykayenterprise.jpeg", "/public/images/october/Franck Olivier Oud Vanille Eau De Parfum 100 Ml For Men Free Delivery.jpeg"],
  description: "Oud Vanille by Franck Olivier is a cozy, gourmand-leaning oud. Juicy fruits and florals melt into a creamy vanilla-amber-musk base touched with warm spices and soft incense.",
  details: {
    topNotes: ["Caramel", "Raspberry", "Orange"],
    heartNotes: ["Rose", "Jasmine", "Violet", "Patchouli"],
    baseNotes: ["Vanilla", "Musk", "Amber", "Spices", "Incense"]
  },
  size: "100ml",
  isNew: true,
  discount: null,
  inStock: true,
  featured: false,
  ingredients: "Alcohol Denat., Parfum (Fragrance), Aqua (Water)."
}


];

export default products;