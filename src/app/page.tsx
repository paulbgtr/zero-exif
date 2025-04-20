"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setProcessedImageUrl(null);
    }
  };

  const removeExif = async () => {
    if (!selectedImage) return;

    setLoading(true);
    try {
      // Create a new canvas to strip EXIF data
      const img = new Image();
      const url = URL.createObjectURL(selectedImage);
      
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        
        // Convert to blob and create download URL
        canvas.toBlob((blob) => {
          if (blob) {
            const cleanImageUrl = URL.createObjectURL(blob);
            setProcessedImageUrl(cleanImageUrl);
            setLoading(false);
          }
        }, selectedImage.type);
      };
      
      img.src = url;
    } catch (error) {
      console.error("Error removing EXIF data:", error);
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Zero EXIF</h1>
        <p className="mb-6 text-center text-gray-600">
          Upload an image to remove all EXIF metadata. Processing happens in your browser - your images never leave your device.
        </p>
        
        <div className="w-full mb-6">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-3 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p className="mb-1 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PNG or JPG</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept="image/png, image/jpeg" 
              onChange={handleImageChange} 
            />
          </label>
        </div>
        
        {selectedImage && (
          <div className="w-full mb-6">
            <p className="text-sm mb-2">Selected: {selectedImage.name}</p>
            <Button 
              onClick={removeExif} 
              disabled={loading} 
              className="w-full"
            >
              {loading ? "Processing..." : "Remove EXIF Data"}
            </Button>
          </div>
        )}
        
        {processedImageUrl && (
          <div className="w-full mt-4">
            <p className="text-sm mb-2">EXIF data removed successfully!</p>
            <img 
              src={processedImageUrl} 
              alt="Processed" 
              className="max-h-48 w-auto mx-auto mb-4 rounded" 
            />
            <a 
              href={processedImageUrl} 
              download={`clean_${selectedImage?.name || 'image'}`}
              className="w-full"
            >
              <Button className="w-full">
                Download Clean Image
              </Button>
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
