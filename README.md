# Zero EXIF

A simple web application to remove EXIF metadata from images.

Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## Functionality

- Upload PNG or JPEG images via drag-and-drop or file selection.
- The application processes the image using the `/api/remove-exif` API route.
- The processed image, stripped of EXIF data, is automatically downloaded by the user.

## Prerequisites

- Node.js (Version specified in `.nvmrc` or latest LTS recommended)
- npm, yarn, pnpm, or bun

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/gibusoru/zero-exif.git # Replace with your repo URL if different
    cd zero-exif
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Pages

- `/`: Main application page for uploading images.
- `/why`: Explanation of why removing EXIF data is important.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
