import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Type, Palette, Image, Check, Loader2 } from 'lucide-react';
import { getTemplateById } from '../data';
import { fontOptions, colorOptions, getFontFamily } from '../data/fonts';
import { useEditorStore } from '../store';
import { downloadImage, shareImage, resizeImage } from '../utils';

type EditorTab = 'text' | 'style' | 'image';

export function EditorPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  
  const [activeTab, setActiveTab] = useState<EditorTab>('text');
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  
  const {
    selectedTemplate,
    heading,
    subheading,
    shopName,
    phoneNumber,
    selectedFont,
    headingColor,
    subheadingColor,
    showWatermark,
    userImage,
    setTemplate,
    setHeading,
    setSubheading,
    setShopName,
    setPhoneNumber,
    setSelectedFont,
    setHeadingColor,
    setSubheadingColor,
    setShowWatermark,
    setUserImage,
  } = useEditorStore();

  // Load template on mount
  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        setTemplate(template);
      } else {
        navigate('/');
      }
    }
  }, [templateId, setTemplate, navigate]);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      await downloadImage(canvasRef.current, `vyapaarpost-${Date.now()}.png`);
      showToast('Image saved! ✅');
    } catch {
      showToast('Failed to save image');
    }
    setIsExporting(false);
  };

  const handleShare = async () => {
    if (!canvasRef.current) return;
    setIsExporting(true);
    try {
      const shared = await shareImage(
        canvasRef.current,
        'VyapaarPost',
        heading || 'Check out this offer!'
      );
      if (shared) {
        showToast('Shared successfully! ✅');
      } else {
        showToast('Image saved! ✅');
      }
    } catch {
      showToast('Failed to share');
    }
    setIsExporting(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      const resized = await resizeImage(file, 400, 400);
      setUserImage(resized);
    } catch {
      showToast('Failed to load image');
    }
  };

  if (!selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-100">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-base font-semibold text-gray-900">Edit Post</h1>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              disabled={isExporting}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
              ) : (
                <Download className="w-5 h-5 text-gray-600" />
              )}
            </button>
            <button
              onClick={handleShare}
              disabled={isExporting}
              className="p-2 rounded-full bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Canvas Preview */}
      <div className="flex-1 p-4 flex items-start justify-center overflow-auto">
        <div
          ref={canvasRef}
          className="canvas-container"
          style={{ backgroundColor: selectedTemplate.backgroundColor }}
        >
          {/* User uploaded image */}
          {userImage && (
            <img
              src={userImage}
              alt="User upload"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          
          {/* Heading */}
          <div
            className="text-overlay"
            style={{
              top: `${selectedTemplate.textPositions.heading.y}%`,
              transform: 'translateY(-50%)',
              fontFamily: getFontFamily(selectedFont),
              fontSize: `${selectedTemplate.textPositions.heading.fontSize}px`,
              fontWeight: selectedTemplate.textPositions.heading.fontWeight,
              color: headingColor,
              textAlign: selectedTemplate.textPositions.heading.textAlign,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            {heading}
          </div>
          
          {/* Subheading */}
          <div
            className="text-overlay"
            style={{
              top: `${selectedTemplate.textPositions.subheading.y}%`,
              transform: 'translateY(-50%)',
              fontFamily: getFontFamily(selectedFont),
              fontSize: `${selectedTemplate.textPositions.subheading.fontSize}px`,
              fontWeight: selectedTemplate.textPositions.subheading.fontWeight,
              color: subheadingColor,
              textAlign: selectedTemplate.textPositions.subheading.textAlign,
              textShadow: '1px 1px 3px rgba(0,0,0,0.3)',
            }}
          >
            {subheading}
          </div>
          
          {/* Shop Name */}
          <div
            className="text-overlay"
            style={{
              top: `${selectedTemplate.textPositions.footer.y}%`,
              transform: 'translateY(-50%)',
              fontFamily: getFontFamily(selectedFont),
              fontSize: `${selectedTemplate.textPositions.footer.fontSize}px`,
              fontWeight: selectedTemplate.textPositions.footer.fontWeight,
              color: selectedTemplate.textPositions.footer.color,
              textAlign: selectedTemplate.textPositions.footer.textAlign,
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            {shopName}
          </div>
          
          {/* Phone Number */}
          {phoneNumber && selectedTemplate.textPositions.phone && (
            <div
              className="text-overlay"
              style={{
                top: `${selectedTemplate.textPositions.phone.y}%`,
                transform: 'translateY(-50%)',
                fontFamily: "'Inter', sans-serif",
                fontSize: `${selectedTemplate.textPositions.phone.fontSize}px`,
                fontWeight: selectedTemplate.textPositions.phone.fontWeight,
                color: selectedTemplate.textPositions.phone.color,
                textAlign: selectedTemplate.textPositions.phone.textAlign,
              }}
            >
              📞 {phoneNumber}
            </div>
          )}
          
          {/* Watermark */}
          {showWatermark && (
            <div className="absolute bottom-2 right-2 text-[10px] text-white/60 font-medium">
              Created by VyapaarPost
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sheet / Control Panel */}
      <div className="bg-white border-t border-gray-200 rounded-t-3xl shadow-lg safe-area-bottom">
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <TabButton
            icon={Type}
            label="Text"
            active={activeTab === 'text'}
            onClick={() => setActiveTab('text')}
          />
          <TabButton
            icon={Palette}
            label="Style"
            active={activeTab === 'style'}
            onClick={() => setActiveTab('style')}
          />
          <TabButton
            icon={Image}
            label="Image"
            active={activeTab === 'image'}
            onClick={() => setActiveTab('image')}
          />
        </div>

        {/* Tab Content */}
        <div className="p-4 max-h-[40vh] overflow-y-auto">
          {activeTab === 'text' && (
            <div className="space-y-4">
              <InputField
                label="Heading"
                value={heading}
                onChange={setHeading}
                placeholder="आज का ऑफर!"
              />
              <InputField
                label="Subheading"
                value={subheading}
                onChange={setSubheading}
                placeholder="सभी प्रोडक्ट्स पर 20% छूट"
              />
              <InputField
                label="Shop Name"
                value={shopName}
                onChange={setShopName}
                placeholder="आपकी दुकान का नाम"
              />
              <InputField
                label="Phone Number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                placeholder="9876543210"
                type="tel"
              />
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-5">
              {/* Font Selector */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font / भाषा
                </label>
                <div className="flex gap-2 flex-wrap">
                  {fontOptions.map((font) => (
                    <button
                      key={font.id}
                      onClick={() => setSelectedFont(font.id)}
                      className={`px-3 py-2 rounded-lg border-2 transition-all ${
                        selectedFont === font.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span
                        className="text-lg"
                        style={{ fontFamily: font.fontFamily }}
                      >
                        {font.sample}
                      </span>
                      <span className="block text-xs text-gray-500 mt-1">
                        {font.displayName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Heading Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Color
                </label>
                <ColorPicker
                  value={headingColor}
                  onChange={setHeadingColor}
                />
              </div>

              {/* Subheading Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subheading Color
                </label>
                <ColorPicker
                  value={subheadingColor}
                  onChange={setSubheadingColor}
                />
              </div>

              {/* Watermark Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  Show Watermark
                </span>
                <button
                  onClick={() => setShowWatermark(!showWatermark)}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    showWatermark ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      showWatermark ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Product Image
                </label>
                <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-orange-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="text-center">
                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-500">
                      Tap to upload image
                    </span>
                  </div>
                </label>
              </div>
              
              {userImage && (
                <button
                  onClick={() => setUserImage(null)}
                  className="w-full py-2 px-4 bg-red-100 text-red-600 rounded-lg text-sm font-medium"
                >
                  Remove Image
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg animate-bounce">
          {toast}
        </div>
      )}
    </div>
  );
}

// Helper Components
function TabButton({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
        active
          ? 'text-orange-500 border-b-2 border-orange-500'
          : 'text-gray-500'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900"
      />
    </div>
  );
}

function ColorPicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (color: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {colorOptions.map((color) => (
        <button
          key={color.id}
          onClick={() => onChange(color.value)}
          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-transform hover:scale-110 ${
            value === color.value ? 'border-gray-900' : 'border-gray-200'
          }`}
          style={{ backgroundColor: color.value }}
          title={color.name}
        >
          {value === color.value && (
            <Check
              className="w-4 h-4"
              style={{
                color: color.value === '#FFFFFF' ? '#000' : '#fff',
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
