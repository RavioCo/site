import { createFileRoute } from "@tanstack/react-router";
import { RavioApp } from "@/ravio/RavioApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { title: "RAVIO — Elevation Refined | Digital Flagship" },
      { name: "description", content: "RAVIO by Ravio & Co. Considered essentials and timeless silhouettes created around quality, intention, and enduring value." },
      { property: "og:title", content: "RAVIO — Elevation Refined | Digital Flagship" },
      { property: "og:description", content: "Considered essentials and timeless silhouettes created around quality, intention, and enduring value." },
    ],
  }),
  component: RavioApp,
});
