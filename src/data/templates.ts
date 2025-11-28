import type { Template } from '../types';

/**
 * Sample templates for VyapaarPost
 * These templates demonstrate the structure for marketing posts
 * 
 * Note: In production, background images would be stored in /public/templates/
 * For demo purposes, we use solid colors and gradients
 */
export const templates: Template[] = [
  {
    id: 'daily-offer-1',
    name: 'Daily Offer - Orange',
    category: 'offer',
    thumbnailUrl: '/templates/daily-offer-1-thumb.png',
    backgroundUrl: '/templates/daily-offer-1.png',
    backgroundColor: '#ff7e5f', // Gradient fallback
    defaultText: {
      heading: 'आज का ऑफर!',
      subheading: 'सभी प्रोडक्ट्स पर 20% छूट',
      footer: 'आपकी दुकान का नाम',
    },
    textPositions: {
      heading: {
        x: 50,
        y: 25,
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: 90,
      },
      subheading: {
        x: 50,
        y: 50,
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: 85,
      },
      footer: {
        x: 50,
        y: 85,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
        maxWidth: 80,
      },
      phone: {
        x: 50,
        y: 92,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: 80,
      },
    },
  },
  {
    id: 'festival-diwali-1',
    name: 'Diwali Festival',
    category: 'festival',
    thumbnailUrl: '/templates/diwali-1-thumb.png',
    backgroundUrl: '/templates/diwali-1.png',
    backgroundColor: '#4a1942', // Deep purple fallback
    defaultText: {
      heading: 'दीपावली की शुभकामनाएं',
      subheading: 'आप और आपके परिवार को दीपों के त्योहार की हार्दिक शुभकामनाएं',
      footer: 'आपकी दुकान का नाम',
    },
    textPositions: {
      heading: {
        x: 50,
        y: 20,
        color: '#FFD700',
        fontSize: 32,
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: 90,
      },
      subheading: {
        x: 50,
        y: 45,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: 85,
      },
      footer: {
        x: 50,
        y: 80,
        color: '#FFD700',
        fontSize: 20,
        fontWeight: 600,
        textAlign: 'center',
        maxWidth: 80,
      },
      phone: {
        x: 50,
        y: 88,
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: 80,
      },
    },
  },
  {
    id: 'greeting-morning-1',
    name: 'Good Morning',
    category: 'greeting',
    thumbnailUrl: '/templates/morning-1-thumb.png',
    backgroundUrl: '/templates/morning-1.png',
    backgroundColor: '#87CEEB', // Sky blue fallback
    defaultText: {
      heading: 'सुप्रभात',
      subheading: 'आपका दिन मंगलमय हो',
      footer: 'आपकी दुकान का नाम',
    },
    textPositions: {
      heading: {
        x: 50,
        y: 30,
        color: '#FF6B35',
        fontSize: 42,
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: 90,
      },
      subheading: {
        x: 50,
        y: 55,
        color: '#2D3748',
        fontSize: 22,
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: 85,
      },
      footer: {
        x: 50,
        y: 82,
        color: '#4A5568',
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
        maxWidth: 80,
      },
      phone: {
        x: 50,
        y: 90,
        color: '#718096',
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: 80,
      },
    },
  },
  {
    id: 'daily-offer-2',
    name: 'Sale Banner - Blue',
    category: 'offer',
    thumbnailUrl: '/templates/sale-1-thumb.png',
    backgroundUrl: '/templates/sale-1.png',
    backgroundColor: '#1e40af', // Blue fallback
    defaultText: {
      heading: 'MEGA SALE',
      subheading: 'Up to 50% Off on All Items',
      footer: 'Your Shop Name',
    },
    textPositions: {
      heading: {
        x: 50,
        y: 25,
        color: '#FBBF24',
        fontSize: 40,
        fontWeight: 700,
        textAlign: 'center',
        maxWidth: 90,
      },
      subheading: {
        x: 50,
        y: 50,
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: 500,
        textAlign: 'center',
        maxWidth: 85,
      },
      footer: {
        x: 50,
        y: 82,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center',
        maxWidth: 80,
      },
      phone: {
        x: 50,
        y: 90,
        color: '#E5E7EB',
        fontSize: 16,
        fontWeight: 400,
        textAlign: 'center',
        maxWidth: 80,
      },
    },
  },
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(category: Template['category']): Template[] {
  return templates.filter((t) => t.category === category);
}

/**
 * Get all template categories with counts
 */
export function getCategories(): { category: Template['category']; count: number; label: string }[] {
  const categories: { category: Template['category']; label: string }[] = [
    { category: 'offer', label: 'Daily Offers' },
    { category: 'festival', label: 'Festivals' },
    { category: 'greeting', label: 'Greetings' },
  ];

  return categories.map((cat) => ({
    ...cat,
    count: templates.filter((t) => t.category === cat.category).length,
  }));
}
