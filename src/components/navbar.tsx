import Link from "next/link";
import { PawPrint, Github } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <PawPrint className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">Zero EXIF</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link
            href="/why"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            Why Remove EXIF?
          </Link>
          <Link
            href="https://github.com/gibusoru/zero-exif"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
