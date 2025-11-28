import { create } from 'zustand';
import type { Template, FontFamily } from '../types';

interface EditorStore {
  // Current template
  selectedTemplate: Template | null;
  
  // Text content
  heading: string;
  subheading: string;
  shopName: string;
  phoneNumber: string;
  
  // Styling
  selectedFont: FontFamily;
  headingColor: string;
  subheadingColor: string;
  
  // Options
  showWatermark: boolean;
  
  // User uploaded image
  userImage: string | null;
  
  // Actions
  setTemplate: (template: Template) => void;
  setHeading: (heading: string) => void;
  setSubheading: (subheading: string) => void;
  setShopName: (shopName: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setSelectedFont: (font: FontFamily) => void;
  setHeadingColor: (color: string) => void;
  setSubheadingColor: (color: string) => void;
  setShowWatermark: (show: boolean) => void;
  setUserImage: (image: string | null) => void;
  resetEditor: () => void;
}

const initialState = {
  selectedTemplate: null,
  heading: '',
  subheading: '',
  shopName: '',
  phoneNumber: '',
  selectedFont: 'hindi' as FontFamily,
  headingColor: '#FFFFFF',
  subheadingColor: '#FFFFFF',
  showWatermark: true,
  userImage: null,
};

export const useEditorStore = create<EditorStore>((set) => ({
  ...initialState,
  
  setTemplate: (template) => set({ 
    selectedTemplate: template,
    heading: template.defaultText.heading,
    subheading: template.defaultText.subheading,
    shopName: template.defaultText.footer,
    headingColor: template.textPositions.heading.color,
    subheadingColor: template.textPositions.subheading.color,
  }),
  
  setHeading: (heading) => set({ heading }),
  setSubheading: (subheading) => set({ subheading }),
  setShopName: (shopName) => set({ shopName }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setSelectedFont: (selectedFont) => set({ selectedFont }),
  setHeadingColor: (headingColor) => set({ headingColor }),
  setSubheadingColor: (subheadingColor) => set({ subheadingColor }),
  setShowWatermark: (showWatermark) => set({ showWatermark }),
  setUserImage: (userImage) => set({ userImage }),
  
  resetEditor: () => set(initialState),
}));
