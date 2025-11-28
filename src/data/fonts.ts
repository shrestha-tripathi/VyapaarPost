import type { FontOption, ColorOption } from '../types';

/**
 * Font options for different Indian languages
 * Google Fonts are loaded in index.html
 */
export const fontOptions: FontOption[] = [
  {
    id: 'english',
    name: 'English',
    displayName: 'English',
    fontFamily: "'Poppins', sans-serif",
    sample: 'Abc',
  },
  {
    id: 'hindi',
    name: 'Hindi',
    displayName: 'हिंदी',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    sample: 'अआइ',
  },
  {
    id: 'marathi',
    name: 'Marathi',
    displayName: 'मराठी',
    fontFamily: "'Noto Sans Devanagari', sans-serif",
    sample: 'अआइ',
  },
  {
    id: 'tamil',
    name: 'Tamil',
    displayName: 'தமிழ்',
    fontFamily: "'Noto Sans Tamil', sans-serif",
    sample: 'அஆஇ',
  },
];

/**
 * Color palette for text customization
 * Vibrant colors suitable for Indian market
 */
export const colorOptions: ColorOption[] = [
  { id: 'white', name: 'White', value: '#FFFFFF' },
  { id: 'black', name: 'Black', value: '#000000' },
  { id: 'orange', name: 'Orange', value: '#f97316' },
  { id: 'red', name: 'Red', value: '#ef4444' },
  { id: 'blue', name: 'Blue', value: '#3b82f6' },
  { id: 'green', name: 'Green', value: '#22c55e' },
  { id: 'yellow', name: 'Yellow', value: '#eab308' },
  { id: 'purple', name: 'Purple', value: '#a855f7' },
  { id: 'pink', name: 'Pink', value: '#ec4899' },
  { id: 'gold', name: 'Gold', value: '#d4af37' },
];

/**
 * Get font family CSS string by font ID
 */
export function getFontFamily(fontId: string): string {
  const font = fontOptions.find((f) => f.id === fontId);
  return font?.fontFamily || "'Poppins', sans-serif";
}
