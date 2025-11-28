import html2canvas from 'html2canvas';

/**
 * Image processing utilities for VyapaarPost
 * Uses html2canvas for DOM-to-image conversion
 */

/**
 * Convert a DOM element to a PNG Blob
 */
export async function domToBlob(element: HTMLElement): Promise<Blob> {
  const canvas = await html2canvas(element, {
    scale: 2, // Higher resolution for better quality
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      'image/png',
      1.0
    );
  });
}

/**
 * Convert a DOM element to a Data URL
 */
export async function domToDataUrl(element: HTMLElement): Promise<string> {
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
  });

  return canvas.toDataURL('image/png', 1.0);
}

/**
 * Download image from a DOM element
 */
export async function downloadImage(
  element: HTMLElement,
  filename: string = 'vyapaarpost-image.png'
): Promise<void> {
  const dataUrl = await domToDataUrl(element);
  
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Share image using Web Share API (mobile-friendly)
 * Falls back to download if Web Share is not available
 */
export async function shareImage(
  element: HTMLElement,
  title: string = 'VyapaarPost Image',
  text: string = 'Check out this offer!'
): Promise<boolean> {
  try {
    const blob = await domToBlob(element);
    const file = new File([blob], 'vyapaarpost-image.png', { type: 'image/png' });

    // Check if Web Share API with files is supported
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title,
        text,
        files: [file],
      });
      return true;
    } else {
      // Fallback to download
      await downloadImage(element);
      return false;
    }
  } catch (error) {
    // User cancelled share or error occurred
    if ((error as Error).name === 'AbortError') {
      return false;
    }
    // Fallback to download
    await downloadImage(element);
    return false;
  }
}

/**
 * Resize an image file to specified dimensions
 */
export function resizeImage(
  file: File,
  maxWidth: number,
  maxHeight: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        // Calculate new dimensions maintaining aspect ratio
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.9));
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
