export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'Orders & Global Delivery',
    question: 'What are your complimentary international shipping thresholds?',
    answer: 'We provide complimentary carbon-neutral DHL Express courier delivery worldwide on all orders above $250 (or local equivalent). For orders below this threshold, standard global express is charged at a flat rate of $25.'
  },
  {
    id: 'faq-02',
    category: 'Orders & Global Delivery',
    question: 'How long does delivery take to North America, Europe, and Asia?',
    answer: 'All items are dispatched from our European fulfillment ateliers within 24 hours. Delivery takes 1–2 business days to major European capitals, 2–3 business days to the United States and Canada, and 3–4 business days to Asia and Australasia.'
  },
  {
    id: 'faq-03',
    category: 'Returns & Guarantees',
    question: 'What is your return policy and process?',
    answer: 'We offer complimentary 30-day returns on all unworn garments and unused design objects in their original packaging. Simply initiate a return via your account or contact our concierge to receive a pre-paid DHL pickup label.'
  },
  {
    id: 'faq-04',
    category: 'Returns & Guarantees',
    question: 'What warranties accompany your horology and acoustic items?',
    answer: 'Every Valoir timepiece comes with an international 5-year mechanical movement warranty. Our acoustic headphones and turntable systems include a comprehensive 2-year warranty covering acoustic components and manufacturing craftsmanship.'
  },
  {
    id: 'faq-05',
    category: 'Materials & Provenance',
    question: 'How do you verify the authenticity and ethical sourcing of materials?',
    answer: 'We partner exclusively with multi-generational workshops across Italy, Switzerland, Japan, and Scandinavia. Our cashmere is ZQ and GOTS certified, leather is 100% vegetable-tanned without chrome salts, and woods are sourced from sustainably managed European and American reserves.'
  },
  {
    id: 'faq-06',
    category: 'Care & Restoration',
    question: 'Do you offer lifetime repair or restoration services?',
    answer: 'Yes. Valoir products are built as heirlooms. We maintain direct repair pathways with our original artisans for re-soling leather goods, mechanical movement overhauls, re-waxing outerwear, and audio driver servicing.'
  }
];
