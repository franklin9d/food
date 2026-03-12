// AI-generated food images using Banana model
// Each key maps food keywords (Arabic) to image URLs

export const FOOD_IMAGES: Record<string, string> = {
  // Iraqi foods
  'كباب':     'https://www.genspark.ai/api/files/s/OtzDmt2d?cache_control=3600',
  'مسقوف':    'https://www.genspark.ai/api/files/s/xeV65Gxs?cache_control=3600',
  'دولمة':    'https://www.genspark.ai/api/files/s/zxk8Tz7L?cache_control=3600',
  'تشريب':    'https://www.genspark.ai/api/files/s/Vw3lOKtl?cache_control=3600',
  'باچة':     'https://www.genspark.ai/api/files/s/G4kDtQUs?cache_control=3600',
  'قيمة':     'https://www.genspark.ai/api/files/s/1PREdQVx?cache_control=3600',
  'خبز':      'https://www.genspark.ai/api/files/s/ZqjJJvpZ?cache_control=3600',
  'تنور':     'https://www.genspark.ai/api/files/s/ZqjJJvpZ?cache_control=3600',
  // Fast food
  'كنتاكي':   'https://www.genspark.ai/api/files/s/fgEqFfnv?cache_control=3600',
  'دجاج':     'https://www.genspark.ai/api/files/s/fgEqFfnv?cache_control=3600',
  'شاورما':   'https://www.genspark.ai/api/files/s/cx73CfEU?cache_control=3600',
  'بيتزا':    'https://www.genspark.ai/api/files/s/nxuqUmce?cache_control=3600',
  'صاج':      'https://www.genspark.ai/api/files/s/rlTZsIdc?cache_control=3600',
  'برغر':     'https://www.genspark.ai/api/files/s/KiYqxB1P?cache_control=3600',
  'كص':       'https://www.genspark.ai/api/files/s/OtzDmt2d?cache_control=3600',
  'لحم':      'https://www.genspark.ai/api/files/s/OtzDmt2d?cache_control=3600',
  'سمك':      'https://www.genspark.ai/api/files/s/xeV65Gxs?cache_control=3600',
  'وجبات':    'https://www.genspark.ai/api/files/s/fgEqFfnv?cache_control=3600',
  'مطبوخ':    'https://www.genspark.ai/api/files/s/Vw3lOKtl?cache_control=3600',
  'رز':       'https://www.genspark.ai/api/files/s/1PREdQVx?cache_control=3600',
  'حلويات':   'https://www.genspark.ai/api/files/s/zxk8Tz7L?cache_control=3600',
};

export const FOOD_EMOJIS: Record<string, string> = {
  'كباب': '🍢', 'مسقوف': '🐟', 'دولمة': '🫙', 'تشريب': '🍲',
  'باچة': '🍲', 'قيمة': '🥘', 'خبز': '🫓', 'تنور': '🫓',
  'كنتاكي': '🍗', 'دجاج': '🍗', 'شاورما': '🌮', 'بيتزا': '🍕',
  'صاج': '🥙', 'برغر': '🍔', 'كص': '🍖', 'لحم': '🥩',
  'سمك': '🐟', 'وجبات': '🍱', 'مطبوخ': '🍲', 'رز': '🍚',
  'حلويات': '🍮',
};

export function getFoodImage(foodType: string): string {
  if (!foodType) return '';
  const lower = foodType;
  for (const [key, url] of Object.entries(FOOD_IMAGES)) {
    if (lower.includes(key)) return url;
  }
  return '';
}

export function getFoodEmoji(foodType: string): string {
  if (!foodType) return '🍽️';
  const lower = foodType;
  for (const [key, emoji] of Object.entries(FOOD_EMOJIS)) {
    if (lower.includes(key)) return emoji;
  }
  return '🍽️';
}
