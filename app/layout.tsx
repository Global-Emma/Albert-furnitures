import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Albert Furnitures and Interiors | Premium Furniture & Interior Design in Abuja",
  description:
    "Albert Furnitures and Interiors provides premium furniture, wardrobes, kitchen cabinets, TV consoles, office tables, wall panels, doors, and custom interior solutions in Abuja, Nigeria.",
  keywords: [
    "Albert Furnitures",
    "Furniture Abuja",
    "Interior Design Abuja",
    "Kitchen Cabinets Abuja",
    "Wardrobes Abuja",
    "TV Console Abuja",
    "Office Furniture Abuja",
    "Custom Furniture Nigeria",
    "Luxury Furniture Abuja",
    "Wall Panels Abuja",
    "Doors Abuja",
  ],
  authors: [{ name: "Albert Furnitures and Interiors" }],
  openGraph: {
    title: "Albert Furnitures and Interiors | Abuja",
    description: "Quality wood furniture, kitchens, wardrobes, and home interiors in Abuja.",
    locale: "en_NG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "name": "Albert Furnitures and Interiors",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
    "telephone": "+2348142261463",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop 8, Kugbo Furniture Market",
      "addressLocality": "Abuja",
      "addressCountry": "NG"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "18:00"
    },
    "priceRange": "$$"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-[#D4AF37] selection:text-black">
        {children}
      </body>
    </html>
  );
}