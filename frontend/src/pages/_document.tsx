import { Html, Head, Main, NextScript } from "next/document";
import { cn } from "@/lib/utils"

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
