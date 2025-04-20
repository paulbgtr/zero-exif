"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Upload } from "lucide-react";

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
    <main className="flex flex-grow flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center max-w-md w-full p-8 bg-card text-card-foreground rounded-xl shadow-xl border">
        <p className="mb-8 text-center text-muted-foreground">
          Upload an image to remove its EXIF metadata (like location, device
          info, etc.).
        </p>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="w-full space-y-6"
        >
          <div className="w-full">
            <label
              htmlFor="image-upload"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border hover:border-primary rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors duration-200 ease-in-out"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
                <Upload className="w-10 h-10 mb-4 text-muted-foreground" />
                <p className="mb-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">
                  PNG or JPG (max 10MB)
                </p>
              </div>
              <input
                id="image-upload"
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
            <div className="w-full space-y-3">
              <p className="text-sm text-center text-muted-foreground">
                Selected:{" "}
                <span className="font-medium text-foreground">
                  {selectedImage.name}
                </span>
              </p>
              <Button
                type="submit"
                disabled={loading}
                className="w-full transition-all duration-200 ease-in-out"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                    Processing...
                  </div>
                ) : (
                  "Remove EXIF & Download"
                )}
              </Button>
            </div>
          )}

          {error && (
            <div className="w-full mb-4 p-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-md text-sm text-center">
              Error: {error}
            </div>
          )}

          {success && (
            <div className="w-full mt-4 flex flex-col gap-3 items-center">
              <div className="p-3 bg-muted border border-border rounded-md text-sm text-center w-full text-foreground">
                ✅ Success! EXIF data removed. The download should begin
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
