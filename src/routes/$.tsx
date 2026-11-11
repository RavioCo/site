import { createFileRoute } from "@tanstack/react-router";
import { RavioApp } from "@/ravio/RavioApp";

// All RAVIO pages (shop, product, cart, editorial…) are handled by the app's own router.
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "RAVIO — Digital Flagship" },
      { name: "description", content: "Shop RAVIO by Ravio & Co. — considered essentials and timeless silhouettes." },
      { property: "og:title", content: "RAVIO — Digital Flagship" },
      { property: "og:description", content: "Considered essentials and timeless silhouettes from Ravio & Co." },
    ],
  }),
  component: RavioApp,
});
