/**
 * Template Data Structure
 * Defines the shape of marketing post templates
 */

export type TemplateCategory = 'offer' | 'festival' | 'greeting';

export type FontFamily = 'english' | 'hindi' | 'tamil' | 'marathi';

export interface TextPosition {
  x: number; // Percentage from left (0-100)
  y: number; // Percentage from top (0-100)
  color: string;
  fontSize: number; // Base font size in pixels
  fontWeight?: number;
  fontFamily?: FontFamily;
  maxWidth?: number; // Percentage of container width
  textAlign?: 'left' | 'center' | 'right';
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  thumbnailUrl: string;
  backgroundUrl: string;
  backgroundColor?: string; // Fallback color if image fails
  defaultText: {
    heading: string;
    subheading: string;
    footer: string; // Shop Name placeholder
  };
  textPositions: {
    heading: TextPosition;
    subheading: TextPosition;
    footer: TextPosition;
    phone?: TextPosition;
  };
}

export interface EditorState {
  selectedTemplate: Template | null;
  heading: string;
  subheading: string;
  shopName: string;
  phoneNumber: string;
  selectedFont: FontFamily;
  primaryColor: string;
  showWatermark: boolean;
  userImage: string | null;
}

export interface FontOption {
  id: FontFamily;
  name: string;
  displayName: string;
  fontFamily: string;
  sample: string;
}

export interface ColorOption {
  id: string;
  name: string;
  value: string;
}
