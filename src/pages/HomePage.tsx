import { Link } from 'react-router-dom';
import { Sparkles, Tag, Sun, PartyPopper, Download } from 'lucide-react';
import { templates, getCategories } from '../data';
import type { Template } from '../types';

const categoryIcons = {
  offer: Tag,
  festival: PartyPopper,
  greeting: Sun,
};

const categoryColors = {
  offer: 'bg-orange-500',
  festival: 'bg-purple-500',
  greeting: 'bg-blue-500',
};

export function HomePage() {
  const categories = getCategories();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">VyapaarPost</h1>
              <p className="text-xs text-gray-500">WhatsApp Marketing</p>
            </div>
          </div>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            title="Install App"
          >
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            सेकंडों में बनाएं<br />
            <span className="text-orange-500">प्रोफेशनल पोस्ट</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Create beautiful WhatsApp marketing posts in Hindi, Tamil, Marathi & more
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 pb-4">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat.category];
              return (
                <button
                  key={cat.category}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-white text-sm font-medium flex items-center gap-2 ${categoryColors[cat.category]}`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                  <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="px-4 pb-8">
        <div className="max-w-lg mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Choose a Template
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {templates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-lg mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500">
            Made with ❤️ for Indian Businesses
          </p>
        </div>
      </footer>
    </div>
  );
}

function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      to={`/editor/${template.id}`}
      className="block rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow active:scale-[0.98]"
    >
      <div
        className="aspect-square relative"
        style={{ backgroundColor: template.backgroundColor }}
      >
        {/* Template Preview */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center">
          <p
            className="font-bold text-sm leading-tight mb-1"
            style={{ 
              color: template.textPositions.heading.color,
              fontFamily: "'Noto Sans Devanagari', sans-serif"
            }}
          >
            {template.defaultText.heading}
          </p>
          <p
            className="text-xs opacity-80"
            style={{ color: template.textPositions.subheading.color }}
          >
            {template.defaultText.subheading.substring(0, 30)}...
          </p>
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-0.5 rounded-full text-white text-[10px] font-medium ${categoryColors[template.category]}`}>
            {template.category}
          </span>
        </div>
      </div>
      <div className="p-2 bg-white">
        <p className="text-xs font-medium text-gray-700 truncate">
          {template.name}
        </p>
      </div>
    </Link>
  );
}
