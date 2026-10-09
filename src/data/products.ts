import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'val-01',
    slug: 'atelier-cashmere-overcoat',
    name: 'Atelier Cashmere Overcoat',
    tagline: 'Double-faced Mongolian cashmere tailored in Biella',
    department: 'apparel',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 1250,
    originalPrice: 1480,
    rating: 4.9,
    reviewCount: 38,
    stock: 12,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    description: 'An architectural silhouette crafted from pure Mongolian double-faced cashmere. Unstructured shoulder drape with horn buttons, clean hidden placket, and deep patch pockets. Hand-finished in Biella, Italy.',
    story: 'Spun from grade-A cashmere fibers gathered during spring molting in the high plateaus of the Altai Mountains. Each piece requires 42 hours of dedicated artisanal finishing.',
    images: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Camel Melange', hex: '#C19A6B' },
      { name: 'Obsidian Black', hex: '#1C1917' },
      { name: 'Stone Grey', hex: '#78716C' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specifications: [
      { label: 'Composition', value: '100% Grade-A Mongolian Cashmere (520gsm)' },
      { label: 'Lining', value: '100% Cupro Bemberg across sleeves' },
      { label: 'Origin', value: 'Hand-tailored in Biella, Italy' },
      { label: 'Closure', value: 'Genuine Buffalo Horn buttons' },
      { label: 'Fit', value: 'Relaxed tailored drape, fits true to size' }
    ],
    origin: 'Biella, Italy',
    materials: 'Pure Grade-A Cashmere',
    care: 'Specialist dry clean only. Store on shaped cedar hanger with breathable garment bag.',
    reviews: [
      {
        id: 'rev-01',
        author: 'Julian Vane',
        date: '2 weeks ago',
        rating: 5,
        title: 'The pinnacle of winter tailoring',
        comment: 'The weight of the cashmere is substantial yet it drapes like a dream. The camel melange is nuanced and looks even richer in natural morning light.',
        verifiedPurchase: true
      },
      {
        id: 'rev-02',
        author: 'Eleanor Sterling',
        date: '1 month ago',
        rating: 5,
        title: 'Heirloom caliber craftsmanship',
        comment: 'Every seam is immaculately finished. Warm enough for chilly northern European evenings without requiring heavy layering.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-02',
    slug: 'palermo-chronograph-timepiece',
    name: 'Palermo Automatic Chronograph',
    tagline: 'Swiss automatic movement with sapphire exhibition caseback',
    department: 'leather',
    category: 'Horology',
    categorySlug: 'horology',
    price: 2450,
    originalPrice: 2800,
    rating: 5.0,
    reviewCount: 24,
    stock: 7,
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    description: 'A tribute to classical maritime horology. Powered by a bespoke 28,800 vph Swiss mechanical chronograph caliber with 56-hour power reserve. Encased in surgical 316L satin-brushed steel with Tuscan vegetable-tanned leather strap.',
    story: 'Engineered in Le Locle, Switzerland. The dial features subtle sunburst brushed Champagne champagne finish with flame-blued hands and hand-applied indexes.',
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Cognac Leather', hex: '#8B5A2B' },
      { name: 'Midnight Alligator', hex: '#1E293B' },
      { name: 'Brushed Steel Mesh', hex: '#94A3B8' }
    ],
    specifications: [
      { label: 'Movement', value: 'Swiss Caliber V-2824 Automatic Chronograph' },
      { label: 'Case Diameter', value: '39.5 mm / 11.2 mm thickness' },
      { label: 'Crystal', value: 'Dual-curved Anti-reflective Sapphire' },
      { label: 'Water Resistance', value: '10 ATM (100 meters / 330 ft)' },
      { label: 'Power Reserve', value: '56 hours' }
    ],
    origin: 'Le Locle, Switzerland',
    materials: '316L Stainless Steel & Tuscan Full-Grain Calfskin',
    care: 'Rinse with fresh water after salt exposure. Mechanical overhaul recommended every 5 years.',
    reviews: [
      {
        id: 'rev-03',
        author: 'Marcus Chen',
        date: '3 weeks ago',
        rating: 5,
        title: 'Exquisite balance and wrist presence',
        comment: 'At 39.5mm, the proportions are timeless. The exhibition back reveals stunning Côtes de Genève perlage finishing.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-03',
    slug: 'sonos-meridian-acoustic-headphones',
    name: 'Meridian Studio Headphones',
    tagline: 'Precision 45mm beryllium drivers with milled walnut cups',
    department: 'audio',
    category: 'Audio',
    categorySlug: 'audio',
    price: 790,
    originalPrice: 890,
    rating: 4.8,
    reviewCount: 52,
    stock: 18,
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    description: 'An audiophile closed-back masterpiece. Custom 45mm beryllium diaphragm acoustic transducers encased in solid resonant-dampened American walnut and lambskin memory cushions. Lossless Bluetooth 5.4 with LDAC and pure balanced analog inputs.',
    story: 'Tuned by veteran sound engineers in Copenhagen for uncolored frequency linearity and intimate spatial imaging that transports you straight inside the recording booth.',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Dark Walnut & Gunmetal', hex: '#3E2723' },
      { name: 'Silver Maple & Ivory', hex: '#D7CCC8' }
    ],
    specifications: [
      { label: 'Transducer', value: '45mm Pure Beryllium dynamic drivers' },
      { label: 'Frequency Response', value: '5 Hz – 42,000 Hz' },
      { label: 'Battery Life', value: '42 hours continuous with ANC active' },
      { label: 'Connectivity', value: 'Bluetooth 5.4 LDAC / aptX HD / 3.5mm / 4.4mm Balanced' },
      { label: 'Weight', value: '315 grams' }
    ],
    origin: 'Copenhagen, Denmark',
    materials: 'American Walnut, Milled Aluminum, Lambskin Leather',
    care: 'Wipe lambskin ear cups with dry microfiber cloth. Avoid high humidity storage.',
    reviews: [
      {
        id: 'rev-04',
        author: 'David Thorne',
        date: '1 week ago',
        rating: 5,
        title: 'Masterclass in acoustic separation',
        comment: 'Instruments breathe in three dimensions. The walnut earcups lend a natural resonance that plastic headphones simply cannot replicate.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-04',
    slug: 'marche-weekender-duffle-bag',
    name: 'Le Marché Weekender Duffle',
    tagline: 'Full-grain Tuscan vacchetta leather with solid brass hardware',
    department: 'leather',
    category: 'Leather Goods',
    categorySlug: 'leather-goods',
    price: 890,
    originalPrice: 990,
    rating: 4.9,
    reviewCount: 46,
    stock: 9,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    description: 'Designed for the discerning traveler. Built from 2.4mm thick vegetable-tanned Tuscan vacchetta leather that develops an extraordinary golden patina over decades of journeying. Includes dedicated shoe compartment and padded laptop sleeve.',
    story: 'Crafted in a historic workshop outside Florence using centuries-old natural tannin recipes derived from chestnut and mimosa barks.',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Rich Tobacco', hex: '#6F4E37' },
      { name: 'Onyx Black', hex: '#18181B' },
      { name: 'Raw Natural Vachetta', hex: '#D2B48C' }
    ],
    specifications: [
      { label: 'Dimensions', value: '52 cm x 30 cm x 26 cm (42 Liters)' },
      { label: 'Weight', value: '2.1 kg' },
      { label: 'Hardware', value: 'Solid sand-cast brass with antiqued finish' },
      { label: 'Cabin Luggage', value: 'Complies with IATA carry-on dimensions' }
    ],
    origin: 'Florence, Italy',
    materials: 'Vegetable-tanned full grain calfskin leather',
    care: 'Condition annually with organic beeswax leather balm. Keep away from prolonged standing water.',
    reviews: [
      {
        id: 'rev-05',
        author: 'Sophie Laurent',
        date: '1 month ago',
        rating: 5,
        title: 'Gets better with every single flight',
        comment: 'After six months of travel between Paris and London, the leather has developed a rich warm glow. The hardware feels indestructible.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-05',
    slug: 'kyoto-raw-silk-trench',
    name: 'Kyoto Raw Silk Trench Coat',
    tagline: 'Water-repellent unspun tussah silk with storm flap',
    department: 'apparel',
    category: 'Outerwear',
    categorySlug: 'outerwear',
    price: 1120,
    originalPrice: 1300,
    rating: 4.8,
    reviewCount: 19,
    stock: 8,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    description: 'A striking seasonal staple woven on heritage shuttle looms in Kyoto. The raw tussah silk retains natural slub textures, treated with an eco-certified fluorocarbon-free micro-wax layer for weather resistance.',
    story: 'Subtle raglan sleeves with articulated shoulder volume allow seamless pairing over tailored blazers or light knitwear.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oatmeal Chalk', hex: '#E6E2DD' },
      { name: 'Deep Sage', hex: '#556B2F' }
    ],
    sizes: ['S', 'M', 'L'],
    specifications: [
      { label: 'Fabric', value: '100% Wild Tussah Raw Silk (380gsm)' },
      { label: 'Buckles', value: 'Hand-carved horn D-rings and belt buckle' },
      { label: 'Water Repellency', value: 'Bio-wax micro-emulsion finish' },
      { label: 'Origin', value: 'Kyoto, Japan' }
    ],
    origin: 'Kyoto, Japan',
    materials: 'Raw Wild Silk',
    care: 'Professional organic dry cleaning. Steam gently from interior.',
    reviews: [
      {
        id: 'rev-06',
        author: 'Camilla Rossi',
        date: '2 months ago',
        rating: 5,
        title: 'Utterly singular texture',
        comment: 'You never see silk woven like this anymore. It has the structure of lightweight gabardine but breathes effortlessly.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-06',
    slug: 'sculpted-alabaster-fluted-vase',
    name: 'Komorebi Fluted Alabaster Vessel',
    tagline: 'Hand-turned natural Volterra alabaster with matte honed finish',
    department: 'living',
    category: 'Home & Living',
    categorySlug: 'home-living',
    price: 420,
    originalPrice: 480,
    rating: 4.9,
    reviewCount: 31,
    stock: 14,
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    description: 'Carved from solid blocks of translucent Volterra alabaster. The rhythmic vertical fluting catches sunlight and casts subtle radial shadows across minimalist surfaces. Each vessel displays unique geological mineral veining.',
    story: 'Shaped by master artisans in Tuscany who have preserved traditional stoneworking techniques since the Renaissance.',
    images: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Alabaster', hex: '#F5F2EB' },
      { name: 'Smoked Quartz', hex: '#8C827A' }
    ],
    specifications: [
      { label: 'Dimensions', value: 'Height 28 cm x Diameter 14 cm' },
      { label: 'Weight', value: '3.4 kg' },
      { label: 'Capacity', value: '1.8 Liters' },
      { label: 'Waterproof', value: 'Glazed internal silicate liner' }
    ],
    origin: 'Volterra, Italy',
    materials: 'Natural Italian Alabaster',
    care: 'Hand wash with mild neutral soap. Do not submerge in abrasive cleaning agents.',
    reviews: [
      {
        id: 'rev-07',
        author: 'Nathalie Dupont',
        date: '3 weeks ago',
        rating: 5,
        title: 'A work of sculpture on our dining table',
        comment: 'When early evening light filters through the alabaster, it glows from within like a gentle lantern.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-07',
    slug: 'luminescence-solid-brass-lamp',
    name: 'Aethel Cordless Brass Ambient Lamp',
    tagline: 'Precision spun solid brass with magnetic inductive charging',
    department: 'living',
    category: 'Home & Living',
    categorySlug: 'home-living',
    price: 360,
    originalPrice: 410,
    rating: 4.8,
    reviewCount: 64,
    stock: 22,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    description: 'A monolithic cordless light sculpted from solid unlacquered brass. Features 4-stage warm dimming (2200K – 2700K) with 24 hours of portable illumination on a single wireless dock charge. IP54 water-resistant for veranda evenings.',
    story: 'Spun from heavy brass ingots in Stockholm, designed to patinate naturally with touch and ambient exposure.',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Raw Brushed Brass', hex: '#D4AF37' },
      { name: 'Bronzed Patina', hex: '#5C4033' },
      { name: 'Brushed Nickel', hex: '#C0C0C0' }
    ],
    specifications: [
      { label: 'Light Output', value: '300 Lumens / 95 CRI True Color' },
      { label: 'Color Temp', value: '2200K to 2700K Warm Glow' },
      { label: 'Battery', value: '5200 mAh Li-ion (Up to 24 hrs)' },
      { label: 'Charging', value: 'Contactless magnetic wooden base included' }
    ],
    origin: 'Stockholm, Sweden',
    materials: 'Solid Spun Brass, Diffused Acrylic',
    care: 'Polish gently with dry cotton cloth or leave untouched for natural aged patina.',
    reviews: [
      {
        id: 'rev-08',
        author: 'Liam Scott',
        date: '2 weeks ago',
        rating: 5,
        title: 'The perfect dinner party illumination',
        comment: 'No messy cords across the dining table. The warm 2200K setting mimics candlelight beautifully.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-08',
    slug: 'botanical-santale-amber-candle',
    name: 'Santal & Wild Vetiver Botanical Candle',
    tagline: 'Organic cold-pressed soy wax with unbleached wooden wick',
    department: 'living',
    category: 'Fragrance',
    categorySlug: 'fragrance',
    price: 95,
    originalPrice: 110,
    rating: 4.9,
    reviewCount: 88,
    stock: 45,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    description: 'An evocative olfactory journey through ancient cedar groves and sun-drenched Mediterranean hillsides. Top notes of crushed bergamot peel; heart of Mysore sandalwood and cardamon; base of Haitian vetiver and dry amber.',
    story: 'Formulated in Grasse, France. Poured into reusable heavy-bottom mouth-blown smoke glass vessels.',
    images: [
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b8?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Smoked Amber Glass', hex: '#7E4B24' },
      { name: 'Matte Obsidian Glass', hex: '#262626' }
    ],
    specifications: [
      { label: 'Weight', value: '340g / 12 oz' },
      { label: 'Burn Time', value: 'Approx. 75 hours' },
      { label: 'Wax Base', value: '100% Non-GMO Botanical Coconut & Soy' },
      { label: 'Origin', value: 'Grasse, France' }
    ],
    origin: 'Grasse, France',
    materials: 'Botanical Coconut Soy Wax, Mouth-blown Glass',
    care: 'Trim wood wick to 5mm before every lighting. Allow melt pool to reach vessel edge.',
    reviews: [
      {
        id: 'rev-09',
        author: 'Aria Thorne',
        date: '5 days ago',
        rating: 5,
        title: 'Captivating fragrance throw',
        comment: 'Fills the room with a subtle, grounded warmth that never overpowers. The wooden wick crackles gently.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-09',
    slug: 'venetian-cardholder-leather',
    name: 'San Marco Bifold Card Wallet',
    tagline: 'Hand-burnished bridle leather with eight angled card slots',
    department: 'leather',
    category: 'Leather Goods',
    categorySlug: 'leather-goods',
    price: 195,
    originalPrice: 220,
    rating: 4.7,
    reviewCount: 42,
    stock: 28,
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    description: 'Slender, uncompromising pocket architecture. Hand-saddle-stitched using waxed French linen thread with beeswax burnished edges. Accommodates up to 10 cards and folded banknotes without pocket distortion.',
    story: 'Handcrafted in Venice, each cardholder undergoes three rounds of heat-iron crease edging and organic carnauba wax polishing.',
    images: [
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Espresso Bridle', hex: '#3B2F2F' },
      { name: 'British Racing Green', hex: '#1B4D3E' },
      { name: 'Burgundy Oxblood', hex: '#4A1525' }
    ],
    specifications: [
      { label: 'Dimensions', value: '10.5 cm x 7.5 cm x 0.6 cm' },
      { label: 'Capacity', value: '6-10 cards + folded currency' },
      { label: 'Stitching', value: 'Fil Au Chinois waxed linen thread' },
      { label: 'RFID Blocking', value: 'Protective inner shield layer' }
    ],
    origin: 'Venice, Italy',
    materials: 'Full-Grain English Bridle Leather',
    care: 'Gently buff scuffs with a horsehair brush. Use leather cream twice a year.',
    reviews: [
      {
        id: 'rev-10',
        author: 'Henrik Lindqvist',
        date: '3 weeks ago',
        rating: 5,
        title: 'Compact perfection',
        comment: 'Vanishes in a tailored trouser pocket. The angled card cutouts make retrieval effortless.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-10',
    slug: 'scandinavian-merino-knit-sweater',
    name: 'Nordic Extra-Fine Merino Rollneck',
    tagline: '19.5 micron regenerative ZQ-certified merino wool',
    department: 'apparel',
    category: 'Knitwear',
    categorySlug: 'knitwear',
    price: 340,
    originalPrice: 390,
    rating: 4.9,
    reviewCount: 57,
    stock: 20,
    isNew: false,
    isFeatured: false,
    isBestSeller: true,
    description: 'Knitted on seamless 3D wholegarment machines in Oslo for frictionless comfort and natural thermoregulation. The ribbed high rollneck holds structure without tightening.',
    story: 'Sourced from high-welfare mountain farms in New Zealand. Naturally odor-resistant, breathable, and soft enough to wear directly against bare skin.',
    images: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oatmeal Heather', hex: '#D8D2C2' },
      { name: 'Navy Midnight', hex: '#1C2833' },
      { name: 'Forest Moss', hex: '#4B5320' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    specifications: [
      { label: 'Yarn', value: '100% ZQ Merino Wool (19.5 Micron)' },
      { label: 'Knit Gauge', value: '12-Gauge Seamless WholeGarment' },
      { label: 'Origin', value: 'Oslo, Norway' },
      { label: 'Weight', value: '380g' }
    ],
    origin: 'Oslo, Norway',
    materials: 'Regenerative Merino Wool',
    care: 'Hand wash cold with wool detergent. Dry flat away from direct sunlight.',
    reviews: [
      {
        id: 'rev-11',
        author: 'Evelyn Gray',
        date: '1 month ago',
        rating: 5,
        title: 'Zero itchiness, pure luxury',
        comment: 'I usually find wool scratchy, but this feels like spun cloud. Fits seamlessly under jackets.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-11',
    slug: 'analog-walnut-turntable',
    name: 'Symphonia Precision Belt Turntable',
    tagline: 'High-inertia frosted acrylic platter with carbon tonearm',
    department: 'audio',
    category: 'Audio',
    categorySlug: 'audio',
    price: 1650,
    originalPrice: 1850,
    rating: 5.0,
    reviewCount: 16,
    stock: 5,
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    description: 'An audiophile turntable designed for transcendent musical warmth. Features an isolated synchronous AC motor, ultra-low friction sapphire gimbal carbon fiber tonearm, and Ortofon 2M Bronze pre-calibrated cartridge.',
    story: 'Engineered in Vienna with acoustic resonance damping feet tuned to isolate seismic micro-vibrations.',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Oiled American Walnut', hex: '#5D4037' },
      { name: 'Piano Black Lacquer', hex: '#111827' }
    ],
    specifications: [
      { label: 'Speeds', value: '33 1/3 and 45 RPM (Electronic switching)' },
      { label: 'Cartridge', value: 'Ortofon 2M Bronze Nude Fine Line Stylus' },
      { label: 'Tonearm', value: '9-inch One-Piece Carbon Fiber' },
      { label: 'Wow & Flutter', value: '< 0.08%' }
    ],
    origin: 'Vienna, Austria',
    materials: 'High-density MDF with Walnut Veneer, Frosted Acrylic Platter',
    care: 'Clean stylus with carbon fiber brush. Keep acrylic dust cover closed during non-use.',
    reviews: [
      {
        id: 'rev-12',
        author: 'Arthur Vance',
        date: '2 weeks ago',
        rating: 5,
        title: 'Rediscovering vinyl records anew',
        comment: 'The silence between tracks is pitch black. The microdynamics on acoustic jazz records leave you speechless.',
        verifiedPurchase: true
      }
    ]
  },
  {
    id: 'val-12',
    slug: 'fluted-amber-glass-carafe-set',
    name: 'Aurelia Hand-Blown Carafe & Tumbler',
    tagline: 'Borosilicate fluted amber glass with polished brass stopper',
    department: 'living',
    category: 'Home & Living',
    categorySlug: 'home-living',
    price: 175,
    originalPrice: 200,
    rating: 4.8,
    reviewCount: 39,
    stock: 25,
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    description: 'An elegant bedside and desk accompaniment. Mouth-blown by master glassmakers using heat-resistant borosilicate glass with tactile fluted ribs. Includes matching inverted tumbler cap and solid brass airtight ball stopper.',
    story: 'Created on the island of Murano, continuing centuries of Venetian glassmaking heritage with contemporary restraint.',
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1574634534894-89d7576c8259?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=85'
    ],
    colors: [
      { name: 'Warm Amber', hex: '#D97706' },
      { name: 'Smoked Charcoal', hex: '#4B5563' },
      { name: 'Crystal Clear', hex: '#E5E7EB' }
    ],
    specifications: [
      { label: 'Carafe Volume', value: '950 ml / 32 fl oz' },
      { label: 'Tumbler Volume', value: '250 ml / 8.5 fl oz' },
      { label: 'Material', value: 'High-clarity Thermal Borosilicate' },
      { label: 'Dishwasher Safe', value: 'Glass components dishwasher safe (Hand wash brass stopper)' }
    ],
    origin: 'Murano, Italy',
    materials: 'Mouth-blown Borosilicate Glass, Solid Brass',
    care: 'Dishwasher safe. Dry brass stopper promptly after washing.',
    reviews: [
      {
        id: 'rev-13',
        author: 'Clara Oswald',
        date: '1 month ago',
        rating: 5,
        title: 'Brings ceremony to hydration',
        comment: 'So pleasing to pour from every morning. Beautiful weight and delicate tactile ribs.',
        verifiedPurchase: true
      }
    ]
  }
];

export const CATEGORIES = [
  {
    name: 'Apparel & Tailoring',
    slug: 'apparel',
    department: 'apparel',
    itemCount: 4,
    description: 'Heirloom cashmere, raw silks, and meticulous European tailoring.',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Leather Goods & Horology',
    slug: 'leather',
    department: 'leather',
    itemCount: 3,
    description: 'Vegetable-tanned vacchetta luggage and Swiss automatic mechanical calibers.',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Acoustic & Technology',
    slug: 'audio',
    department: 'audio',
    itemCount: 2,
    description: 'Audiophile beryllium transducers, bespoke walnut, and precision analog players.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80'
  },
  {
    name: 'Living & Botanical Fragrance',
    slug: 'living',
    department: 'living',
    itemCount: 3,
    description: 'Alabaster stonework, spun brass ambient lighting, and Grasse botanical scents.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1000&q=80'
  }
];

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number; label: string }> = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', rate: 154.5, label: 'JPY (¥)' }
};
