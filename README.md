# Zero EXIF

A simple web application to remove EXIF metadata from images.

Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Functionality

- Upload PNG or JPEG images via drag-and-drop or file selection.
- The application processes the image using the `/api/remove-exif` API route.
- The processed image, stripped of EXIF data, is automatically downloaded by the user.

## Prerequisites

- Node.js (Version specified in `.nvmrc` or latest LTS recommended)
- bun

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gibusoru/zero-exif.git # Replace with your repo URL if different
    cd zero-exif
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Run the development server:**

    ```bash
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/`: Main application page for uploading images.
- `/why`: Explanation of why removing EXIF data is important.
