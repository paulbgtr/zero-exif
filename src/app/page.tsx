"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      // Use the API route to process the image
      const response = await fetch("/api/remove-exif", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to process image");
      }

      // The response is the processed image file
      // Create a blob URL from the response
      const blob = await response.blob();

      // Create a download link and click it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clean_${selectedImage.name}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      // Mark as successful
      setSuccess(true);
    } catch (err: any) {
      console.error("Error processing image:", err);
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedImage(e.dataTransfer.files[0]);
      setError(null);
      setSuccess(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const handleReset = () => {
    setSelectedImage(null);
    setError(null);
    setSuccess(false);
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center max-w-md w-full p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6">Zero EXIF</h1>
        <p className="mb-6 text-center">
          Upload an image to remove all EXIF metadata. Processing happens
          securely on our server.
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="w-full">
          <div className="w-full mb-6">
            <label
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-1 text-sm">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs">PNG or JPG (max 10MB)</p>
              </div>
              <input
                ref={inputFileRef}
                type="file"
                name="image"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                required
              />
            </label>
          </div>

          {selectedImage && (
            <div className="w-full mb-6">
              <p className="text-sm mb-2">Selected: {selectedImage.name}</p>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Processing..." : "Remove EXIF & Download"}
              </Button>
            </div>
          )}

          {error && (
            <div className="w-full mb-4 p-3 rounded-md text-sm">{error}</div>
          )}

          {success && (
            <div className="w-full mt-4 flex flex-col gap-3">
              <div className="p-3 rounded-md text-sm">
                EXIF data removed successfully! The download should begin
                automatically.
              </div>
              <Button
                onClick={handleReset}
                variant="secondary"
                className="w-full"
              >
                Process Another Image
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
