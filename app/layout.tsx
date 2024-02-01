import type { Metadata } from "next";
import "./globals.css";
import { Footer, Navbar, Provider } from "@/Components";

export const metadata: Metadata = {
  title: "Recipeio",
  description: "Find and share your recipes with people around world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
