import { PawPrint } from "lucide-react";

export default function WhyPage() {
  return (
    <main className="flex-grow container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 bg-gray-950">
      <div className="space-y-8 text-card-foreground">
        <div className="flex items-center gap-3 mb-6">
          <PawPrint className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Remove EXIF Data?
          </h1>
        </div>

        <p className="text-lg text-muted-foreground">
          Most digital cameras, including smartphones, embed hidden information
          called EXIF (Exchangeable Image File Format) data into every photo you
          take. While sometimes useful, this data often contains sensitive
          details you might not want to share publicly.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">What Can EXIF Data Reveal?</h2>
          <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Geolocation:</strong> Exact GPS coordinates (latitude and
              longitude) where the photo was taken.
            </li>
            <li>
              <strong>Device Information:</strong> Camera make and model (e.g.,
              iPhone 15 Pro, Google Pixel 8), lens details, exposure settings
              (ISO, aperture, shutter speed).
            </li>
            <li>
              <strong>Date and Time:</strong> Precise date and time the photo
              was captured and sometimes even when it was last modified.
            </li>
            <li>
              <strong>Software Used:</strong> Information about the software
              used to view or edit the image (e.g., Adobe Photoshop).
            </li>
            <li>
              <strong>Unique IDs:</strong> Sometimes, a unique identifier for
              the camera or device.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Privacy Risks</h2>
          <p className="text-muted-foreground/80">
            Sharing images online with EXIF data intact can inadvertently expose
            your location history, the expensive equipment you use, your daily
            routines, or other personal details that could be exploited by
            malicious actors for stalking, theft, or social engineering.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">How Zero EXIF Helps</h2>
          <p className="text-muted-foreground/80">
            Zero EXIF provides a simple and secure way to strip all this
            metadata from your images before you share them. By uploading your
            image here, we process it on our server to remove the EXIF tags,
            providing you with a clean version to download and share safely.
          </p>
        </section>
      </div>
    </main>
  );
}
